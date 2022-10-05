import { PrismaClient } from "@prisma/client";
import connectPrisma from "lib/connectPrisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = connectPrisma();

  switch (req.method) {
    case "POST":
      break;

    case "GET":
      // @ts-ignore
      res.send(await prisma.$metrics.json());

    default:
      break;
  }
};
export default handler;
