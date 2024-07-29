'use server';

import type { Stats, PetWithIndex } from "@/lib/types";
import { db } from "@/lib/utils/db";

export const createPet = async ({ appearance, name, userId }: { appearance: string, name: string; userId: string }) => {
  try {
    const newPet = await db.pet.create({
      data: {
        appearance,
        name,
        userId
      }
    });
    console.log(newPet);
  }
  catch(e) {
    console.log(e);
  }
};

export const fetchPet = async (userId: string) => {
  const pet = await db.pet.findUnique({
    where: { userId }
  });
  const createdAt = pet?.createdAt.toISOString();
  const updatedAt = pet?.updatedAt.toISOString();
  return {
    ...pet,
    createdAt,
    updatedAt
  } as PetWithIndex;
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
  const pet: PetWithIndex = await db.pet.findFirst({
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
