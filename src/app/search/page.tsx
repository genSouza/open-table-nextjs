import React from "react";
import Navbar from "../components/Navbar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";

const Search = () => {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="m-auto bg-white max-w-screen-2xl">
        <Navbar />
        <Header />
        <div className="flex items-start justify-between w-2/3 py-4 m-auto">
          <Sidebar />
          <div className="w-5/6">
            <Card />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Search;
