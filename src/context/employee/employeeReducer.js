
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
                error: null,
                addmoneyInfor: action.payload,
                success: "add money successfully",
                loading: false
            }
        case ADDMONEY_ERROR:
            return {
                error: "add money error, please check your connection or input",
                success: null,
                loading: false
            }
        case CREATE_CUSTOMERACCOUNT:
            return {
                ...state,
                error: null,
                customerAccount: action.payload,
                success: "create account successfully",
                loading: false
            }
        case CREATECUSTOMERACCOUNT_ERROR:

            return {
                error: "create account error, please check your connection or input",
                success: null,
                loading: false
            }

        //------------
        case GET_DEPOSITHISTORY:
            return {
                ...state,
                error: null,
                depositList: action.payload,
                success: "get deposit successfully",
                loading: false
            }
        case GETDEPOSITHISTORY_ERROR:
            return {
                // error: action.payload,
                error: "get depository error, please check your connection or input",
                success: null,
                loading: false
            }
        case GET_TRANSFERHISTORY:
            return {
                ...state,
                error: null,
                transferList: action.payload,
                success: "get transfer successfully",
                loading: false
            }
        case GETTRANSFERTHISTORY_ERROR:
            return {
                // error: action.payload,
                error: "get transfer error, please check your connection or input",
                success: null,
                loading: false
            }
        case GET_DEBTHISTORY:
            return {
                ...state,
                error: null,
                debtList: action.payload,
                success: "get debt successfully",
                loading: false
            }
        case GETDEBTHISTORY_ERROR:
            return {
                // error: action.payload,
                error: "get debt error, please check your connection or input",
                success: null,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case REFRESH:
            return {
                ...state,
                error: null,
                success: null,

            }
        default:
            return state
    }
}