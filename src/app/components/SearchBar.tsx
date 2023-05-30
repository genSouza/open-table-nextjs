"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
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
  );
};

export default SearchBar;
