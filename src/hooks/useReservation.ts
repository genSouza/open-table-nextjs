import { useState } from "react";
import axios from "axios";

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CreateReservation = async ({
    slug,
    day,
    time,
    partySize,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
    setSuccess,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerOccasion: string;
    bookerRequest: string;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/reserve/${slug}`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response.data
          ? error.response.data.message.errors.join(", ")
          : error.response.message
      );
    }
  };

  return { loading, error, CreateReservation };
};

export default useReservation;
