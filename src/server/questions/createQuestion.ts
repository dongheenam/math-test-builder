import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import prisma from "server/connectPrisma";
import {
  parseFloatIfDefined,
  handleTagsQuery,
  rawToFetched,
} from "server/utils";
import { handleApiError } from "./handleApiError";
import { CreateQuestionData, CreateQuestionQuery } from "./types";

/* POST: create a new question */
export default async function createQuestion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // parse request
    const {
      topic,
      yearLevel,
      tags,
      content,
      solution,
      authorId,
    }: CreateQuestionQuery = {
      ...req.body,
      // ?yearLevel=7&yearLevel=8 still parses to yearLevel: 7
      yearLevel: parseFloatIfDefined(req.body.yearLevel as string),
      tags: handleTagsQuery(req.body.tags),
    };

    // build query
    let questionData: Partial<Prisma.QuestionCreateInput> = {
      topic,
      yearLevel,
      content,
      solution,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    };

    // send query and return the result
    const question = await prisma.question.create({
      data: questionData as Prisma.QuestionCreateInput,
      include: {
        tags: { select: { name: true } },
      },
    });
    res.send({
      status: "ok",
      data: rawToFetched(question) as CreateQuestionData,
    });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}
