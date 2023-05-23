import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React from "react";

const Reserve = () => {
  return (
    <main className="w-screen min-h-screen bg-gray-100">
      <main className="m-auto bg-white max-w-screen-2xl">
        <Navbar />
        <div className="h-screen border-t">
          <div className="w-3/5 m-auto py-9">
            {/* HEADER */}
            <div>
              <h3 className="font-bold">You&apos;re almost done!</h3>
              <div className="flex mt-5">
                <Image
                  src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
                  alt=""
                  className="w-32 rounded h-18"
                  width={128}
                  height={72}
                />
                <div className="ml-4">
                  <h1 className="text-3xl font-bold">
                    Aiāna Restaurant Collective
                  </h1>
                  <div className="flex mt-3">
                    <p className="mr-6">Tues, 22, 2023</p>
                    <p className="mr-6">7:30 PM</p>
                    <p className="mr-6">3 people</p>
                  </div>
                </div>
              </div>
            </div>
            {/* HEADER */} {/* FORM */}
            <div className="mt-10 flex flex-wrap justify-between w-[660px]">
              <input
                type="text"
                className="p-3 mb-4 border rounded w-80"
                placeholder="First name"
              />
              <input
                type="text"
                className="p-3 mb-4 border rounded w-80"
                placeholder="Last name"
              />
              <input
                type="text"
                className="p-3 mb-4 border rounded w-80"
                placeholder="Phone number"
              />
              <input
                type="text"
                className="p-3 mb-4 border rounded w-80"
                placeholder="Email"
              />
              <input
                type="text"
                className="p-3 mb-4 border rounded w-80"
                placeholder="Occasion (optional)"
              />
              <input
                type="text"
                className="p-3 mb-4 border rounded w-80"
                placeholder="Requests (optional)"
              />
              <button className="w-full p-3 font-bold text-white bg-red-600 rounded disabled:bg-gray-300">
                Complete reservation
              </button>
              <p className="mt-4 text-sm">
                By clicking “Complete reservation” you agree to the OpenTable
                Terms of Use and Privacy Policy. Standard text message rates may
                apply. You may opt out of receiving text messages at any time.
              </p>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export default Reserve;
