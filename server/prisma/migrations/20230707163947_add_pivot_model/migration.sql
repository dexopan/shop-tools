/*
  Warnings:

  - You are about to drop the column `count` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `inBasket` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the `_BasketToTool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BasketToTool" DROP CONSTRAINT "_BasketToTool_A_fkey";

-- DropForeignKey
ALTER TABLE "_BasketToTool" DROP CONSTRAINT "_BasketToTool_B_fkey";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "count",
DROP COLUMN "totalPrice";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "inBasket";

-- DropTable
DROP TABLE "_BasketToTool";

-- CreateTable
CREATE TABLE "ToolsOnBaskets" (
    "toolId" TEXT NOT NULL,
    "basketId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolsOnBaskets_pkey" PRIMARY KEY ("toolId","basketId")
);

-- AddForeignKey
ALTER TABLE "ToolsOnBaskets" ADD CONSTRAINT "ToolsOnBaskets_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsOnBaskets" ADD CONSTRAINT "ToolsOnBaskets_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
