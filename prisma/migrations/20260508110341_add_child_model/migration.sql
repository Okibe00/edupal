/*
  Warnings:

  - You are about to drop the column `studentProfileId` on the `ParentFeedback` table. All the data in the column will be lost.
  - You are about to drop the `ParentStudentLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `ParentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `childId` to the `ParentFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolId` to the `ParentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LessonEngagement" DROP CONSTRAINT "LessonEngagement_childId_fkey";

-- DropForeignKey
ALTER TABLE "ParentFeedback" DROP CONSTRAINT "ParentFeedback_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ParentStudentLink" DROP CONSTRAINT "ParentStudentLink_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ParentStudentLink" DROP CONSTRAINT "ParentStudentLink_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_classId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_userId_fkey";

-- AlterTable
ALTER TABLE "ParentFeedback" DROP COLUMN "studentProfileId",
ADD COLUMN     "childId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParentProfile" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "schoolId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ParentStudentLink";

-- DropTable
DROP TABLE "StudentProfile";

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "admissionNumber" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentChildLink" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,

    CONSTRAINT "ParentChildLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Child_admissionNumber_key" ON "Child"("admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ParentChildLink_parentId_childId_key" ON "ParentChildLink"("parentId", "childId");

-- CreateIndex
CREATE UNIQUE INDEX "ParentProfile_phoneNumber_key" ON "ParentProfile"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentProfile" ADD CONSTRAINT "ParentProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentChildLink" ADD CONSTRAINT "ParentChildLink_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentChildLink" ADD CONSTRAINT "ParentChildLink_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonEngagement" ADD CONSTRAINT "LessonEngagement_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentFeedback" ADD CONSTRAINT "ParentFeedback_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
