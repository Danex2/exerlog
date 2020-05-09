import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [error, setError] = React.useState(null);
  const history = useHistory();

  const onSubmit = (data) => {
    const { username, password } = data;
    axios
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        dispatch(login());
        localStorage.setItem("token", res.data.token);
      })
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
