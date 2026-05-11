/*
  Warnings:

  - You are about to drop the column `completionStatus` on the `LessonGuide` table. All the data in the column will be lost.
  - You are about to drop the column `lessonNotes` on the `LessonGuide` table. All the data in the column will be lost.
  - You are about to drop the column `materials` on the `LessonGuide` table. All the data in the column will be lost.
  - You are about to drop the column `reinforcementTip` on the `LessonGuide` table. All the data in the column will be lost.
  - You are about to drop the column `teachingMethod` on the `LessonGuide` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subjectId,week]` on the table `LessonGuide` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `learningContent` to the `LessonGuide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LessonGuide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week` to the `LessonGuide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LessonSectionEngagement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ParentFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "LessonGuide" DROP COLUMN "completionStatus",
DROP COLUMN "lessonNotes",
DROP COLUMN "materials",
DROP COLUMN "reinforcementTip",
DROP COLUMN "teachingMethod",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "learningContent" TEXT NOT NULL,
ADD COLUMN     "learningObjectives" TEXT,
ADD COLUMN     "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "week",
ADD COLUMN     "week" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LessonSectionEngagement" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ParentFeedback" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StreakHistory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "LessonGuide_subjectId_week_key" ON "LessonGuide"("subjectId", "week");
