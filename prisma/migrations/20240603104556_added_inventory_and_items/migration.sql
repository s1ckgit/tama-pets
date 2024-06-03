-- CreateTable
CREATE TABLE "PetInventory" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "PetInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "upStat" TEXT NOT NULL,
    "upAmount" DOUBLE PRECISION NOT NULL,
    "experience" DOUBLE PRECISION NOT NULL,
    "downStat" TEXT,
    "downAmount" DOUBLE PRECISION,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "petInventoryId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetInventory_petId_key" ON "PetInventory"("petId");

-- CreateIndex
CREATE INDEX "idx_petInventoryId" ON "InventoryItem"("petInventoryId");

-- CreateIndex
CREATE INDEX "idx_itemId" ON "InventoryItem"("itemId");

-- CreateIndex
CREATE INDEX "User_lastActive_idx" ON "User"("lastActive");
