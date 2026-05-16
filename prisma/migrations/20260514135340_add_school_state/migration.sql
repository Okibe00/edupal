-- CreateTable
CREATE TABLE "SchoolState" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "SchoolState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolState_schoolId_key" ON "SchoolState"("schoolId");

-- AddForeignKey
ALTER TABLE "SchoolState" ADD CONSTRAINT "SchoolState_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
