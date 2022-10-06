import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import connectPrisma from "lib/connectPrisma";
import {
  parseFloatIfDefined,
  handleTagsQuery,
  createTagsQuery,
  rawToFetched,
  includeTagsQuery,
} from "lib/util";
import {
  handleApiError,
  DocumentIdError,
  QueryError,
} from "lib/handleApiError";
import { EditQuestionQuery, QuestionFetched } from "types";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: { id?: string } = req.query;
  if (id === undefined) {
    throw new DocumentIdError("editQuestion called without _id");
  }

  console.log(
    `${req.method} /api/questions/${id} invoked with query:`,
    req.query,
    ", body:",
    req.body
  );

  switch (req.method) {
    case "PUT":
    case "PATCH":
      await editQuestion(req, res, id);
      break;

    case "DELETE":
      await deleteQuestion(req, res, id);

    case "GET":
    default:
      await getQuestion(req, res, id);
      break;
  }
};
export default handler;

/* PUT/PATCH: edit the question */
async function editQuestion(
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
    if (tags) questionData.tags = createTagsQuery(tags).tags;

    prisma = connectPrisma();
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

/* DELETE: delete the question */
async function deleteQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    prisma = connectPrisma();
    const question = await prisma.question.delete({
      where: { id: id },
      ...includeTagsQuery,
    });
    res.send({ status: "ok" });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}

/* GET: return the question */
async function getQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    prisma = connectPrisma();
    const question = await prisma.question.findFirstOrThrow({
      where: { id: id },
      ...includeTagsQuery,
    });

    res.send({ status: "ok", data: rawToFetched(question) });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}
