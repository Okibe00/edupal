/*
  Warnings:

  - A unique constraint covering the columns `[name,yearGroup]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Made the column `yearGroup` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "yearGroup" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_yearGroup_key" ON "Class"("name", "yearGroup");
