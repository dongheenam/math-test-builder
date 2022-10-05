import type { NextApiRequest, NextApiResponse } from "next";
import pluralize from "pluralize";
import { Prisma } from "@prisma/client";

import connectPrisma from "lib/connectPrisma";
import { parseFloatIfDefined, handleTagsQuery, parseOrderBy } from "lib/util";
import { handleApiError } from "lib/handleApiError";
import { QuestionFetched, QuestionModel } from "types";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`${req.method} /api/questions invoked with query`, req.query);
  switch (req.method) {
    case "POST":
      await createQuestion(req, res);
      break;

    case "GET":
    default:
      await searchQuestion(req, res);
      break;
  }
};
export default handler;

type CreateQuestionQuery = Pick<
  QuestionFetched,
  "topic" | "yearLevel" | "tags" | "content" | "solution" | "authorId"
>;
type CreateQuestionData = QuestionFetched;

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
    };
    questionData.tags = {
      connectOrCreate: tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      })),
    };

    // send query and return the result
    prisma = connectPrisma();
    const question = await prisma.question.create({
      data: questionData as Prisma.QuestionCreateInput,
      include: {
        tags: {
          select: { name: true },
        },
      },
    });
    const result: CreateQuestionData = {
      ...question,
      tags: question.tags.map((tag) => tag.name),
    };
    res.send({ status: "ok", data: result });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}

type SearchQuestionQuery = Partial<
  Pick<QuestionFetched, "topic" | "yearLevel" | "content" | "authorId">
> & {
  tags?: string[];
  tagMatch?: "any" | "all";
  orderBy?: string;
  cursor?: QuestionFetched["id"];
  take?: number;
  count?: boolean;
};
type SearchQuestionData = {
  questions?: QuestionFetched[];
  count?: number;
};

/* GET: search questions */
async function searchQuestion(req: NextApiRequest, res: NextApiResponse) {
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
    }: SearchQuestionQuery = {
      ...req.query,
      tags: handleTagsQuery(req.query.tags),
      // ?yearLevel=7&yearLevel=8 still parses to yearLevel: 7
      yearLevel: parseFloatIfDefined(req.query.yearLevel),
      take: parseFloatIfDefined(req.query.take),
      count: req.query.count === "true",
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
    if (orderBy) {
      args.orderBy = parseOrderBy<QuestionModel>(orderBy);
    }

    // fetch documents
    prisma = connectPrisma();
    const questionsPromise = prisma.question.findMany({
      ...args,
      include: {
        tags: { select: { name: true } },
      },
    });
    let result: SearchQuestionData = {};
    if (count) {
      const countPromise = prisma.question.count({ where: where });
      const [questions, countResult] = await prisma.$transaction([
        questionsPromise,
        countPromise,
      ]);
      result = {
        count: countResult,
        questions: questions.map((q) => ({
          ...q,
          tags: q.tags.map((tag) => tag.name),
        })),
      };
    } else {
      const questions = await questionsPromise;
      result = {
        questions: questions.map((q) => ({
          ...q,
          tags: q.tags.map((tag) => tag.name),
        })),
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
