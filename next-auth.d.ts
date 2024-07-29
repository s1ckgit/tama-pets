import { DefaultSession } from "next-auth";
import { User as PrismaUser, Pet as PrismaPet } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      pet?: PrismaPet['id'];
    } & DefaultSession["user"];
  }

  interface User extends PrismaUser {}
}
