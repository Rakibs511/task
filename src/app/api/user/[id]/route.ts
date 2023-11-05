import { dbConnection } from "@/utils/dbConnection";
import { prisma } from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  dbConnection();
  const id = req.url.split("user/")[1];

  const data = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ data }, { status: 200 });
};
