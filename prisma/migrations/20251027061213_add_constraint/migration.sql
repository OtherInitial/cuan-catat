/*
  Warnings:

  - A unique constraint covering the columns `[userId,month]` on the table `SummaryMonthly` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SummaryMonthly_userId_month_key" ON "SummaryMonthly"("userId", "month");
