import React from "react";
import axios from "axios";

export const useAuth = () => {
  const [auth, setAuth] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/authenticate", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
        }
      });
  }, [auth]);
  return {
    auth,
  };
};
