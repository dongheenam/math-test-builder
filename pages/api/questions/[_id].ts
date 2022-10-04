import type { NextApiRequest, NextApiResponse } from "next";
import pluralize from "pluralize";

import dbConnect from "lib/dbConnect";
import Question from "models/Question";
import { fromQuery } from "lib/util";
import { handleError, QueryError, DocumentIdError } from "lib/handleError";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id }: { _id?: string } = req.query;
  if (_id === undefined) {
    throw new DocumentIdError("editQuestion called without _id");
  }

  switch (req.method) {
    case "PUT":
    case "PATCH":
      await editQuestion(req, res, _id);
      break;

    case "DELETE":
      await deleteQuestion(req, res, _id);

    case "GET":
    default:
      await getQuestion(req, res, _id);
      break;
  }
};
export default handler;

/* PUT/PATCH: edit the question */
async function editQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  _id: string
) {
  try {
    const parsedQuery = fromQuery(req.body);
    const isEnough = ["topic", "yearLevel", "tags", "text", "solution"].some(
      (key) => key in parsedQuery
    );
    if (!isEnough) {
      throw new QueryError("request body is probably empty");
    }
    const { topic, yearLevel, tags, text, solution } = fromQuery(req.body);

    await dbConnect();
    const newQuestion = {
      topic: topic as string,
      yearLevel: yearLevel as number,
      // force singular form for the tags
      tags: tags && (tags as string[]).map((tag: string) => pluralize(tag, 1)),
      text: text as string,
      solution: solution as string,
    };
    const updatedQuestion = await Question.findByIdAndUpdate(
      _id,
      {
        $set: newQuestion,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
    if (!updatedQuestion) {
      throw new DocumentIdError("question matching the id does not exist");
    }
    res.send({ status: "ok", data: updatedQuestion });
    res.end();
  } catch (err) {
    handleError(err, res);
  }
}

/* DELETE: delete the question */
async function deleteQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  _id: string
) {
  try {
    await dbConnect();
    const deletedQuestion = await Question.findByIdAndDelete(_id);
    if (!deletedQuestion) {
      throw new DocumentIdError("question matching the id does not exist");
    }
    res.send({ status: "ok" });
    res.end();
  } catch (err) {
    handleError(err, res);
  }
}

/* GET: return the question */
async function getQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  _id: string
) {
  try {
    await dbConnect();
    const question = await Question.findById(_id);
    if (!question) {
      throw new DocumentIdError("question matching the id does not exist");
    }
    res.send({ status: "ok" });
    res.end();
  } catch (err) {
    handleError(err, res);
  }
}
