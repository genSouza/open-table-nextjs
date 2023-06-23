"use client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AuthModalInputs from "./AuthModalInputs";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          <div className="p-2 h-[35.7rem]">
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
              <AuthModalInputs />
              <button className="w-full p-3 mb-5 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400">
                {isSignIn ? "Sign in" : "Create an account"}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
