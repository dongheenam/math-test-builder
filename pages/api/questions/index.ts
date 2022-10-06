import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import connectPrisma from "lib/connectPrisma";
import {
  parseFloatIfDefined,
  handleTagsQuery,
  parseOrderBy,
  includeTagsQuery,
  createTagsQuery,
  rawToFetched,
} from "lib/util";
import { handleApiError } from "lib/handleApiError";
import {
  CreateQuestionData,
  CreateQuestionQuery,
  QuestionRaw,
  GetQuestionsData,
  GetQuestionsQuery,
} from "types";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`${req.method} /api/questions invoked with query`, req.query);
  switch (req.method) {
    case "POST":
      await createQuestion(req, res);
      break;

    case "GET":
    default:
      await getQuestions(req, res);
      break;
  }
};
export default handler;

/* POST: create a new question */
async function createQuestion(req: NextApiRequest, res: NextApiResponse) {
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
      ...createTagsQuery(tags),
    };

    // send query and return the result
    prisma = connectPrisma();
    const question = await prisma.question.create({
      data: questionData as Prisma.QuestionCreateInput,
      ...includeTagsQuery,
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

/* GET: search questions */
async function getQuestions(req: NextApiRequest, res: NextApiResponse) {
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
    if (content) where.content = { contains: content };
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
    prisma = connectPrisma();
    const questionsPromise = prisma.question.findMany({
      ...args,
      ...includeTagsQuery,
    });
    let result: GetQuestionsData = {};
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
