import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { login, logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/authenticate", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login());
        }
      });
  }, [auth, dispatch]);
  return auth ? <Component {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
