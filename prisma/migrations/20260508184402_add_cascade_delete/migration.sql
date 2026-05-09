-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "LessonEngagement" DROP CONSTRAINT "LessonEngagement_childId_fkey";

-- DropForeignKey
ALTER TABLE "LessonGuide" DROP CONSTRAINT "LessonGuide_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "ParentChildLink" DROP CONSTRAINT "ParentChildLink_childId_fkey";

-- DropForeignKey
ALTER TABLE "ParentChildLink" DROP CONSTRAINT "ParentChildLink_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ParentProfile" DROP CONSTRAINT "ParentProfile_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "ParentProfile" DROP CONSTRAINT "ParentProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_classId_fkey";

-- DropForeignKey
ALTER TABLE "TeachingAssignment" DROP CONSTRAINT "TeachingAssignment_classId_fkey";

-- DropForeignKey
ALTER TABLE "TeachingAssignment" DROP CONSTRAINT "TeachingAssignment_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "TeachingAssignment" DROP CONSTRAINT "TeachingAssignment_teacherId_fkey";

-- AddForeignKey
ALTER TABLE "ParentProfile" ADD CONSTRAINT "ParentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentProfile" ADD CONSTRAINT "ParentProfile_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentChildLink" ADD CONSTRAINT "ParentChildLink_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ParentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentChildLink" ADD CONSTRAINT "ParentChildLink_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeacherProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingAssignment" ADD CONSTRAINT "TeachingAssignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonGuide" ADD CONSTRAINT "LessonGuide_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonEngagement" ADD CONSTRAINT "LessonEngagement_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;
