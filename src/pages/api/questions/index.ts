import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import { apiAuthOptions } from "pages/api/auth/[...nextauth]";

import createQuestion from "server/questions/createQuestion";
import getQuestions from "server/questions/getQuestions";
import { AuthError, handleApiError } from "server/questions/handleApiError";
import { myParseFloat, handleTagsQuery } from "server/utils";

/* main API handler */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, apiAuthOptions);
    if (!session || !session.user?.id) {
      throw new AuthError();
    }

    const method = req.method;
    const query = req.query;
    const body = req.body;
    console.log(
      `${method} /api/questions invoked with query:`,
      query,
      ", body:",
      body
    );
    switch (method) {
      case "POST":
        /* POST: create a new question */
        const newQuestion = await createQuestion({
          ...body,
          authorId: session.user.id,
          yearLevel: myParseFloat(body.yearLevel),
          tags: handleTagsQuery(req.body.tags),
        });
        res.send({
          status: "ok",
          data: newQuestion,
        });
        break;

      case "GET":
      default:
        /* GET: search questions */
        const searchResult = await getQuestions({
          ...query,
          tags: handleTagsQuery(query.tags),
          yearLevel: myParseFloat(query.yearLevel),
          take: myParseFloat(query.take),
          count: !(query.count === "false"),
        });
        res.send({
          status: "ok",
          data: searchResult,
        });
        break;
    }
  } catch (err) {
    handleApiError(err, res);
  }
};
export default handler;
