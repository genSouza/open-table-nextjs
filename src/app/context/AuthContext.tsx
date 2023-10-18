"use client";
import React, { useState, createContext, useEffect } from "react";
import { IAuthState, IState } from "../models/interfaces/IAuthState";
import axios from "axios";
import { getCookie } from "cookies-next";
import useAuth from "@/hooks/useAuth";

export const AuthenticationContext = createContext<IAuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = React.useState<IState>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const jwt = getCookie("jwt");
      if (!jwt) {
        setAuthState({
          data: null,
          error: null,
          loading: false,
        });
      } else {
        const response = await axios.get(
          "http://localhost:3000/api/auth/user",
          {
            headers: { Authorization: `Bearer ${jwt}` },
          }
        );

        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        setAuthState({
          data: response.data,
          error: null,
          loading: false,
        });
      }
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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
