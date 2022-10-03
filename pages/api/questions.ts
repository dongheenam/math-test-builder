import type { NextApiRequest, NextApiResponse } from "next";
import { Error as MongooseError } from "mongoose";

import dbConnect from "lib/dbConnect";
import Question from "models/Question";
import { fromQuery } from "lib/util";
import pluralize from "pluralize";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await createQuestion(req, res);
      break;

    case "GET":
    default:
      await getQuestion(req, res);
      break;
  }
};
export default handler;

/* POST: create a new question */
async function createQuestion(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { topic, yearLevel, tags, text, solution } = fromQuery(req.body);

    await dbConnect();
    const question = await Question.create({
      topic: topic as string,
      yearLevel: yearLevel as number,
      // force singular form for the tags
      tags: (tags as string[]).map((tag: string) => pluralize(tag, 1)),
      text: text as string,
      solution: solution as string,
    });
    res.send({ status: "ok", data: question });
  } catch (err) {
    let status = 500;
    let message = "unknown problem occurred";
    console.log(err);

    if (err instanceof MongooseError.ValidationError) {
      status = 400;
      message = `db validation failed: ${err}`;
    } else if (err instanceof Error) {
      message = `unknown error occurred`;
    }

    res.status(status).send({ status: "error", message: message });
  }
}

/* GET: search questions */
async function getQuestion(req: NextApiRequest, res: NextApiResponse) {
  try {
    // parse request
    const parsedQuery = fromQuery(req.query);
    console.log(`getQuestion.query = ${JSON.stringify(parsedQuery)}`);
    const {
      topic,
      yearLevel,
      tags,
      text,
      matchType = "any",
      sortBy = "-updatedAt",
      limit = 10,
      skip = 0,
    } = parsedQuery;

    // build filter from request
    let qFilter: {
      topic?: string;
      yearLevel?: number;
      tags?: { $all: string[] } | { $in: string[] } | string;
      text?: string;
    } = {};
    if (topic) qFilter.topic = topic as string;
    if (yearLevel) qFilter.yearLevel = yearLevel as number;
    if (text) qFilter.text = text as string;
    if (Array.isArray(tags)) {
      qFilter.tags =
        matchType === "all"
          ? { $all: tags as string[] }
          : { $in: tags as string[] };
    } else if (tags) {
      qFilter.tags = tags as string;
    }
    const qOptions = {
      sort: sortBy as string,
      skip: skip as number,
      limit: limit as number,
    };

    // fetch documents
    await dbConnect();
    const docsPromise = Question.find(qFilter, null, qOptions).exec();
    const countPromise = Question.countDocuments(qFilter).exec();
    const [docs, count] = await Promise.all([docsPromise, countPromise]);
    res.status(200).send({ status: "ok", data: { docs: docs, count: count } });
  } catch (err) {
    let status = 500;
    let message = "unknown problem occurred";
    console.error(err);

    if (err instanceof MongooseError.ValidationError) {
      status = 400;
      message = `db validation failed: ${err}`;
    } else if (err instanceof Error) {
      message = `unknown error occurred`;
    }

    res.status(status).send({ status: "error", message: message });
  }
}
