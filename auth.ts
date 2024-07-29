import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { compareSync } from 'bcryptjs';

import { db } from "@/lib/utils/db";
import { type Credentials as CredentialsType } from "@/lib/types";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as CredentialsType;

        const user = await db.user.findUnique({
          where: { email }
        });

        if(!user) {
          throw new Error('User not found');
        }

        const isPasswordCorrent = compareSync(password, user.password);

        if(isPasswordCorrent) return user;

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        const userPet = await db.pet.findUnique({
          where: {
            userId: user.id
          }
        });

        if (userPet) {
          token.pet = userPet['id'];
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      if (token.pet) {
        session.user.pet = token.pet as string;
      }
      return session;
    }
  }
});
