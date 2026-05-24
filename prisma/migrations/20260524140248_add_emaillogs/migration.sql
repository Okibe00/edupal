-- CreateTable
CREATE TABLE "emailLog" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emailLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emailLog_subjectId_key" ON "emailLog"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "emailLog_lessonId_key" ON "emailLog"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "emailLog_subjectId_lessonId_week_key" ON "emailLog"("subjectId", "lessonId", "week");
