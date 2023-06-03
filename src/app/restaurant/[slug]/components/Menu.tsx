import React from "react";
import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

const RestaurantMenu = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="pb-1 mt-4 mb-1">
          <h1 className="text-4xl font-bold">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu.length ? (
            <>
              {menu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </>
          ) : (
            <span className="text-reg">Menu not found</span>
          )}
        </div>
      </div>
    </main>
  );
};

export default RestaurantMenu;
