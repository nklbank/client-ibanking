import React, { useReducer } from "react";
import axios from "axios";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import setAuthToken from "../../utils/setAuthToken";
import { ERROR, GET_LIST_EMPLOYEES } from "../types";

const AdminState = (props) => {
  const initialState = {
    loading: null,
    error: null,
    success: null,
    token: localStorage.getItem("token"),
    listEmployees: [],
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  const getListEmployees = async () => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.get("/api/admin/personnel");
      dispatch({
        type: GET_LIST_EMPLOYEES,
        payload: res.data,
      });
      console.log("list employee", state.listEmployees);
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response,
      });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        listEmployees: state.listEmployees,
        getListEmployees,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
