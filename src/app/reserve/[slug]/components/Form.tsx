"use client";
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Form = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);

  const { error, loading, CreateReservation } = useReservation();

  useEffect(() => {
    if (
      inputs.bookerEmail &&
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const [day, time] = date.split("T");
    const booking = await CreateReservation({
      slug,
      day,
      time,
      partySize,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setSuccess: setSuccess,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {success ? (
        <div>
          <h1>Your are all booked up!</h1>
          <p>Enjoy your reservation.</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="First name"
            name="bookerFirstName"
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Last name"
            name="bookerLastName"
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Phone number"
            name="bookerPhone"
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Email"
            name="bookerEmail"
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            onChange={handleChangeInput}
            value={inputs.bookerOccasion}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Requests (optional)"
            name="bookerRequest"
            onChange={handleChangeInput}
            value={inputs.bookerRequest}
          />
          <button
            className="w-full p-3 font-bold text-white bg-red-600 rounded disabled:bg-gray-300"
            onClick={handleSubmit}
            disabled={disabled || loading}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
