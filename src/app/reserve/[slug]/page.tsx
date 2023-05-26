import Navbar from "@/app/components/Navbar";

import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";

const Reserve = () => {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="m-auto bg-white max-w-screen-2xl">
        <Navbar />
        <div className="h-screen border-t">
          <div className="w-3/5 m-auto py-9">
            <Header />
            <Form />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Reserve;
