/*
  Warnings:

  - You are about to drop the column `image` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `inStock` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturer` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Basket` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Basket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Basket_name_key";

-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "image",
DROP COLUMN "inStock",
DROP COLUMN "manufacturer",
DROP COLUMN "name",
DROP COLUMN "price",
DROP COLUMN "type";
