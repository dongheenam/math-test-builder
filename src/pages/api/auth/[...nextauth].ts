import NextAuth, { DefaultUser } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import AzureADProvider from "next-auth/providers/azure-ad";

import prisma from "server/connectPrisma";
import { UserRole } from "@prisma/client";

// adds custom attiribute to user (as defined in prisma schema)
declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole;
  }
}

if (
  process.env.AZURE_AD_CLIENT_ID === undefined ||
  process.env.AZURE_AD_CLIENT_SECRET === undefined
) {
  throw new Error("environment variables for auth not loaded!");
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      const mySession = {
        ...session,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
      return mySession;
    },
  },
});
