import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();

  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  console.log(restaurants);

  return (
    <main>
      <Header />
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        <RestaurantCard />
      </div>
    </main>
  );
}
