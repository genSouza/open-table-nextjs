import React from "react";
import Header from "../components/Header";
import RestaurantNavbar from "../components/RestaurantNavbar";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar />
        <MenuCard />
      </div>

      {/* DESCRIPTION PORTION */}
    </>
  );
};

export default Menu;
