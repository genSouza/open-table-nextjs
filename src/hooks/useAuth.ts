import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useContext } from "react";

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signIn = async ({
    email,
    password,
    handleClose,
  }: {
    email: string;
    password: string;
    handleClose?: () => void;
  }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        { email, password }
      );
      console.log(response);
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose && handleClose();
    } catch (error: any) {
      console.error(error);
      setAuthState({
        data: null,
        error: error.response.data
          ? error.response.data.message.errors.join(", ")
          : error.response.message,
        loading: false,
      });
    }
  };
  const signOut = async () => {};

  return { signIn, signOut };
};

export default useAuth;
