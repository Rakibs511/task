import { dbConnection } from "@/utils/dbConnection";
import { prisma } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await dbConnection();
  const { id, name, selectedValues, agreeOfTerms }: any = await req.json();
  const create = async () => {
    const data = await prisma.user.create({
      data: {
        id: id,
        name: name,
        selectedItem: selectedValues,
        agreeToTerms: agreeOfTerms,
      },
    });
    return NextResponse.json({ data }, { status: 201 });
  };
  create().catch(async () => {
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        selectedItem: selectedValues,
        agreeToTerms: agreeOfTerms,
      },
    });
    return NextResponse.json({ data }, { status: 201 });
  });
  return NextResponse.json({ status: 404 });
};

export const GET = async (req: Request) => {
  await dbConnection();
  const data = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json({ data }, { status: 200 });
};
