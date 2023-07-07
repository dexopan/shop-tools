-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "vendorCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "inStock" INTEGER NOT NULL DEFAULT 0,
    "bestseller" BOOLEAN NOT NULL DEFAULT false,
    "new" BOOLEAN NOT NULL DEFAULT false,
    "popularity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);
