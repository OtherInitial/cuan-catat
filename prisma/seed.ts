import { PrismaClient, GroupType } from '@prisma/client';

const prisma = new PrismaClient();

const defaultPaymentMethods = [
  "TUNAI",
  "DEBIT",
  "KREDIT",
  "TRANSFER",
  "EWALLET"
];

const itemMappings = [
  { itemName: 'Penjualan Kue', groupType: GroupType.PEMASUKAN },
  { itemName: 'Penjualan Kopi', groupType: GroupType.PEMASUKAN },
  { itemName: 'Jasa Desain', groupType: GroupType.PEMASUKAN },
  { itemName: 'Pendapatan Lain-lain', groupType: GroupType.PEMASUKAN },

  { itemName: 'Gaji Karyawan', groupType: GroupType.TETAP },
  { itemName: 'Sewa Ruko', groupType: GroupType.TETAP },
  { itemName: 'Sewa Toko', groupType: GroupType.TETAP },
  { itemName: 'Biaya Langganan (Software)', groupType: GroupType.TETAP },
  { itemName: 'Listrik', groupType: GroupType.TETAP }, 
  { itemName: 'Air', groupType: GroupType.TETAP },
  { itemName: 'Internet', groupType: GroupType.TETAP },

  { itemName: 'Tepung Terigu', groupType: GroupType.VARIABEL },
  { itemName: 'Gula', groupType: GroupType.VARIABEL },
  { itemName: 'Telur', groupType: GroupType.VARIABEL },
  { itemName: 'Biji Kopi', groupType: GroupType.VARIABEL },
  { itemName: 'Susu', groupType: GroupType.VARIABEL },
  { itemName: 'Plastik Kemasan', groupType: GroupType.VARIABEL },
  { itemName: 'Gas Elpiji', groupType: GroupType.VARIABEL },
  { itemName: 'Bahan Baku', groupType: GroupType.VARIABEL },

  { itemName: 'Beli Oven', groupType: GroupType.MODAL },
  { itemName: 'Beli Mesin Kopi', groupType: GroupType.MODAL },
  { itemName: 'Beli Laptop', groupType: GroupType.MODAL },
  { itemName: 'Renovasi Toko', groupType: GroupType.MODAL },
];

async function main() {
  console.log("Mulai proses seeding untuk PaymentMethod...");

  // for (const name of defaultPaymentMethods) {
  //   const existingMethod = await prisma.paymentMethod.findFirst({
  //     where: {
  //       name: name,
  //       userId: null,
  //       isDefault: true,
  //     },
  //   });

  //   if (!existingMethod) {
  //     await prisma.paymentMethod.create({
  //       data: {
  //         name: name,
  //         userId: null,
  //         isDefault: true,
  //       },
  //     });
  //     console.log(`Metode default '${name}' telah dibuat.`);
  //   } else {
  //     console.log(`Metode default '${name}' sudah ada.`);
  //   }
  // }

  for (const item of itemMappings) {
    await prisma.itemMapping.upsert({
      where: { itemName: item.itemName }, 
      update: { groupType: item.groupType },
      create: {
        itemName: item.itemName,
        groupType: item.groupType,
      },
    });
  }
  
  console.log("Seeding PaymentMethod selesai.");
}

main()
  .catch((e) => {
    console.error("Gagal melakukan seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });