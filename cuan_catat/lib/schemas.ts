import { z } from 'zod';
import { TransactionType } from '@prisma/client';

// export const TransactionType = z.enum(["PEMASUKAN", "PENGELUARAN"]);
// export const PaymentMethod = z.enum(["TUNAI", "DEBIT", "KREDIT", "TRANSFER", "EWALLET"]);

export const createTransactionSchema = z.object({
  date: z.string().datetime(), 
  itemName: z.string().min(1, { message: "Nama item harus diisi" }),
  amount: z.number().positive({ message: "Jumlah uang harus positif" }), 
  type: z.nativeEnum(TransactionType),
  categoryId: z.string().optional().nullable(),
  paymentMethodId: z.string().min(1, { message: "Metode pembayaran harus diisi" }),
  productId: z.string().uuid().optional().nullable(),
  note: z.string().optional().nullable(),
}).refine(data => {
    if (data.type === TransactionType.PEMASUKAN && data.productId && data.categoryId) {
        return false; 
    }
    return true;
}, { message: "Penjualan produk tidak bisa memiliki kategori biasa", path: ["productId"] });

export const updateTransactionSchema = createTransactionSchema.partial();