/*
  Warnings:

  - You are about to drop the column `houseId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_houseId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "houseId";

-- CreateTable
CREATE TABLE "_HouseToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HouseToUser_AB_unique" ON "_HouseToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HouseToUser_B_index" ON "_HouseToUser"("B");

-- AddForeignKey
ALTER TABLE "_HouseToUser" ADD CONSTRAINT "_HouseToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "House"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HouseToUser" ADD CONSTRAINT "_HouseToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
