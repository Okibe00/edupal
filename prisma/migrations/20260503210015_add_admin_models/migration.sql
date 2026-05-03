/*
  Warnings:

  - Changed the type of `name` on the `Permission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TeachingAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "subdomain" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TeachingAssignment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");
