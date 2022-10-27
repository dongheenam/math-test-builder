import { Prisma } from "@prisma/client";
import prisma from "server/connectPrisma";
import { rawToFetched } from "server/utils";
import { QueryError } from "./handleApiError";
import { EditQuestionQuery } from "./types";

export default async function editQuestion(
  id: string,
  { topic, yearLevel, tags, content, solution, authorId }: EditQuestionQuery
) {
  const allUndefined = [topic, yearLevel, tags, content, solution].every(
    (value) => !value
  );
  if (allUndefined) {
    throw new QueryError("request body is empty");
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

  // update many-to-many relations by removing all and setting anew
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
  return rawToFetched(question);
}
