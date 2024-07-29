'use server';

import { Inputs } from "@/components/credentials-form";
import { signIn, signOut } from "@/auth";
import { type Credentials } from "@/lib/types";
import { db } from "@/lib/utils/db";
import { hashPassword } from "@/lib/utils/hash-password";
import { redirect } from 'next/navigation';

export async function credentialsFormSubmitFunction ({ email, password }: Inputs<typeof action>, action: 'signup' | 'signin') {
  if (action === 'signup') {
    await signUp({ email, password });
  }
  await signIn('credentials', { email, password });
}

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
    console.log('чот наебнулось', e);
  }
};

export const logout = async () => {
 try {
    await signOut({ redirect: false });
    console.log('succesfully signout');
    redirect('/');
 } catch(e) {
  console.error('error to signOut', e);
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
