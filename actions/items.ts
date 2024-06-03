'use server';

import { Item } from "@/lib/types";
import { db } from "@/lib/utils/db";

export const createItem = async (data: Item) => {
  const { name, stats, experience } = data;

  const item = await db.item.create({
    data: {
      name,
      stats,
      experience
    }
  });

  return item;
};

export const changeInventoryItem = async (itemId: string, amount: number) => {
  const inventoryID = '610b1328-ecf7-484a-8cab-07a217b1fa7c';

  const relation = await db.inventoryItem.findFirst({
    where: { petInventoryId: inventoryID, itemId }
  });

  if (relation) {
    if ((relation.quantity + amount) === 0) {
      await db.inventoryItem.delete({
        where: { id: relation.id }
      });
      return;
    }
    await db.inventoryItem.update({
      where: { id: relation.id },
      data: {
        quantity: relation.quantity + amount
      }
    });
  }
  else {
    await db.inventoryItem.create({
      data: {
        petInventoryId: inventoryID,
        itemId,
        quantity: amount
      }
    });
  }
};
