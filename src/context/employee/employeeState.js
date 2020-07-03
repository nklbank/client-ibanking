
import React, { useReducer } from 'react'
import axios from 'axios';
import EmployeeContext from './employeeContext'
import employeeReducer from './employeeReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
    ADD_MONEY,
    ADDMONEY_ERROR,
    CREATE_CUSTOMERACCOUNT,
    CREATECUSTOMERACCOUNT_ERROR,
    GET_DEPOSITHISTORY,
    GETDEPOSITHISTORY_ERROR,
    GET_TRANSFERHISTORY,
    GETTRANSFERTHISTORY_ERROR,
    GET_DEBTHISTORY,
    GETDEBTHISTORY_ERROR,
    SET_LOADING
} from '../types'

const EmployeeState = props => {
    const initialState = {
        loading: false,
        error: null,
        success: null,
        customerAccount: null,
        depositList: null,
        transferList: null,
        debtList: null,
        token: localStorage.getItem('token')
    }

    const [state, dispatch] = useReducer(employeeReducer, initialState)


    const addMoney = async (transferInfor) => {
        setLoading();
        setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
        try {
            const res = await axios.post(
                "/api/employee/intrabank-deposit",
                transferInfor
            );
            dispatch({
                type: ADD_MONEY,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ADDMONEY_ERROR,
                payload: err.response,
            });
        }
    };

    const createCustomerAccount = async (customerInfor) => {
        setLoading();
        setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
        try {
            const res = await axios.post(
                "/api/employee/add-customer",
                customerInfor
            );
            dispatch({
                type: CREATE_CUSTOMERACCOUNT,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: CREATECUSTOMERACCOUNT_ERROR,
                payload: err.response,
            });
        }
    };


    const depositHistory = async (account) => {
        setLoading();
        setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
        try {
            const res = await axios.get(
                `/api/employee/history-deposit/${account}`
            );
            dispatch({
                type: GET_DEPOSITHISTORY,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: GETDEPOSITHISTORY_ERROR,
                payload: err.response,
            });
        }
    };


    const transferHistory = async (account) => {
        setLoading();
        setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
        try {
            const res = await axios.get(
                `/api/employee/history-transfer/${account}`
            );
            dispatch({
                type: GET_TRANSFERHISTORY,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: GETTRANSFERTHISTORY_ERROR,
                payload: err.response,
            });
        }
    };


    const debtHistory = async (account) => {
        setLoading();
        setAuthToken(JSON.parse(localStorage.getItem("token"))["accessToken"]);
        try {
            const res = await axios.get(
                `/api/employee/history-paydebt/${account}`
            );
            dispatch({
                type: GET_DEBTHISTORY,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: GETDEBTHISTORY_ERROR,
                payload: err.response,
            });
        }
    };

    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <EmployeeContext.Provider
            value={{
                loading: state.loading,
                error: state.error,
                success: state.success,
                customerAccount: state.customerAccount,
                depositList: state.depositList,
                transferList: state.transferList,
                debtList: state.debtList,
                addMoney,
                createCustomerAccount,
                depositHistory,
                transferHistory,
                debtHistory
            }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeState