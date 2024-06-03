'use server';

import { signOut } from "@/auth";
import { type RegisterCredentials } from "@/lib/types";
import { db } from "@/lib/utils/db";
import { hashPassword } from "@/lib/utils/hash-password";
import { redirect } from "next/dist/client/components/redirect";

export const signUp = async (data: RegisterCredentials) => {
  const { email, password, color, breed, name } = data;

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
        name,
        userId: newUser.id
      }
    });

    const inventory = await db.petInventory.create({
      data: {
        pet: {
          connect: { id: newPet.id }
        }
      }
    });

    console.log('succes', newUser, newPet, inventory);
  } catch(e) {
    console.log('чот наебнулось', e);
  }
};

export const logout = async () => {
 try {
    await signOut({ redirect: false });
    console.log('succesfully signout');
 } catch(e) {
  console.error('error to signOut', e);
 }
 finally {
  redirect('/');
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
