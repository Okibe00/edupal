/*
  Warnings:

  - You are about to drop the column `channel` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `sentAt` on the `Notification` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LESSON_CONTENT_ALERT');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "channel",
DROP COLUMN "sentAt",
DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;
