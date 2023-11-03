import { prisma } from "@/utils/prismaClient";

export const dbConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
};
export const dbDisconnect = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected Database!");
  } catch (error) {
    console.log(error);
  }
};
