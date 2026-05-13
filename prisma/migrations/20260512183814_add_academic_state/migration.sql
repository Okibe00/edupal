/*
  Warnings:

  - You are about to drop the column `week` on the `LessonGuide` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,yearGroup,schoolId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subjectId,academicWeekId]` on the table `LessonGuide` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `academicWeekId` to the `LessonGuide` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Class_name_yearGroup_key";

-- DropIndex
DROP INDEX "LessonGuide_subjectId_week_key";

-- AlterTable
ALTER TABLE "LessonGuide" DROP COLUMN "week",
ADD COLUMN     "academicWeekId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AcademicSession" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicTerm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "termNumber" INTEGER NOT NULL,
    "academicSessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicWeek" (
    "id" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "termId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolAcademicState" (
    "id" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "currentSessionId" TEXT NOT NULL,
    "currentTermId" TEXT NOT NULL,
    "currentWeekId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolAcademicState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicSession_schoolId_name_key" ON "AcademicSession"("schoolId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicTerm_academicSessionId_termNumber_key" ON "AcademicTerm"("academicSessionId", "termNumber");

-- CreateIndex
CREATE INDEX "AcademicWeek_termId_weekNumber_idx" ON "AcademicWeek"("termId", "weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicWeek_termId_weekNumber_key" ON "AcademicWeek"("termId", "weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolAcademicState_schoolId_key" ON "SchoolAcademicState"("schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_yearGroup_schoolId_key" ON "Class"("name", "yearGroup", "schoolId");

-- CreateIndex
CREATE INDEX "LessonGuide_academicWeekId_idx" ON "LessonGuide"("academicWeekId");

-- CreateIndex
CREATE INDEX "LessonGuide_subjectId_idx" ON "LessonGuide"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonGuide_subjectId_academicWeekId_key" ON "LessonGuide"("subjectId", "academicWeekId");

-- AddForeignKey
ALTER TABLE "AcademicSession" ADD CONSTRAINT "AcademicSession_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicTerm" ADD CONSTRAINT "AcademicTerm_academicSessionId_fkey" FOREIGN KEY ("academicSessionId") REFERENCES "AcademicSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicWeek" ADD CONSTRAINT "AcademicWeek_termId_fkey" FOREIGN KEY ("termId") REFERENCES "AcademicTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAcademicState" ADD CONSTRAINT "SchoolAcademicState_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAcademicState" ADD CONSTRAINT "SchoolAcademicState_currentSessionId_fkey" FOREIGN KEY ("currentSessionId") REFERENCES "AcademicSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAcademicState" ADD CONSTRAINT "SchoolAcademicState_currentTermId_fkey" FOREIGN KEY ("currentTermId") REFERENCES "AcademicTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolAcademicState" ADD CONSTRAINT "SchoolAcademicState_currentWeekId_fkey" FOREIGN KEY ("currentWeekId") REFERENCES "AcademicWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonGuide" ADD CONSTRAINT "LessonGuide_academicWeekId_fkey" FOREIGN KEY ("academicWeekId") REFERENCES "AcademicWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;
