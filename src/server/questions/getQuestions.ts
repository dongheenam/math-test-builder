import { Prisma } from "@prisma/client";

import prisma from "server/connectPrisma";
import { parseOrderBy, rawToFetched } from "server/utils";
import { GetQuestionsData, GetQuestionsQuery } from "./types";
import { QuestionRaw } from "questions/libs/types";

export default async function getQuestions({
  topic,
  yearLevel,
  content,
  tags,
  orderBy = "-updatedAt",
  count = true,
  cursor,
  take = 10,
}: GetQuestionsQuery) {
  // build query
  let where: Prisma.QuestionWhereInput = {};
  if (topic) where.topic = topic;
  if (yearLevel) where.yearLevel = yearLevel;
  if (content) where.content = { contains: content, mode: "insensitive" };
  if (tags) {
    where.AND = tags.map((tag) => ({
      tags: { some: { name: tag } },
    }));
  }
  // options
  let args: Prisma.QuestionFindManyArgs = {
    where: where,
    take: take,
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

  return result;
}
