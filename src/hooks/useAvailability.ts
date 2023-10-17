import { useState } from "react";
import axios from "axios";

const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{
    time: string;
    available: boolean;
  } [] | null>(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/availability/${slug}`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response.data
          ? error.response.data.message.errors.join(", ")
          : error.response.message
      );
      setData(null);
    }
  };

  return { loading, error, data, fetchAvailabilities };
};

export default useAvailabilities;
