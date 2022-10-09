import type { NextApiRequest, NextApiResponse } from "next";

import createQuestion from "server/questions/createQuestion";
import getQuestions from "server/questions/getQuestions";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(
    `${req.method} /api/questions invoked with query:`,
    req.query,
    ", body:",
    req.body
  );
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
