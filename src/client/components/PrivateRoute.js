import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
    setAuth(false);
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
