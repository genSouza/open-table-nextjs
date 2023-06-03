import Price from "@/app/components/Price";
import { Cuisine, PRICE, Location, Restaurant } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface RestaurantProps {
  id: string;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
}

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantProps }) => {
  return (
    <div className="flex pb-5 ml-5 border-b">
      <Image
        src={restaurant.main_image}
        alt=""
        className="rounded w-44 h-36"
        width={200}
        height={200}
      />
      <div className="pl-5">
        <h2 className="text-3xl capitalize">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
