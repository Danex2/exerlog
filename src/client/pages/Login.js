import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const [error, setError] = React.useState(null);
  const history = useHistory();

  const onSubmit = (data) => {
    const { username, password } = data;
    axios
      .post(
        "http://localhost:3000/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(() => history.push("/exercises"))
      .catch((error) => setError(error.response.data.message));
  };
  return (
    <form
      className="flex flex-col p-20 w-full md:w-2/3 lg:w-2/5 m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <p className="text-center mb-3 text-red-800 w-full bg-red-400 p-3 rounded border-2 border-red-900 ">
          {error}
        </p>
      )}
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
        ref={register}
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
        ref={register}
      />
      <button className="bg-red-500 rounded py-2 shadow-md text-white font-bold hover:bg-red-700 transition duration-150">
        Login
      </button>
    </form>
  );
};

export default Login;
