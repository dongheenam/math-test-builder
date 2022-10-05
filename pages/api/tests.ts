import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

let prisma: PrismaClient;

async function createRow(text: string) {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;

  const result = await prisma.testOne.create({
    data: {
      content: text,
    },
  });

  return { result };
}

async function getRow() {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;

  const result = await prisma.testOne.findMany({
    where: {
      content: {
        contains: "mongo",
      },
    },
  });
  return { result };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      res.send(await createRow("hello, cockroach!"));
      break;

    case "GET":
      res.send(await getRow());

    default:
      break;
  }
};
export default handler;
