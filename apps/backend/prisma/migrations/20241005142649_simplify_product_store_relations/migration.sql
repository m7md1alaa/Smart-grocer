/*
  Warnings:

  - You are about to drop the `Barcodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Barcodes" DROP CONSTRAINT "Barcodes_productId_fkey";

-- DropForeignKey
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_productId_fkey";

-- DropForeignKey
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_StoreId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCategory" DROP CONSTRAINT "ProductsOnCategory_productId_fkey";

-- DropTable
DROP TABLE "Barcodes";

-- DropTable
DROP TABLE "Prices";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "Stores";

-- CreateTable
CREATE TABLE "Store" (
    "StoreId" SERIAL NOT NULL,
    "StoreName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("StoreId")
);

-- CreateTable
CREATE TABLE "Product" (
    "ProductId" SERIAL NOT NULL,
    "ProductTitle" TEXT NOT NULL,
    "description" TEXT,
    "barcode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("ProductId")
);

-- CreateTable
CREATE TABLE "StoreProductPrice" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "storeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- AddForeignKey
ALTER TABLE "StoreProductPrice" ADD CONSTRAINT "StoreProductPrice_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("StoreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreProductPrice" ADD CONSTRAINT "StoreProductPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCategory" ADD CONSTRAINT "ProductsOnCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("ProductId") ON DELETE CASCADE ON UPDATE CASCADE;
