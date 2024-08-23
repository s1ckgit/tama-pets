'use server';

import { signIn } from "@/auth";
import type { Credentials, Inputs } from "@/lib/types";
import { db } from "@/lib/utils/db";
import { hashPassword } from "@/lib/utils/hash-password";

export const signUp = async (data: Credentials) => {
  const { email, password } = data;

  const hash = hashPassword(password);
  try {
    const newUser = await db.user.create({
      data: {
        email,
        password: hash
      }
    });

    console.log('succes', newUser);
  } catch(e) {
    console.log('error', e);
  }
};

export const updateLastActiveStatus = async (id: string) => {
  await db.user.update({
    where: { id },
    data: {
      lastActive: new Date()
    }
  });
};

export async function credentialsFormSubmitFunction ({ email, password }: Inputs<typeof action>, action: 'signup' | 'signin') {
  if (action === 'signup') {
    await signUp({ email, password });
  }
  return await signIn('credentials', { email, password, redirect: false });
}
