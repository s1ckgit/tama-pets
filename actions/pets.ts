import { db } from "@/lib/utils/db";

export const updateActivePetsStatusByTime = async () => {
  const activeThreshold = new Date(Date.now() - 60 * 60 * 1000);
  const activeUsers = await db.user.findMany({
    where: {
      lastActive: {
        gte: activeThreshold
      }
    }
  });

  for (const user of activeUsers) {
    const pet = await db.pet.findFirst({
      where: { userId: user.id }
    });

    if (pet) {
      const { id, thirst, hunger, cleanliness } = pet;
      await db.pet.update({
        where: { id },
        data: {
          hunger: hunger - 0.1,
          thirst: thirst - 0.1,
          cleanliness: cleanliness - 0.1
        }
      });
    }
  }
};
