/*
  Warnings:

  - You are about to drop the `ToolsToBaskets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ToolsToBaskets" DROP CONSTRAINT "ToolsToBaskets_basketId_fkey";

-- DropForeignKey
ALTER TABLE "ToolsToBaskets" DROP CONSTRAINT "ToolsToBaskets_toolId_fkey";

-- DropTable
DROP TABLE "ToolsToBaskets";

-- CreateTable
CREATE TABLE "_BasketToTool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BasketToTool_AB_unique" ON "_BasketToTool"("A", "B");

-- CreateIndex
CREATE INDEX "_BasketToTool_B_index" ON "_BasketToTool"("B");

-- AddForeignKey
ALTER TABLE "_BasketToTool" ADD CONSTRAINT "_BasketToTool_A_fkey" FOREIGN KEY ("A") REFERENCES "Basket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BasketToTool" ADD CONSTRAINT "_BasketToTool_B_fkey" FOREIGN KEY ("B") REFERENCES "Tool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
