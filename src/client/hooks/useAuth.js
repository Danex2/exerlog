import React from "react";

export const useAuth = () => {
  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    let token = window.localStorage.hasOwnProperty("token");
    if (token) {
      setAuth(true);
    }
  }, [auth]);
  return {
    auth,
  };
};
