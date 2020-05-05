import React from "react";

const Register = () => (
  <form className="flex flex-col p-20 w-full md:w-2/3 lg:w-2/5 m-auto">
    <h1 className="text-center text-3xl font-bold mb-3 text-red-500">
      Exerlog
    </h1>
    <label htmlFor="Username" className="text-red-500">
      Username
    </label>
    <input
      type="text"
      name="username"
      className="p-2 rounded border-2 border-red-500 mb-3"
      required
      placeholder="username"
    />
    <label htmlFor="Username" className="text-red-500">
      Password
    </label>
    <input
      type="password"
      name="password"
      className="p-2 rounded border-2 border-red-500 mb-3"
      required
      placeholder="password"
    />
    <button className="bg-red-500 rounded py-2 shadow-md text-white font-bold hover:bg-red-700 transition duration-150">
      Register
    </button>
  </form>
);

export default Register;
