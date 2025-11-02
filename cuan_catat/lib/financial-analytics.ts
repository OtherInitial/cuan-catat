import { db } from './db';
import { GroupType, CashflowStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export async function updateFinancialsForMonth(userId: string, date: Date) {
    try {
        const monthString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

        const transactions = await db.transaction.findMany({
            where: {
                userId: userId,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
                itemMappingId: {
                    not: null 
                }
            },
            include: {
                ItemMapping: {
                    select: { groupType: true }
                }
            }
        });

        let totalIncome = new Decimal(0);
        let totalExpenseFixed = new Decimal(0);
        let totalExpenseVariable = new Decimal(0);

        for (const tx of transactions) {
            const amount = tx.amount;
            switch (tx.ItemMapping?.groupType) {
                case GroupType.PEMASUKAN:
                    totalIncome = totalIncome.plus(amount);
                    break;
                case GroupType.TETAP:
                    totalExpenseFixed = totalExpenseFixed.plus(amount);
                    break;
                case GroupType.VARIABEL:
                    totalExpenseVariable = totalExpenseVariable.plus(amount);
                    break;
                case GroupType.MODAL:
                    break;
            }
        }

        const totalExpense = totalExpenseFixed.plus(totalExpenseVariable);
        const netProfit = totalIncome.minus(totalExpense);

        const netProfitNum = netProfit.toNumber();
        const totalIncomeNum = totalIncome.toNumber();
        const totalExpenseFixedNum = totalExpenseFixed.toNumber();
        const totalExpenseVariableNum = totalExpenseVariable.toNumber();

        const profitMargin = (totalIncomeNum > 0) 
            ? (netProfitNum / totalIncomeNum) * 100 
            : 0;

        const contributionMarginRatio = (totalIncomeNum > 0)
            ? (totalIncomeNum - totalExpenseVariableNum) / totalIncomeNum
            : 0;
        
        const bepRupiah = (contributionMarginRatio > 0)
            ? (totalExpenseFixedNum / contributionMarginRatio)
            : null; 

        let cashflowStatus: CashflowStatus;
        if (netProfitNum <= 0) {
            cashflowStatus = CashflowStatus.KRITIS;
        } else if (profitMargin < 25) { 
            cashflowStatus = CashflowStatus.WASPADA;
        } else {
            cashflowStatus = CashflowStatus.SEHAT;
        }

        const summary = await db.summaryMonthly.upsert({
            where: { 
                userId_month: { userId, month: monthString } 
            },
            create: {
                userId,
                month: monthString,
                totalIncome: totalIncomeNum,
                totalExpenseFixed: totalExpenseFixedNum,
                totalExpenseVariable: totalExpenseVariableNum,
                netProfit: netProfitNum,
            },
            update: {
                totalIncome: totalIncomeNum,
                totalExpenseFixed: totalExpenseFixedNum,
                totalExpenseVariable: totalExpenseVariableNum,
                netProfit: netProfitNum,
            }
        });

        await db.financialIndicators.upsert({
            where: {
                summaryMonthlyId: summary.id 
            },
            create: {
                userId,
                month: monthString,
                bepRupiah: bepRupiah,
                profitMargin: profitMargin,
                cashflowStatus: cashflowStatus,
                summaryMonthlyId: summary.id,
            },
            update: {
                bepRupiah: bepRupiah,
                profitMargin: profitMargin,
                cashflowStatus: cashflowStatus,
            }
        });
        
        console.log(`Financials updated for user ${userId} for month ${monthString}`);

    } catch (error) {
        console.error("Error updating financial analytics:", error);
    }
}