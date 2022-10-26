import { DefaultUser, DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

// adds custom attiribute to user (as defined in prisma schema)
declare module "next-auth" {
  interface User extends DefaultUser {
    role: UserRole;
  }

  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      role: UserRole;
      id?: string;
    };
  }
}
