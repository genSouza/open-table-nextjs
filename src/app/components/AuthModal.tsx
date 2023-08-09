"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState, useContext } from "react";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { error, loading, data } = useContext(AuthenticationContext);

  const { signIn, signUp } = useAuth();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs, isSignIn]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    console.log(isSignIn);
    if (isSignIn) {
      signIn({ email: inputs.email, password: inputs.password, handleClose });
    } else {
      signUp({
        email: inputs.email,
        password: inputs.password,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        phone: inputs.phone,
        city: inputs.city,
        handleClose,
      });
    }
  };
  const signInStyle = "p-1 px-4 mr-3 text-white bg-blue-400 border rounded";
  const signOutStyle = "p-1 px-4 border rounded";

  return (
    <div>
      <button
        className={isSignIn ? signInStyle : signOutStyle}
        onClick={handleOpen}
      >
        {isSignIn ? "Sign in" : "Sign up"}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[35.7rem] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[35.7rem]">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}
              <div className="pb-2 mb-2 font-bold text-center uppercase border-b">
                <p className="text-sm">
                  {isSignIn ? "Sign in" : "Create an account"}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {isSignIn
                    ? "Log into your account"
                    : "Create your OpenTable account"}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className="w-full p-3 mb-5 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400"
                  onClick={handleClick}
                  disabled={disabled}
                >
                  {isSignIn ? "Sign in" : "Create an account"}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
