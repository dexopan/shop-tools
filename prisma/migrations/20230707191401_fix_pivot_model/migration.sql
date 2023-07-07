/*
  Warnings:

  - You are about to drop the column `price` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `ToolsOnBaskets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Basket" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPrice" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "price",
ADD COLUMN     "priceOne" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ToolsOnBaskets" DROP COLUMN "totalPrice",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
