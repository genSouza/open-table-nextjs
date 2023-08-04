import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import validator from "validator";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Must be a valid email address",
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password must not be empty",
    },
  ];

  validationSchema.forEach((item) => {
    if (!item.valid) {
      errors.push(item.errorMessage);
    }
  });
  if (errors.length > 0) {
    return NextResponse.json({ response: { errors } }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json(
      { response: { errors: ["Password is incorrect or user does not exist"] } },
      { status: 401 }
    );

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return NextResponse.json(
      { response: { errors: ["Password is incorrect or user does not exist"] } },
      { status: 401 }
    );
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  return NextResponse.json({ response: { token: token } }, { status: 200 });
}
