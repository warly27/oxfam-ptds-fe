import React, { createContext, useEffect, useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  console.log(
    "[decodedToken.exp > currentTime]",
    decodedToken.exp > currentTime
  );

  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext(null);

export function useAuthContext() {
  const state = useContext(AuthContext);

  if (!state) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return state;
}

export const AuthProvider = ({ children }) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const isLoggedIn = window.localStorage.getItem("isLoggedIn") === "true";
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [isInitialised, setIsInitialised] = useState(false);
  const [user, setUser] = useState(null);
  const [method, setMethod] = useState("JWT");

  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });

    console.log(response.data);
    const { accessToken, user } = response.data;

    setUser(user);
    setSession(accessToken);

    window.localStorage.setItem("isLoggedIn", "true");

    if (isValidToken(accessToken)) {
      setIsAuthenticated(true);
    }
  };

  const register = async (email, user_name, password, role) => {
    const response = await axios.post(`${BASE_URL}/auth/registration`, {
      email,
      user_name,
      password,
      role,
    });

    console.log("[response]: ", response);
  };

  const adminCreateUser = async (email, user_name, password, role) => {
    const response = await axios.post(`${BASE_URL}/admin/user/create`, {
      email,
      user_name,
      password,
      role,
    });

    const { id } = response.data;

    console.log("id", id);

    return response;
  };

  const logout = () => {
    setSession(null);
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("accessToken");

    setUser(null);
    setIsAuthenticated(false);

    navigate("/logout");
  };

  useEffect(() => {
    (async () => {
      try {
        if (!isValidToken(accessToken) || !accessToken) {
          setIsAuthenticated(false);
        }

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          setIsAuthenticated(true);
          const response = await axios.get(`${BASE_URL}/users/profile`);

          console.log("[response?.data?.data]", response?.data?.data);

          setUser(response?.data?.data);
        }
      } catch (err) {
        console.log("[err] :", err);
        console.error(err);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialised,
        user,
        method,
        login,
        logout,
        register,
        adminCreateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
