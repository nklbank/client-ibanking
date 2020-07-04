import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  PERSONNEL_LOGIN_SUCCESS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("login", action);
      localStorage.setItem("token", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      // localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      {
        console.log("logout")
        // localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload,
        };
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
