import { dbConnection } from "@/utils/dbConnection";
import { prisma } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await dbConnection();
  const data = await prisma.options.findMany();
  return NextResponse.json({ data }, { status: 200 });
};
