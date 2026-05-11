/*
  Warnings:

  - Added the required column `name` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "name" TEXT NOT NULL;
