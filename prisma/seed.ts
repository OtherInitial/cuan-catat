import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultPaymentMethods = [
  "TUNAI",
  "DEBIT",
  "KREDIT",
  "TRANSFER",
  "EWALLET"
];

async function main() {
  console.log("Mulai proses seeding untuk PaymentMethod...");

  for (const name of defaultPaymentMethods) {
    const existingMethod = await prisma.paymentMethod.findFirst({
      where: {
        name: name,
        userId: null,
        isDefault: true,
      },
    });

    if (!existingMethod) {
      await prisma.paymentMethod.create({
        data: {
          name: name,
          userId: null,
          isDefault: true,
        },
      });
      console.log(`Metode default '${name}' telah dibuat.`);
    } else {
      console.log(`Metode default '${name}' sudah ada.`);
    }
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