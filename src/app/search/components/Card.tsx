import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className="flex pb-5 border-b">
      <Image
        src="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
        alt=""
        className="rounded w-44"
        width={200}
        height={200}
      />
      <div className="pl-5">
        <h2 className="text-3xl">Aiāna Restaurant Collective</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">Awesome</p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
            <p className="mr-4">$$$</p>
            <p className="mr-4">Mexican</p>
            <p className="mr-4">Ottawa</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href="/restaurant/milestones-stones">
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
