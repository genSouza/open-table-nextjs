import RestaurantNavbar from "./components/RestaurantNavbar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import { Description } from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";

interface Restaurant {
  id: string;
  name: string;
  images: string[];
  description: string;
  slug: string;
}

const prisma = new PrismaClient();
const fetchRestaurantBySlug = async (slug: string): Restaurant => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    // include: {
    //   cuisine: true,
    //   location: true,
    // },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};
const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log(restaurant);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetails;
