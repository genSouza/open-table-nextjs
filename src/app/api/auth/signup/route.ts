import { NextResponse } from "next/server";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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
    return NextResponse.json({ response: { errors } }, { status: 400 });
  }

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists)
    return NextResponse.json(
      { response: { errors: ["User already exists"] } },
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

  return NextResponse.json({ response: { user } }, { status: 200 });
}
