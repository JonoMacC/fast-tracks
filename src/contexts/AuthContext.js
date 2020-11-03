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
    setAuth({
      loading: false,
      data: JSON.parse(window.localStorage.getItem("authData")),
    });
  }, []);

  // when authorization data changes, update the local storage
  useEffect(() => {
    window.localStorage.setItem("authData", JSON.stringify(auth.data));
  }, [auth.data]);

  return (
    <AuthContext.Provider value={[auth, setAuthData]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
