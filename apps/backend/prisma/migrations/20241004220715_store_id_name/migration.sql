/*
  Warnings:

  - You are about to drop the column `storesStoreId` on the `Products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_storesStoreId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "storesStoreId",
ADD COLUMN     "StoreId" INTEGER;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_StoreId_fkey" FOREIGN KEY ("StoreId") REFERENCES "Stores"("StoreId") ON DELETE SET NULL ON UPDATE CASCADE;
