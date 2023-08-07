import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { prisma } from "../../../db/prisma";

export async function GET(req: Request) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken!.split(" ")[1];
  const payload = jwt.decode(token) as { userId: string };
  const user = await prisma.user.findUnique({
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
      { message: { errors: ["Unauthorized request - invalid token"] } },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      user: {
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        city: user.city,
        email: user.email,
        phone: user.phone,
      },
    },
    { status: 200 }
  );
}
