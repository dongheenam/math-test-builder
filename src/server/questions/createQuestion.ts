import { Prisma } from "@prisma/client";
import prisma from "server/connectPrisma";
import { rawToFetched } from "server/utils";
import { CreateQuestionData, CreateQuestionQuery } from "./types";

export default async function createQuestion(
  query: CreateQuestionQuery
): Promise<CreateQuestionData> {
  // build question
  let questionData: Prisma.QuestionCreateInput = {
    ...query,
    tags: {
      connectOrCreate: query.tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      })),
    },
    author: {
      connect: {
        id: query.authorId,
      },
    },
  };

  // send query and return the result
  const question = await prisma.question.create({
    data: questionData,
    include: {
      tags: { select: { name: true } },
    },
  });

  return rawToFetched(question);
}
