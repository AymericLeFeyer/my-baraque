/*
  Warnings:

  - Added the required column `name` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" ADD COLUMN     "name" TEXT NOT NULL;
