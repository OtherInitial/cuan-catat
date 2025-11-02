import { PrismaClient, TransactionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { updateFinancialsForMonth } from '../lib/financial-analytics'; 

const prisma = new PrismaClient();

async function main() {
    console.log(`Mulai seeding data KRITIS...`);
    const plainPassword = 'password123';
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const user = await prisma.user.upsert({
        where: { email: 'user-coba@example.com' },
        update: {},
        create: {
            email: 'user-coba@example.com',
            name: 'User Kritis',
            password: hashedPassword, 
        },
    });
    console.log(`User tes dibuat/ditemukan: ${user.id}`);

    let mapJualKue, mapSewa, mapGaji, mapTepung, mapGula;
    try {
        mapJualKue = await prisma.itemMapping.findUniqueOrThrow({ where: { itemName: 'Penjualan Kue' } });
        mapSewa = await prisma.itemMapping.findUniqueOrThrow({ where: { itemName: 'Sewa Ruko' } });
        mapGaji = await prisma.itemMapping.findUniqueOrThrow({ where: { itemName: 'Gaji Karyawan' } });
        mapTepung = await prisma.itemMapping.findUniqueOrThrow({ where: { itemName: 'Tepung Terigu' } });
        mapGula = await prisma.itemMapping.findUniqueOrThrow({ where: { itemName: 'Gula' } });
    } catch (e) {
        console.error("Gagal menemukan ItemMapping. Pastikan Anda sudah menjalankan 'npx prisma db seed' terlebih dahulu.");
        throw e;
    }
    
    const year = 2025;
    const month = 9; 
    
    await prisma.transaction.deleteMany({
        where: { userId: user.id, date: { gte: new Date(year, month, 1), lt: new Date(year, month + 1, 1) } }
    });
    console.log('Transaksi lama (jika ada) untuk Okt 2025 telah dihapus.');

    const transactionsToCreate = [
        {
            date: new Date(year, month, 5),
            itemName: 'Penjualan Kue',
            type: TransactionType.PEMASUKAN,
            amount: 1000000,
            itemMappingId: mapJualKue.id,
        },
        {
            date: new Date(year, month, 12),
            itemName: 'Penjualan Kue',
            type: TransactionType.PEMASUKAN,
            amount: 500000,
            itemMappingId: mapJualKue.id,
        },
        
        {
            date: new Date(year, month, 1),
            itemName: 'Sewa Ruko',
            type: TransactionType.PENGELUARAN,
            amount: 800000,
            itemMappingId: mapSewa.id,
        },
        {
            date: new Date(year, month, 25),
            itemName: 'Gaji Karyawan',
            type: TransactionType.PENGELUARAN,
            amount: 400000,
            itemMappingId: mapGaji.id,
        },
        {
            date: new Date(year, month, 10),
            itemName: 'Tepung Terigu',
            type: TransactionType.PENGELUARAN,
            amount: 200000,
            itemMappingId: mapTepung.id,
        },
        {
            date: new Date(year, month, 10),
            itemName: 'Gula',
            type: TransactionType.PENGELUARAN,
            amount: 150000,
            itemMappingId: mapGula.id,
        },
    ];

    for (const tx of transactionsToCreate) {
        await prisma.transaction.create({
            data: {
                ...tx,
                userId: user.id,
                paymentMethodId: null, 
                categoryId: null,
            }
        });
    }
    console.log(`Berhasil membuat ${transactionsToCreate.length} transaksi tes.`);

    console.log('Menjalankan kalkulator keuangan untuk Oktober 2025...');
    await updateFinancialsForMonth(user.id, new Date(year, month, 1));
    console.log('Kalkulasi selesai.');

    const indicator = await prisma.financialIndicators.findFirst({
        where: { userId: user.id, month: `${year}-${(month + 1).toString().padStart(2, '0')}` }
    });
    
    console.log('--- HASIL KALKULASI ---');
    console.log(indicator);
    if (indicator?.cashflowStatus === 'KRITIS') {
        console.log('✅ Sukses! Status keuangan berhasil diset ke KRITIS.');
    } else {
        console.log('❌ Gagal! Status keuangan BUKAN KRITIS.');
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });