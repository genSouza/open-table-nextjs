import { NextRequest, NextResponse } from "next/server";
import { times } from "@data/times";
import { PrismaClient } from "@prisma/client";
import { avatarClasses } from "@mui/material";

const prismaClient = new PrismaClient();

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
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  const bookings = await prismaClient.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: string]: true } } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const restaurants = await prismaClient.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurants) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  const tables = restaurants.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => {
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
        new Date(`${day}T${restaurants.open_time}`);
      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurants.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  return NextResponse.json(availabilities);
}
