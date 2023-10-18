import { prisma } from "@/app/db/prisma";
import { findAllAvailableTables } from "@/app/services/restaurant/TablesService";
import { NextRequest, NextResponse } from "next/server";
import ExtractSlugFromURL from "@/utils/ExtractSlugFromURL";

export async function POST(req: NextRequest) {
  const pathName = req.nextUrl.pathname;
  const slug = ExtractSlugFromURL(pathName);
  const res = await req.json();

  if (!slug) {
    return NextResponse.json(
      { message: { errors: ["invalid data provided"] } },
      { status: 400 }
    );
  }

  const { day, time, partySize } = Object.fromEntries(req.nextUrl.searchParams);
  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  } = res;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
      id: true,
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

  const searchTimeWithTables = searchTimesWithTables.find((t) => {
    return t.date.toISOString() == new Date(`${day}T${time}`).toISOString();
  });

  if (!searchTimeWithTables) {
    return NextResponse.json(
      { message: { errors: ["No availability, cannot book"] } },
      { status: 400 }
    );
  }

  const tablesCount: {
    2: string[];
    4: string[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables.tables.forEach((t: { id: string; seats: number }) => {
    if (t.seats == 2) {
      tablesCount[2].push(t.id);
    } else {
      tablesCount[4].push(t.id);
    }
  });

  const tablesToBook: string[] = [];
  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBook.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining -= 4;
      } else {
        if (tablesCount[2].length) {
          tablesToBook.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining -= 2;
        }
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBook.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining -= 2;
      } else {
        if (tablesCount[4].length) {
          tablesToBook.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining -= 4;
        }
      }
    }
  }

  let booking: {
    id: any;
    number_of_people?: number;
    booking_time?: Date;
    booker_email?: string;
    booker_phone?: string;
    booker_first_name?: string;
    booker_last_name?: string;
    booker_occasion?: string | null;
    booker_request?: string | null;
    restaurant_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  try {
    booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occasion: bookerOccasion,
        booker_request: bookerRequest,
        restaurant_id: restaurant.id,
      },
    });

    const bookingTablesData = tablesToBook.map((t) => {
      return {
        table_id: t,
        booking_id: booking.id,
      };
    });

    await prisma.bookingOnTables.createMany({
      data: bookingTablesData,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: { errors: ["An error occurred. Try again later"] } },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      booking,
    },
    { status: 200 }
  );
}
