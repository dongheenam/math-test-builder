import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import AzureADProvider from "next-auth/providers/azure-ad";

import prisma from "server/connectPrisma";

if (
  process.env.AZURE_AD_CLIENT_ID === undefined ||
  process.env.AZURE_AD_CLIENT_SECRET === undefined
) {
  throw new Error("environment variables for auth not loaded!");
}

export const authOptions: NextAuthOptions = {
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
};

// include user_id in the session (for api routes only)
export const apiAuthOptions: NextAuthOptions = {
  ...authOptions,
  callbacks: {
    session({ session, token, user }) {
      const mySession = {
        ...session,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
        },
      };
      return mySession;
    },
  },
};

export default NextAuth(authOptions);
