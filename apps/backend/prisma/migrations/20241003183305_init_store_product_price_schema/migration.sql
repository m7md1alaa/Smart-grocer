-- CreateTable
CREATE TABLE "Stores" (
    "StoreId" SERIAL NOT NULL,
    "StoreName" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("StoreId")
);

-- CreateTable
CREATE TABLE "Products" (
    "ProductId" SERIAL NOT NULL,
    "ProductTitle" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storesStoreId" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductId")
);

-- CreateTable
CREATE TABLE "Prices" (
    "PriceId" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "storeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("PriceId")
);

-- CreateTable
CREATE TABLE "Barcodes" (
    "BarcodeId" SERIAL NOT NULL,
    "barcode" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Barcodes_pkey" PRIMARY KEY ("BarcodeId")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnCategory" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "ProductsOnCategory_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barcodes_barcode_key" ON "Barcodes"("barcode");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_storesStoreId_fkey" FOREIGN KEY ("storesStoreId") REFERENCES "Stores"("StoreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Stores"("StoreId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barcodes" ADD CONSTRAINT "Barcodes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCategory" ADD CONSTRAINT "ProductsOnCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("ProductId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCategory" ADD CONSTRAINT "ProductsOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
