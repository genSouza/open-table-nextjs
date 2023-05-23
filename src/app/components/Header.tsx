"use client";


import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
      <div className="mt-10 text-center">
        <h1 className="mb-2 text-5xl font-bold text-white">
          Find your table for any occasion
        </h1>
        {/* SEARCH BAR */}
        <div className="flex justify-center py-3 m-auto text-lg text-left">
          <input
            className="rounded  mr-3 p-2 w-[450px]"
            type="text"
            placeholder="State, city or town"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="py-2 text-white bg-red-600 rounded px-9"
            onClick={() => {
              if (location === "") return;
              router.push(`/search/${location}`);
            }}
          >
            Let&apos;s go
          </button>
        </div>
        {/* SEARCH BAR */}
      </div>
    </div>
  );
};

export default Header;
