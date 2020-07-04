import React, { useReducer } from "react";
import axios from "axios";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  UPDATE_PERSONNEL,
  DELETE_PERSONNEL,
  ERROR,
  GET_LIST_EMPLOYEES,
  LOADING,
  ADD_PERSONNEL,
} from "../types";

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
      dispatch({
        type: LOADING,
      });
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

  const addEmployee = async (person) => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      dispatch({
        type: LOADING,
      });
      const res = await axios.post(`api/admin/personnel`, person);
      dispatch({ type: ADD_PERSONNEL, payload: res });
    } catch (err) {
      console.log("ADD ERR", err.response);
      dispatch({
        type: ERROR,
        payload: err.response,
      });
    }
  };

  const deleteEmployee = async (id) => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      dispatch({
        type: LOADING,
      });
      const res = await axios.delete(`api/admin/personnel/${id}`);
      dispatch({ type: DELETE_PERSONNEL, payload: res });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response,
      });
    }
  };

  const updateEmployee = async (person) => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      dispatch({
        type: LOADING,
      });
      const res = await axios.put(`api/admin/personnel/${person.id}`, person);
      dispatch({ type: UPDATE_PERSONNEL, payload: res });
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
        loading: state.loading,
        error: state.error,
        getListEmployees,
        deleteEmployee,
        updateEmployee,
        addEmployee,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
