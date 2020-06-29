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
  POST_TRANSFERINTRABANK,
  POST_TRANSFERINTERBANK,
  VERIFY_OTP,
  GET_OTP

  // BENEFICIARY_ERROR,
} from "../types";

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
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //get account user

  const getAccounts = async () => {
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
        type: GET_TRANSACTIONS,
        payload: err.response,
      });
    }
  };

  const transferIntraBank = async (transferInfor) => {
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
  }

  const transferInterBank = async (transferInfor) => {
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
  }

  const verifyOTP = async (otp) => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.post(
        "/api/auth/otp",
        otp
      );
      dispatch({
        type: VERIFY_OTP,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response,
      });
    }
  }

  const getOTP = async () => {
    setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
    try {
      const res = await axios.get(
        "/api/auth/otp"
      );
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
  }
  return (
    <UserContext.Provider
      value={{
        accountsOwner: state.accountsOwner,
        beneficiaries: state.beneficiaries,
        addBeneficiaryRes: state.addBeneficiaryRes,
        beneficiary: state.beneficiary,
        transactions: state.transactions,
        success: state.success,
        error: state.error,
        getAccounts,
        getBeneficiries,
        updateListBeneficiaryInfo,
        addBeneficiary,
        changePassword,
        getBeneficiry,
        getTransactions,
        transferIntraBank,
        transferInterBank,
        getOTP,
        verifyOTP
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
