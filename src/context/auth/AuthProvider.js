import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { authTypes } from "../../types/auth";
import { AuthContext, authReducer } from "./";

export const Auth_INITIAL_STATE = {
  token: "",
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

  useEffect(() => {
    const authToken = localStorage.getItem("token") ?? "";
    getTokenStorage(authToken);
  }, []);

  const getTokenStorage = (token) => {
    dispatch({
      type: authTypes.tokenStorage,
      payload: token,
    });
  };

  const authenticateUser = async (params) => {
    const { data } = await axios.post(
      "https://economysa-motor-back-dev-m6zmiutpfa-ue.a.run.app/oauth/token",
      params,
      {
        headers: {
          'Authorization': "Basic " + btoa(process.env.REACT_APP_USER_TOKEN + ":" + process.env.REACT_APP_PASS_TOKEN)
        }
      }
    );

    localStorage.setItem("token", data.access_token);
    dispatch({
      type: authTypes.authenticateUser,
      payload: data.access_token,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("token");

    dispatch({
      type: authTypes.logoutUser,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authenticateUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
