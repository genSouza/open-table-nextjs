import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");

  if (
    !bearerToken ||
    !bearerToken.startsWith("Bearer ") ||
    bearerToken === "Bearer undefined" ||
    bearerToken === "Bearer null" ||
    bearerToken === "Bearer" ||
    bearerToken.split(" ")[1].length === 0
  ) {
    return NextResponse.json(
      { response: { errors: ["No token provided"] } },
      { status: 401 }
    );
  }
  const token = bearerToken.split(" ")[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return NextResponse.json(
      { response: { errors: ["Unauthorized request - invalid token"] } },
      { status: 401 }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/auth/user"],
};
