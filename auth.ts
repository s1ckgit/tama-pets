import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { compareSync } from 'bcryptjs';

import { db } from "@/lib/utils/db";
import { type ICredentials } from "@/lib/types";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as ICredentials;

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
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;

    }
  }
});
