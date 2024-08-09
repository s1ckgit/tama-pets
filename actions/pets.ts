'use server';

import { auth, unstable_update } from "@/auth";
import { db } from "@/lib/utils/db";
import { prismaErrorMiddleware } from "@/lib/utils/prisma-error-middleware";
import { deserializeReviver, serializeReplacer } from "@/lib/utils/serializing-state";
import type { PetConstructorState, PetState, PetWithIndex, Stats } from "@/lib/types";

export const createPet = prismaErrorMiddleware(async function({ appearance, name, userId }: { appearance: string, name: string; userId: string }) {
    const newPet = await db.pet.create({
      data: {
        appearance,
        name,
        userId
      }
    });
    return newPet;
});

export const fetchPet = async () => {
  const session = await auth();
  const userId = session?.user.id;

  const pet = await db.pet.findUnique({
    where: { userId }
  });

  if(pet) {
    const deserializedAppearance: object = JSON.parse(pet.appearance as string, deserializeReviver);
    const createdAt = pet?.createdAt.toISOString();
    const updatedAt = pet?.updatedAt.toISOString();
    return {
      ...pet,
      appearance: deserializedAppearance,
      createdAt,
      updatedAt
    } as PetState;
  }
  return null;
};

export const updatePet = async (petData: Stats, userId: string) => {
  const updatedPet = await db.pet.update({
    where: { userId },
    data: petData
  });

  return updatedPet;
};

export const updateActivePetsStatusByTime = async () => {
  const activeThreshold = new Date(Date.now() - 60 * 60 * 1000);
  const activeUsers = await db.user.findMany({
    where: {
      lastActive: {
        gte: activeThreshold
      }
    }
  });

  const activeUsersIds = activeUsers.map((user) => user.id);
  const pets = await db.pet.findMany({
    where: {
      userId: {
        in: activeUsersIds
      }
    },
    select: {
      id: true,
      thirst: true,
      hunger: true,
      cleanliness: true,
    }
  });

  const groupSize = 100;
  for (let i = 0; i < pets.length; i += groupSize) {
    const group = pets.slice(i, i + groupSize);

    const updatePromises = group.map((pet) => {
      const { id, thirst, hunger, cleanliness } = pet;
      return db.pet.update({
        where: { id },
        data: {
          hunger: hunger - 0.1,
          thirst: thirst - 0.1,
          cleanliness: cleanliness - 0.1
        }
      });
    });
    await Promise.all(updatePromises);
  }
};

export const changePetsStats = async (id: string, stats: Stats) => {
  const pet: PetWithIndex | null = await db.pet.findFirst({
    where: { id }
  });

  if (!pet) return;

  const changedStats = {} as {[key: string]: number};

  for(const key in stats) {
    changedStats[key] = pet[key] as number + stats[key];
  }

  await db.pet.update({
    where: { id },
    data: changedStats
  });

};

export const savePetToDB = async (constructorState: PetConstructorState, name: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if(userId) {
  const appearanceData = JSON.stringify(constructorState, serializeReplacer);
  const pet = await createPet({ 
    appearance: appearanceData,
    userId,
    name
  });

  await unstable_update({
    user: {
      ...session.user,
      pet: pet.id
    }
  });

  return pet;
  }
};
