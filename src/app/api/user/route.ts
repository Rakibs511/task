import { dbConnection } from "@/utils/dbConnection";
import { prisma } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await dbConnection();
  const { name, selectedValues }: any = await req.json();
  const data = await prisma.user.create({
    data: {
      name: name,
      selectedItem: selectedValues,
    },
  });
  return NextResponse.json({ data }, { status: 201 });
};

export const GET = async (req: Request) => {
  await dbConnection();
  const data = await prisma.user.findMany();
  return NextResponse.json({ data }, { status: 200 });
};
