/*
  Warnings:

  - You are about to drop the column `count` on the `Tool` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "count",
ADD COLUMN     "inBasket" INTEGER NOT NULL DEFAULT 0;
