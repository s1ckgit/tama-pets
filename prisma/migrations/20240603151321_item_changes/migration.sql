/*
  Warnings:

  - You are about to drop the column `downAmount` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `downStat` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `upAmount` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `upStat` on the `Item` table. All the data in the column will be lost.
  - Added the required column `stats` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "downAmount",
DROP COLUMN "downStat",
DROP COLUMN "upAmount",
DROP COLUMN "upStat",
ADD COLUMN     "stats" JSONB NOT NULL;
