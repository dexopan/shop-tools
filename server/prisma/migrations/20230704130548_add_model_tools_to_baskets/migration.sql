/*
  Warnings:

  - You are about to drop the `_BasketToTool` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BasketToTool" DROP CONSTRAINT "_BasketToTool_A_fkey";

-- DropForeignKey
ALTER TABLE "_BasketToTool" DROP CONSTRAINT "_BasketToTool_B_fkey";

-- DropTable
DROP TABLE "_BasketToTool";

-- CreateTable
CREATE TABLE "ToolsToBaskets" (
    "toolId" TEXT NOT NULL,
    "basketId" TEXT NOT NULL,

    CONSTRAINT "ToolsToBaskets_pkey" PRIMARY KEY ("toolId","basketId")
);

-- AddForeignKey
ALTER TABLE "ToolsToBaskets" ADD CONSTRAINT "ToolsToBaskets_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToolsToBaskets" ADD CONSTRAINT "ToolsToBaskets_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
