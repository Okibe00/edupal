/*
  Warnings:

  - You are about to drop the column `lastCompletedWeek` on the `StreakHistory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId]` on the table `StreakHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StreakHistory" DROP COLUMN "lastCompletedWeek",
ADD COLUMN     "lastActivityDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "LongestStreak" (
    "id" TEXT NOT NULL,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "LongestStreak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonRead" (
    "id" TEXT NOT NULL,
    "lessonIds" TEXT[],
    "parentId" TEXT NOT NULL,

    CONSTRAINT "lessonRead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LongestStreak_profileId_key" ON "LongestStreak"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "lessonRead_parentId_key" ON "lessonRead"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "StreakHistory_parentId_key" ON "StreakHistory"("parentId");

-- AddForeignKey
ALTER TABLE "LongestStreak" ADD CONSTRAINT "LongestStreak_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ParentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonRead" ADD CONSTRAINT "lessonRead_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
