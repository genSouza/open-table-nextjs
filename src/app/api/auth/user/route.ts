import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";

const prismaClient = new PrismaClient();

export async function GET(req: Request) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken!.split(" ")[1];
  const payload = jwt.decode(token) as { userId: string };
  const user = await prismaClient.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      email: true,
      phone: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { response: { errors: ["Unauthorized request - invalid token"] } },
      { status: 401 }
    );
  }
  
  prismaClient.$disconnect();

  return NextResponse.json(
    {
      response: {
        user: {
          userId: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          city: user.city,
          email: user.email,
          phone: user.phone,
        },
      },
    },
    { status: 200 }
  );
}
