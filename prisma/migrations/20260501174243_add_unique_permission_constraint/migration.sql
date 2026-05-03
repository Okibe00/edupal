/*
  Warnings:

  - The values [ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - The `yearGroup` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('SUPER_ADMIN', 'TEACHER', 'PARENT', 'STUDENT', 'SCHOOL_ADMIN');
ALTER TABLE "Role" ALTER COLUMN "name" TYPE "UserRole_new" USING ("name"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "yearGroup",
ADD COLUMN     "yearGroup" INTEGER;

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "tel" TEXT;
