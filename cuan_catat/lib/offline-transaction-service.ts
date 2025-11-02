import { offlineDB, type OfflineTransaction } from "./offline-db"
import { v4 as uuidv4 } from "uuid"

export interface CreateOfflineTransactionInput {
  userId: string
  itemName: string
  date: string
  type: "INCOME" | "EXPENSE"
  amount: number
  note?: string | null
  paymentMethodId: string
  productId?: string | null
  categoryId?: string | null
  itemMappingId?: number
}

export const offlineTransactionService = {
  async createTransaction(
    input: CreateOfflineTransactionInput,
    isOnline: boolean,
  ): Promise<{
    transaction: OfflineTransaction
    needsSync: boolean
  }> {
    const transaction: OfflineTransaction = {
      id: uuidv4(),
      userId: input.userId,
      itemName: input.itemName,
      date: input.date,
      type: input.type,
      amount: input.amount,
      note: input.note,
      paymentMethodId: input.paymentMethodId,
      productId: input.productId,
      categoryId: input.categoryId,
      itemMappingId: input.itemMappingId,
      createdAt: new Date().toISOString(),
      status: isOnline ? "SYNCED" : "PENDING",
      error: undefined,
    }

    // Save to offline DB
    await offlineDB.addTransaction(transaction)

    // If online, add to sync queue immediately
    if (isOnline) {
      await offlineDB.addToQueue({
        id: uuidv4(),
        type: "TRANSACTION",
        data: transaction,
        endpoint: "/api/transactions",
        method: "POST",
        status: "PENDING",
        attempts: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    return {
      transaction,
      needsSync: !isOnline,
    }
  },

  async getLocalTransactions(userId: string): Promise<OfflineTransaction[]> {
    return offlineDB.getTransactionsByUser(userId)
  },
}
