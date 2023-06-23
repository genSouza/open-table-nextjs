import React from "react";

const AuthModalInputs = () => {
  return (
    <div>
      <div className="flex justify-between my-3 text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="First name"
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Last name"
        />
      </div>
      <div className="flex justify-between my-3 text-sm">
        <input
          type="text"
          className="w-full p-2 py-3 border rounded"
          placeholder="Email"
        />
      </div>
      <div className="flex justify-between my-3 text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Phone"
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="City"
        />
      </div>
      <div className="flex justify-between my-3 text-sm">
        <input
          type="password"
          className="w-full p-2 py-3 border rounded"
          placeholder="password"
        />
      </div>
    </div>
  );
};

export default AuthModalInputs;
