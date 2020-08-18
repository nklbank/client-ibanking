import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: null,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", formData, config);
      getNewAccessToken(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
    // loadUser();
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Load User
  const loadUser = async () => {
    // setAuthToken(localStorage.token.accessToken);
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get("/api/customer/");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const loadPersonnel = async () => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get("/api/admin");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  const personnelLogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth/personnel", formData, config);
      getNewAccessToken();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  const getNewAccessToken = (info, timeDelay = 500000) => {
    let body = {};
    if (!info) {
      body = {
        accessToken: JSON.parse(localStorage.getItem("token"))["accessToken"],
        refreshToken: JSON.parse(localStorage.getItem("token"))["refreshToken"],
      };
    } else body = info;
    setTimeout(async () => {
      try {
        const res = await axios.post("/api/auth/refresh", body);
        console.log("res rf token", res);
        const newToken = {
          ...JSON.parse(localStorage.getItem("token")),
          accessToken: res.data.accessToken,
        };
        localStorage.setItem("token", JSON.stringify(newToken));
        console.log(
          "refresh token successful",
          JSON.parse(localStorage.getItem("token"))
        );
        getNewAccessToken(newToken);
      } catch (error) {
        console.log(error);
      }
    }, timeDelay);
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        // register,
        loadUser,
        login,
        logout,
        personnelLogin,
        loadPersonnel,
        getNewAccessToken,
        // clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
