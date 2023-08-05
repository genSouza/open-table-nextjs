import RestaurantNavbar from "../components/RestaurantNavbar";
import RestaurantMenu from "../components/Menu";
import { Item } from "@prisma/client";
import { prisma } from "../../../db/prisma";

const fetchMenuByRestaurant = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: { items: true },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  return restaurant.items;
};

const Menu = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchMenuByRestaurant(params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar slug={params.slug} />
        <RestaurantMenu menu={menu} />
      </div>
    </>
  );
};

export default Menu;
