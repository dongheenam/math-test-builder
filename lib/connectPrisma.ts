import { PrismaClient } from "@prisma/client";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

export default function connectPrisma() {
  let prisma = global.prisma;
  if (!prisma) {
    prisma = global.prisma = new PrismaClient();
  }

  return prisma;
}
