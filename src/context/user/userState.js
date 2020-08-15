import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  GET_ACCOUNT,
  ACCOUNTOWNERS_ERROR,
  GET_BENEFICIARIES,
  BENEFICIARIES_ERROR,
  ADD_BENEFICIARY,
  BENEFICIARY_ERROR,
  UPDATE_BENEFICIARIES,
  UPDATE_BENEFICIARIES_ERROR,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  GET_BENEFICIARY,
  USER_ERROR,
  GET_TRANSACTIONS,
  GET_DEBTLIST,
  ADD_DEBT,
  POST_TRANSFERINTRABANK,
  POST_TRANSFERINTERBANK,
  VERIFY_OTP,
  GET_OTP,
  DEL_DEBT,
  UPDATE_DEBT,
  SET_LOADING,
  REFRESH,
  GET_NOTIFS,
  ADD_NOTIFS,
  READ_NOTIF
  // BENEFICIARY_ERROR,
} from "../types";
import { Col } from "antd";

const UserState = (props) => {
  const initialState = {
    loading: null,
    accountsOwner: [],
    beneficiaries: [],
    error: null,
    success: null,
    beneficiary: {},
    addBeneficiaryRes: null,
    getTransactions: null,
    token: localStorage.getItem("token"),
    debts: {},
    notifs: []
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //get account user

  const getAccounts = async () => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.get("/api/customer/accounts");
      dispatch({
        type: GET_ACCOUNT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  //get list beneficiary

  const getBeneficiries = async () => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.get("/api/customer/beneficiaries");

      dispatch({
        type: GET_BENEFICIARIES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  //add beneficiary

  const addBeneficiary = async (contact) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.post("/api/customer/add-beneficiary", contact);

      dispatch({
        type: ADD_BENEFICIARY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  //update list beneficiary

  const updateListBeneficiaryInfo = async (listInfo) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.post(
        "/api/customer/update-beneficiary/",
        listInfo
      );

      dispatch({
        type: UPDATE_BENEFICIARIES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  //change password

  const changePassword = async (passwords) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.put(
        "/api/customer/passwords/ibanking",
        passwords
      );

      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  // get beneficiary account

  const getBeneficiry = async (accnumber) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);

    try {
      const res = await axios.post("/api/account/", accnumber);

      dispatch({
        type: GET_BENEFICIARY,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BENEFICIARY_ERROR,
        payload: err.response,
      });
    }
  };
  //   function getTransactions(account_number) {
  //     const requestOptions = {
  //         method: 'GET',
  //         headers: { ...authHeader(), 'Content-Type': 'application/json' },
  //         // : JSON.stringify(account_number)
  //         params: JSON.stringify(account_number),

  //     };
  //     return fetch(config.apiUrl + '/api/customer/transactions/normal?account_number=' +account_number, requestOptions).then(handleResponse, handleError);
  // }

  const getTransactions = async (accountNumber) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get(
        "/api/customer/transactions/normal?account_number=" + accountNumber
      );
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };
  const getDebts = async () => {
    // setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get("/api/customer/debts");
      console.log("res.data", res.data);
      dispatch({
        type: GET_DEBTLIST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };
  const transferIntraBank = async (transferInfor) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post(
        "/api/customer/intrabank-transfer-money",
        transferInfor
      );
      dispatch({
        type: POST_TRANSFERINTRABANK,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };
  const transferInterBank = async (transferInfor) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post(
        "/api/customer/interbank-transfer-money",
        transferInfor
      );
      dispatch({
        type: POST_TRANSFERINTERBANK,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };
  const addDebt = async (debt) => {
    // setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post("/api/customer/debts", debt);
      console.log('res.data :>> ', res.data);
      const { timestamp } = res.data
      const  _timestamp = new Date(timestamp)
      const mins = _timestamp.getMinutes() < 10 ? `0${_timestamp.getMinutes()}` : _timestamp.getMinutes()
      const timestring = `${_timestamp.getDate()}/${_timestamp.getMonth() + 1}/${_timestamp.getFullYear()} ${_timestamp.getHours()}:${mins}`
      console.log('timestring :>> ', timestring);
      const newDebt = {
        ...debt,
        id: res.data.insertId,
        paid: 0,
        visibleToPayer: 1,
        timestamp
      };
      console.log("newDebt", newDebt);
      dispatch({
        type: ADD_DEBT,
        payload: newDebt,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };
  const verifyOTP = async (otp) => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post("/api/auth/otp", otp);
      console.log('res.data :>> ', res.data);
      dispatch({
        type: VERIFY_OTP,
        payload: res.data,
      });
    } catch (err) {
      console.log('err.response :>> ', err.response);
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  const getAccountInfo = async (account) => {
    // setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post(
        "/api/account", account
      );
      console.log('res.data', res.data)
      return res.data
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };
  const getOTP = async () => {
    setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get("/api/auth/otp");
      dispatch({
        type: GET_OTP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  const delDebt = async (id) => {
    // setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.delete("/api/customer/debts", { data: { id } });
      dispatch({
        type: DEL_DEBT,
        payload: id,
      });
      return res.data
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  const updateDebt = async (debt) => {
    // setLoading();
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post(
        "/api/customer/update-debts", debt
      );
      console.log('updatedDebt', debt)
      dispatch({
        type: UPDATE_DEBT,
        payload: debt,
      });
      return res.data
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  };

  const getCustomerInfo = async () => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get(
        "/api/customer");
      console.log('res.data', res.data)
      return res.data;
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  }
  const setLoading = () => dispatch({ type: SET_LOADING });

  const refresh = () => dispatch({ type: REFRESH });

  const getNotifs = async (username) => {
    try {
      const res = await axios.get(`/api/notifs/${username}`);
      console.log('res', res)
      dispatch({
        type: GET_NOTIFS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response,
      });
    }
  }

  // update state.notifs
  const addNotif = (notif) => dispatch({
    type: ADD_NOTIFS,
    payload: notif,
  });

  // update database.notifs
  const postNotif = async (notif) => {
    try {
      const ret = await axios.post(`/api/notifs`, notif);
      return ret.data
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response,
      });
    }

  }

  const readNotif = async (id) => {
    try {
      await axios.post(`/api/notifs/update`, { id: id })
      dispatch({ type: READ_NOTIF })
    } catch (error) {

    }
  }


  return (
    <UserContext.Provider
      value={{
        accountsOwner: state.accountsOwner,
        beneficiaries: state.beneficiaries,
        addBeneficiaryRes: state.addBeneficiaryRes,
        beneficiary: state.beneficiary,
        transactions: state.transactions,
        debts: state.debts,
        notifs: state.notifs,
        success: state.success,
        error: state.error,
        loading: state.loading,
        getAccounts,
        getBeneficiries,
        updateListBeneficiaryInfo,
        addBeneficiary,
        changePassword,
        getBeneficiry,
        getTransactions,
        getDebts,
        addDebt,
        delDebt,
        updateDebt,
        transferIntraBank,
        transferInterBank,
        getOTP,
        verifyOTP,
        getAccountInfo,
        getCustomerInfo,
        refresh,
        getNotifs,
        addNotif,
        postNotif,
        readNotif
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
