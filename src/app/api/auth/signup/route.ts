import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma }  from "../../../db/prisma";

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, city, password } =
    await req.json();
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 2, max: 20 }),
      errorMessage: "First name must be between 2 and 20 characters",
    },
    {
      valid: validator.isLength(lastName, { min: 2, max: 20 }),
      errorMessage: "Last name must be between 2 and 20 characters",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Must be a valid email address",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Must be a valid phone number",
    },
    {
      valid: validator.isLength(city, { min: 2 }),
      errorMessage: "City must be at least 2 characters",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is not strong enough",
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

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists)
    return NextResponse.json(
      { message: { errors: ["User already exists"] } },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      city: city,
      password: hashedPassword,
      phone: phone,
    },
  });

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
    httpOnly: true,
  });

  return response;
}
