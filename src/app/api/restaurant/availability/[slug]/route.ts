import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/db/prisma";
import { findAllAvailableTables } from "@/app/services/restaurant/TablesService";

export async function GET(req: NextRequest) {
  const slug = req.url.substring(
    req.url.lastIndexOf("/") + 1,
    req.url.indexOf("?")
  ) as string;
  const { day, time, partySize } = Object.fromEntries(req.nextUrl.searchParams);

  if (!day || !time || !partySize) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  let searchTimesWithTables;
  try {
    searchTimesWithTables = await findAllAvailableTables({ time, day, restaurant });
  } catch (e) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  if(!searchTimesWithTables) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }
  
  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum: number, table: { seats: number; }) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumSeats >= Number(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant?.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant?.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return NextResponse.json(availabilities);
}
