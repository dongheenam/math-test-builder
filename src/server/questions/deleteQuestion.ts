import prisma from "server/connectPrisma";

export default async function deleteQuestion(id: string) {
  await prisma.question.delete({ where: { id: id } });
}
