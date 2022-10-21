import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import prisma from "server/connectPrisma";
import {
  parseFloatIfDefined,
  handleTagsQuery,
  parseOrderBy,
  rawToFetched,
} from "server/utils";
import { handleApiError } from "./handleApiError";
import { GetQuestionsData, GetQuestionsQuery } from "./types";
import { QuestionRaw } from "questions/types";

/* GET: search questions */
export default async function getQuestions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // parse request
    const {
      topic,
      yearLevel,
      content,
      authorId,
      tags,
      tagMatch = "any",
      orderBy = "-updatedAt",
      count = true,
      cursor,
      take = 10,
    }: GetQuestionsQuery = {
      ...req.query,
      tags: handleTagsQuery(req.query.tags),
      // ?yearLevel=7&yearLevel=8 still parses to yearLevel: 7
      yearLevel: parseFloatIfDefined(req.query.yearLevel),
      take: parseFloatIfDefined(req.query.take),
      count: !(req.query.count === "false"),
    };
    // build query
    let where: Prisma.QuestionWhereInput = {};
    if (topic) where.topic = topic;
    if (yearLevel) where.yearLevel = yearLevel;
    if (content) where.content = { contains: content, mode: "insensitive" };
    if (tags) {
      const OPEARTOR = tagMatch === "any" ? "OR" : "AND";
      where.tags = {
        some: {
          [OPEARTOR]: tags.map((tag) => ({
            name: tag,
          })),
        },
      };
    }
    // options
    let args: Prisma.QuestionFindManyArgs = {
      take: take,
      where: where,
    };
    if (cursor) {
      args.cursor = { id: cursor };
      args.skip = 1;
    }
    if (orderBy && orderBy !== "tags") {
      args.orderBy = parseOrderBy<Omit<QuestionRaw, "tags">>(orderBy);
    }

    // fetch documents
    const questionsPromise = prisma.question.findMany({
      ...args,
      include: {
        tags: { select: { name: true } },
      },
    });
    let result: GetQuestionsData = { questions: [] };
    if (count) {
      const countPromise = prisma.question.count({ where: where });
      const [questions, countResult] = await prisma.$transaction([
        questionsPromise,
        countPromise,
      ]);
      result = {
        count: countResult,
        questions: questions.map((q) => rawToFetched(q)),
      };
    } else {
      const questions = await questionsPromise;
      result = {
        questions: questions.map((q) => rawToFetched(q)),
      };
    }

    res.status(200).send({
      status: "ok",
      data: result,
    });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}
