import React from "react";
import { IAuthModalInput } from "../models/interfaces/IAuthModalInput";

const AuthModalInputs = ({
  inputs,
  handleChangeInput,
  isSignIn,
}: IAuthModalInput) => {
  return (
    <div>
      {!isSignIn && (
        <div className="flex justify-between my-3 text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First name"
            value={inputs.firstName}
            name="firstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last name"
            value={inputs.lastName}
            name="lastName"
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          type="text"
          className="w-full p-2 py-3 border rounded"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChangeInput}
        />
      </div>
      {!isSignIn && (
        <div className="flex justify-between my-3 text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            name="phone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            name="city"
            onChange={handleChangeInput}
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          type="password"
          className="w-full p-2 py-3 border rounded"
          placeholder="password"
          value={inputs.password}
          name="password"
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
};

export default AuthModalInputs;
