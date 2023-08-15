"use client";
import { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleChangeDate = (date: Date | null) => {
    setSelectedDate(date);
  };

  const filterTimeByRestaurantWindow = () => {
    const timesInWindow: typeof times = [];
    let isWithinInWindow = false;
    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinInWindow = true;
      }
      if (isWithinInWindow) {
        timesInWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinInWindow = false;
      }
    });
    return timesInWindow;
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 font-light border-b" id="">
          {partySize.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="py-3 font-light border-b text-reg w-28"
            dateFormat={"MMMM d"}
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 font-light border-b">
            {filterTimeByRestaurantWindow().map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
