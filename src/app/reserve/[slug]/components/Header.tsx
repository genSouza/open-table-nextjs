import React from "react";
import Image from "next/image";
import { Times, convertToDisplayTime } from "@/utils/ConvertToDisplayTime";
import { format } from "date-fns";

const Header = ({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) => {
  const [day, time] = date.split("T");
  return (
    <div>
      <h3 className="font-bold">You&apos;re almost done!</h3>
      <div className="flex mt-5">
        <Image
          src={image}
          alt="restaurant main image"
          className="w-32 rounded h-18"
          width={128}
          height={72}
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), "ccc, LLL d")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Times)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
