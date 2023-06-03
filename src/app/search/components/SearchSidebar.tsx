import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

const prices = [
  {
    id: 1,
    price: PRICE.CHEAP,
    className: "w-full p-2 font-light border rounded-l text-reg text-center",
    label: "$",
  },
  {
    id: 2,
    price: PRICE.REGULAR,
    className:
      "w-full p-2 font-light border-t border-b border-r text-reg text-center",
    label: "$$",
  },
  {
    id: 3,
    price: PRICE.EXPENSIVE,
    className:
      "w-full p-2 font-light border-t border-b border-r rounded-r text-reg text-center",
    label: "$$$",
  },
];
const SearchSidebar = ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  return (
    <div className="w-1/5">
      <div className="flex flex-col pb-4 border-b">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, city: location.name },
            }}
            key={location.id}
            className="font-light capitalize text-reg"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col pb-4 border-b">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, cuisine: cuisine.name },
            }}
            className="font-light capitalize text-reg"
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="pb-4 mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) => (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, price: price.price },
              }}
              className={price.className}
              key={price.id}
            >
              {price.label}
            </Link>
          ))}
          {/* <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
            className="w-full p-2 font-light border rounded-l text-reg"
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
            className="w-full p-2 font-light border-t border-b border-r text-reg"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.EXPENSIVE },
            }}
            className="w-full p-2 font-light border-t border-b border-r rounded-r text-reg"
          >
            $$$
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
