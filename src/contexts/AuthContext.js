import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext([{}, () => {}]);

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({ loading: true, data: null });

  const setAuthData = (data) => {
    setAuth((state) => ({
      ...state,
      data: data,
    }));
  };

  // on component mount, set the authorization data to
  // what is found in local storage
  useEffect(() => {
    console.log("mounting...", auth.data);
    console.log(
      "mounting...",
      JSON.parse(window.localStorage.getItem("authData"))
    );
    setAuth({
      loading: false,
      data: JSON.parse(window.localStorage.getItem("authData")),
    });
  }, []);

  // when authorization data changes, update the local storage
  useEffect(() => {
    console.log("updating...", auth.data);
    window.localStorage.setItem("authData", JSON.stringify(auth.data));
    console.log(
      "updating...",
      JSON.parse(window.localStorage.getItem("authData"))
    );
  }, [auth.data]);

  return (
    <AuthContext.Provider value={[auth, setAuthData]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
