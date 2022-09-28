import type { NextApiRequest, NextApiResponse } from "next";
import { Error as MongooseError } from "mongoose";

import dbConnect from "lib/dbConnect";
import Question from "models/Question";

const createQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    const { topic, yearLevel, tags, text, solution } = req.body;
    const question = await Question.create({
      topic: topic,
      yearLevel: yearLevel,
      tags: tags,
      text: text,
      solution: solution,
    });

    res.send({ data: question });
  } catch (err) {
    console.log(err);
    if (err instanceof MongooseError.ValidationError) {
      res.status(400).send({ error: "request body has incorrect type" });
    } else {
      res.status(500).send({ error: "unknown error occured" });
    }
  }
};
export default createQuestion;
