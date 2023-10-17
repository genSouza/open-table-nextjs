import { prisma } from "@/app/db/prisma";
import { findAllAvailableTables } from "@/app/services/restaurant/TablesService";
import ExtractSlugFromURL from "@/utils/ExtractSlugFromURL";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const slug = ExtractSlugFromURL(pathName);

  if (!slug) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  const { day, time, partySize } = Object.fromEntries(req.nextUrl.searchParams);

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { message: { errors: ["Restaurant not found"] } },
      { status: 400 }
    );
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return NextResponse.json(
      { message: { errors: ["Restaurant is not open at that time"] } },
      { status: 400 }
    );
  }

  let searchTimesWithTables;
  try {
    searchTimesWithTables = await findAllAvailableTables({
      time,
      day,
      restaurant,
    });
  } catch (e) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  if (!searchTimesWithTables) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  const searchTimeWithTable = searchTimesWithTables.find((t) => {
    return t.date.toISOString() == new Date(`${day}T${time}`).toISOString();
  });

  if (!searchTimeWithTable) {
    return NextResponse.json(
      { message: { errors: ["No availability, cannot book"] } },
      { status: 400 }
    );
  }

  return NextResponse.json({ searchTimeWithTable, searchTimesWithTables }, { status: 200 });
}
