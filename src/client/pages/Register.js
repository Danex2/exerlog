import React from "react";

const Register = () => (
  <form className="flex flex-col p-20 w-1/3">
    <h1 className="text-center text-3xl font-semibold mb-3 text-red-500">
      Exerlog
    </h1>
    <label htmlFor="Username">Username</label>
    <input
      type="text"
      name="username"
      className="p-2 rounded border-2 border-red-500 mb-3"
      required
      placeholder="username"
    />
    <label htmlFor="Username">Password</label>
    <input
      type="password"
      name="password"
      className="p-2 rounded border-2 border-red-500 mb-3"
      required
      placeholder="password"
    />
    <button className="bg-red-500 rounded py-2 shadow-md text-red-900 font-bold">
      Register
    </button>
  </form>
);

export default Register;
