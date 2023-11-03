import { PrismaClient } from "@prisma/client";
import { dataArray } from "./data";

const prisma = new PrismaClient();
const deleteEveryData = async () => {
  await prisma.options.deleteMany();
};

deleteEveryData().then(() => {
  console.log("deleted all data first!!");
});

export const seeding = async () => {
  await prisma.options.create({
    data: {
      DataArray: dataArray,
    },
  });
};

seeding()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("Seeding Completed!");
    await prisma.$disconnect();
  });
