'use server';

import { type IRegisterCredentials } from "@/lib/types";
import { db } from "@/lib/utils/db";
import { hashPassword } from "@/lib/utils/hash-password";

export const signUp = async (data: IRegisterCredentials) => {
  const { email, password, color, breed } = data;

  const hash = hashPassword(password);
  try {
    const newUser = await db.user.create({
      data: {
        email,
        password: hash
      }
    });

    const newPet = await db.pet.create({
      data: {
        color,
        breed,
        userId: newUser.id
      }
    });
    console.log('succes', newUser, newPet);
  } catch(e) {
    console.log('чот наебнулось', e);
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
