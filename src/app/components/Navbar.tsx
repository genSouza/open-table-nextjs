import Link from "next/link";
import React from "react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-2 bg-white">
      <Link href="" className="text-2xl font-bold text-gray-700">
        OpenTable{" "}
      </Link>
      <div>
        <div className="flex">
          <AuthModal isSignIn={true} />
          <AuthModal isSignIn={false} />
          {/* <button className="p-1 px-4 border rounded">Sign up</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
