/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,classId,subjectId]` on the table `TeachingAssignment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeachingAssignment_teacherId_classId_subjectId_key" ON "TeachingAssignment"("teacherId", "classId", "subjectId");
