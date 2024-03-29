import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { deleteCookie, getCookie, removeCookies } from "cookies-next";
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
  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    phone,
    city,
    handleClose,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    handleClose?: () => void;
  }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { email, password, firstName, lastName, phone, city }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose && handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data
          ? error.response.data.message.errors.join(", ")
          : error.response.message,
        loading: false,
      });
    }
  };

  const signOut = async () => {
    deleteCookie("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signIn, signUp, signOut };
};

export default useAuth;
