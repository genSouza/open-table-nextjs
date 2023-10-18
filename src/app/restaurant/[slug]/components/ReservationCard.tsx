"use client";
import { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";
import useAvailabilities from "@/hooks/useAvailability";
import { CircularProgress, Link } from "@mui/material";
import { Times, convertToDisplayTime } from "@/utils/ConvertToDisplayTime";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(openTime);
  const [selectedPartySize, setSelectedPartySize] = useState<string>("1");
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const day = date.toISOString().split("T")[0];
      setSelectedDay(day);
    }
    setSelectedDate(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPartySize(e.target.value);
  };

  const handleButtonClick = () => {
    fetchAvailabilities({
      slug: slug,
      day: selectedDay,
      time: selectedTime,
      partySize: selectedPartySize,
    });
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
        <select
          name=""
          className="py-3 font-light border-b"
          id=""
          value={selectedPartySize}
          onChange={handlePartySizeChange}
        >
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
          <select
            name=""
            id=""
            className="py-3 font-light border-b"
            value={selectedTime}
            onChange={handleTimeChange}
          >
            {filterTimeByRestaurantWindow().map((time) => (
              <option key={time.time} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="mb-4 font-bold text-center text-reg">Select a Time</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}/?date=${selectedDay}T${time.time}&partySize=${selectedPartySize}`}
                  key={time.time}
                  className="w-24 p-2 text-center bg-red-600 rounded cursor-pointer  margin-bottom: 0.75rem; margin-right: 0.75rem;"
                  underline="none"
                >
                  <p className="text-sm font-bold text-white">
                    {convertToDisplayTime(time.time as Times)}
                  </p>
                </Link>
              ) : (
                <p className="w-24 p-2 mb-3 mr-3 bg-gray-300 rounded"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
