import type { NextApiRequest, NextApiResponse } from "next";

import { DocumentIdError } from "server/questions/handleApiError";
import editQuestion from "server/questions/editQuestion";
import deleteQuestion from "server/questions/deleteQuestion";
import getQuestion from "server/questions/getQuestion";

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
