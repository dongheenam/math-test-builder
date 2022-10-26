import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import {
  AuthError,
  DocumentIdError,
  handleApiError,
} from "server/questions/handleApiError";
import editQuestion from "server/questions/editQuestion";
import deleteQuestionById from "server/questions/deleteQuestion";
import getQuestionById from "server/questions/getQuestionById";
import { handleTagsQuery, myParseFloat } from "server/utils";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      throw new AuthError();
    }

    const method = req.method;
    const query = req.query;
    const body = req.body;
    // id cannot be string[]
    const { id }: { id?: string } = query;
    if (id === undefined) {
      throw new DocumentIdError("editQuestion called without _id");
    }
    console.log(
      `${method} /api/questions/[id] invoked with query:`,
      query,
      ", body:",
      body
    );

    switch (method) {
      case "PUT":
      case "PATCH":
        /* PUT/PATCH: edit the question */
        const editedQuestion = await editQuestion(id, {
          ...req.body,
          authorId: session.user?.id,
          yearLevel: myParseFloat(body.yearLevel),
          tags: handleTagsQuery(body.tags),
        });
        res.send({
          status: "ok",
          data: editedQuestion,
        });
        break;

      case "DELETE":
        /* DELETE: delete the question */
        await deleteQuestionById(query.id as string);
        res.send({ status: "ok" });
        break;

      case "GET":
      default:
        /* GET: return the question */
        const question = await getQuestionById(id);
        res.send({
          status: "ok",
          data: question,
        });
        break;
    }
  } catch (err) {
    handleApiError(err, res);
  }
};
export default handler;
