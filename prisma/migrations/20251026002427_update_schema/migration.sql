/*
  Warnings:

  - The primary key for the `SummaryMonthly` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `breakEvenPoint` on the `SummaryMonthly` table. All the data in the column will be lost.
  - You are about to drop the column `cashFlow` on the `SummaryMonthly` table. All the data in the column will be lost.
  - You are about to drop the column `financialStatus` on the `SummaryMonthly` table. All the data in the column will be lost.
  - You are about to drop the column `totalExpense` on the `SummaryMonthly` table. All the data in the column will be lost.
  - The `id` column on the `SummaryMonthly` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `totalIncome` on the `SummaryMonthly` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `DoublePrecision`.
  - You are about to alter the column `netProfit` on the `SummaryMonthly` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `DoublePrecision`.
  - You are about to drop the `FinancialIndicator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `SummaryMonthly` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PEMASUKAN', 'TETAP', 'VARIABEL', 'MODAL');

-- CreateEnum
CREATE TYPE "CashflowStatus" AS ENUM ('SEHAT', 'WASPADA', 'KRITIS');

-- DropForeignKey
ALTER TABLE "public"."FinancialIndicator" DROP CONSTRAINT "FinancialIndicator_userId_fkey";

-- AlterTable
ALTER TABLE "SummaryMonthly" DROP CONSTRAINT "SummaryMonthly_pkey",
DROP COLUMN "breakEvenPoint",
DROP COLUMN "cashFlow",
DROP COLUMN "financialStatus",
DROP COLUMN "totalExpense",
ADD COLUMN     "totalExpenseFixed" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalExpenseVariable" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "totalIncome" SET DEFAULT 0,
ALTER COLUMN "totalIncome" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "netProfit" SET DEFAULT 0,
ALTER COLUMN "netProfit" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "SummaryMonthly_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "itemMappingId" INTEGER;

-- DropTable
DROP TABLE "public"."FinancialIndicator";

-- DropEnum
DROP TYPE "public"."FinancialStatus";

-- CreateTable
CREATE TABLE "FinancialIndicators" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "bepRupiah" DOUBLE PRECISION,
    "profitMargin" DOUBLE PRECISION,
    "cashflowStatus" "CashflowStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "summaryMonthlyId" INTEGER,

    CONSTRAINT "FinancialIndicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemMapping" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "groupType" "GroupType" NOT NULL,
    "defaultUnit" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialIndicators_summaryMonthlyId_key" ON "FinancialIndicators"("summaryMonthlyId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemMapping_itemName_key" ON "ItemMapping"("itemName");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_itemMappingId_fkey" FOREIGN KEY ("itemMappingId") REFERENCES "ItemMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialIndicators" ADD CONSTRAINT "FinancialIndicators_summaryMonthlyId_fkey" FOREIGN KEY ("summaryMonthlyId") REFERENCES "SummaryMonthly"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialIndicators" ADD CONSTRAINT "FinancialIndicators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
