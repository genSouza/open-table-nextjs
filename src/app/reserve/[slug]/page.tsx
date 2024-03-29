import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import { prisma } from "@/app/db/prisma";
import { notFound } from "next/navigation";

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    notFound();
  }

  return restaurant;
};
const Reserve = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <div className="h-screen border-t">
      <div className="w-3/5 m-auto py-9">
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <Form slug={params.slug} date={searchParams.date} partySize={searchParams.partySize} />
      </div>
    </div>
  );
};

export default Reserve;
