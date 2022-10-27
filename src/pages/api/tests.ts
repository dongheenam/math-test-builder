import prisma from "server/connectPrisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
