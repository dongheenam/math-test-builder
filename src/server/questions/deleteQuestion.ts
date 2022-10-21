import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/connectPrisma";
import { handleApiError } from "./handleApiError";

/* DELETE: delete the question */
export default async function deleteQuestion(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) {
  try {
    const question = await prisma.question.delete({
      where: { id: id },
      include: {
        tags: {
          select: { name: true },
        },
      },
    });
    res.send({ status: "ok" });
    res.end();
  } catch (err) {
    handleApiError(err, res);
  }
}
