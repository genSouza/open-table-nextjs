import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import validator from "validator";
import { prisma } from "../../../db/prisma";

export async function POST(req: NextRequest) {
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
    return NextResponse.json({ message: { errors } }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json(
      {
        message: { errors: ["Password is incorrect or user does not exist"] },
      },
      { status: 401 }
    );

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return NextResponse.json(
      {
        message: { errors: ["Password is incorrect or user does not exist"] },
      },
      { status: 401 }
    );
  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);

  const response = NextResponse.json(
    {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
      },
    },
    { status: 200 }
  );

  response.cookies.set({
    name: "jwt",
    value: token,
    maxAge: 60 * 60 * 2,
    secure: true,
    sameSite: "strict",
    httpOnly: false,
  });

  return response;
}
