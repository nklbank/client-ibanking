
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

export default (state, action) => {
    switch (action.type) {
        case ADD_MONEY:
            return {
                ...state,
                erorr: null,
                success: "add money successfully",
                loading: false
            }
        case ADDMONEY_ERROR:
            return {
                erorr: action.payload,
                success: null,
                loading: false
            }
        case CREATE_CUSTOMERACCOUNT:
            return {
                ...state,
                erorr: null,
                customerAccount: action.payload,
                success: "create account successfully",
                loading: false
            }
        case CREATECUSTOMERACCOUNT_ERROR:
            return {
                erorr: action.payload,
                success: null,
                loading: false
            }

        //------------
        case GET_DEPOSITHISTORY:
            return {
                ...state,
                erorr: null,
                depositList: action.payload,
                success: "get deposit successfully",
                loading: false
            }
        case GETDEPOSITHISTORY_ERROR:
            return {
                erorr: action.payload,
                success: null,
                loading: false
            }
        case GET_TRANSFERHISTORY:
            return {
                ...state,
                erorr: null,
                transferList: action.payload,
                success: "get transfer successfully",
                loading: false
            }
        case GETTRANSFERTHISTORY_ERROR:
            return {
                erorr: action.payload,
                success: null,
                loading: false
            }
        case GET_DEBTHISTORY:
            return {
                ...state,
                erorr: null,
                debtList: action.payload,
                success: "get debt successfully",
                loading: false
            }
        case GETDEBTHISTORY_ERROR:
            return {
                erorr: action.payload,
                success: null,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state
    }
}