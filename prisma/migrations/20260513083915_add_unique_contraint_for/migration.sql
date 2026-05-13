/*
  Warnings:

  - You are about to drop the column `academicWeekId` on the `LessonGuide` table. All the data in the column will be lost.
  - You are about to drop the `AcademicSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AcademicTerm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AcademicWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SchoolAcademicState` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,yearGroup]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId,week]` on the table `LessonGuide` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,classId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `week` to the `LessonGuide` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcademicSession" DROP CONSTRAINT "AcademicSession_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "AcademicTerm" DROP CONSTRAINT "AcademicTerm_academicSessionId_fkey";

-- DropForeignKey
ALTER TABLE "AcademicWeek" DROP CONSTRAINT "AcademicWeek_termId_fkey";

-- DropForeignKey
ALTER TABLE "LessonGuide" DROP CONSTRAINT "LessonGuide_academicWeekId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolAcademicState" DROP CONSTRAINT "SchoolAcademicState_currentSessionId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolAcademicState" DROP CONSTRAINT "SchoolAcademicState_currentTermId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolAcademicState" DROP CONSTRAINT "SchoolAcademicState_currentWeekId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolAcademicState" DROP CONSTRAINT "SchoolAcademicState_schoolId_fkey";

-- DropIndex
DROP INDEX "Class_name_yearGroup_schoolId_key";

-- DropIndex
DROP INDEX "LessonGuide_academicWeekId_idx";

-- DropIndex
DROP INDEX "LessonGuide_subjectId_academicWeekId_key";

-- DropIndex
DROP INDEX "LessonGuide_subjectId_idx";

-- AlterTable
ALTER TABLE "LessonGuide" DROP COLUMN "academicWeekId",
ADD COLUMN     "week" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AcademicSession";

-- DropTable
DROP TABLE "AcademicTerm";

-- DropTable
DROP TABLE "AcademicWeek";

-- DropTable
DROP TABLE "SchoolAcademicState";

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_yearGroup_key" ON "Class"("name", "yearGroup");

-- CreateIndex
CREATE UNIQUE INDEX "LessonGuide_subjectId_week_key" ON "LessonGuide"("subjectId", "week");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_id_classId_key" ON "Subject"("id", "classId");
