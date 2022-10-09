import { NextApiRequest, NextApiResponse } from "next";
import connectPrisma from "server/connectPrisma";
import { rawToFetched } from "server/utils";
import { handleApiError } from "./handleApiError";

/* GET: return the question */
export default async function getQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    prisma = connectPrisma();
    const question = await prisma.question.findFirstOrThrow({
      where: { id: id },
      include: {
        tags: {
          select: { name: true },
        },
      },
    });

    res.send({ status: "ok", data: rawToFetched(question) });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}
