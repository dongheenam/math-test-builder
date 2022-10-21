import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "server/connectPrisma";
import {
  parseFloatIfDefined,
  handleTagsQuery,
  rawToFetched,
} from "server/utils";
import { handleApiError, QueryError } from "./handleApiError";
import { EditQuestionQuery } from "./types";

/* PUT/PATCH: edit the question */
export default async function editQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    // parse request query
    const {
      topic,
      yearLevel,
      tags,
      content,
      solution,
      authorId,
    }: EditQuestionQuery = {
      ...req.body,
      yearLevel: parseFloatIfDefined(req.body.yearLevel),
      tags: handleTagsQuery(req.body.tags),
    };
    const allUndefined = [topic, yearLevel, tags, content, solution].every(
      (value) => !value
    );
    if (allUndefined) {
      throw new QueryError("request body is probably empty");
    }

    // build query
    let questionData: Prisma.QuestionUpdateInput = {};
    if (topic) questionData.topic = topic;
    if (yearLevel) questionData.yearLevel = yearLevel;
    if (content) questionData.content = content;
    if (solution) questionData.solution = solution;
    if (tags) {
      questionData.tags = {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }

    let disconnectTagsPromise;
    if (tags) {
      disconnectTagsPromise = prisma.question.update({
        where: { id: id },
        data: { tags: { set: [] } },
      });
    } else {
      // do nothing
      disconnectTagsPromise = prisma.question.aggregateRaw({
        pipeline: [],
      });
    }
    const updateQuestionPromise = prisma.question.update({
      where: { id: id },
      data: questionData,
      include: {
        tags: {
          select: { name: true },
        },
      },
    });
    const [_, question] = await prisma.$transaction([
      disconnectTagsPromise,
      updateQuestionPromise,
    ]);
    res.send({ status: "ok", data: rawToFetched(question) });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}
