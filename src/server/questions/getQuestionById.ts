import prisma from "server/connectPrisma";
import { rawToFetched } from "server/utils";

export default async function getQuestionById(id: string) {
  const question = await prisma.question.findFirstOrThrow({
    where: { id: id },
    include: {
      tags: {
        select: { name: true },
      },
    },
  });

  return rawToFetched(question);
}
