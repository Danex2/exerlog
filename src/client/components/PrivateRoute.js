import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.authed);
  return auth ? <Component {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
