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
  GET_TRANSACTIONS,
  USER_ERROR,
  GET_DEBTLIST,
  ADD_DEBT
  // BENEFICIARY_ERROR
} from "../types";
import { act } from "react-dom/test-utils";

export default (state, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return {
        ...state,
        accountsOwner: action.payload,
        error: null,
        // success: "success",
        loading: false,
      };
    // case ADD_BENEFICIARY:
    //     return {
    //         ...state,
    //         beneficiaries: [action.payload, ...state.beneficiaries],
    //         error: null,
    //         success: "success",
    //         loading: false
    //     }
    case GET_BENEFICIARIES:
      return {
        ...state,
        beneficiaries: action.payload,
        error: null,
        // success: "success",
        loading: false,
      };
    case ADD_BENEFICIARY:
      return {
        ...state,
        addBeneficiaryRes: action.payload,
        error: null,
        success: "add beneficiary successfully",
        loading: false,
      };
    case UPDATE_BENEFICIARIES:
      return {
        ...state,
        res: action.payload,
        error: null,
        success: "update successfully",
        loading: false,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        res: action.payload,
        error: null,
        success: "change password successfully!!",
        loading: false,
      };
    case GET_BENEFICIARY:
      return {
        ...state,
        beneficiary: action.payload,
        error: null,
        // success: "success",
        loading: false,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        error: null,
        loading: false,
      };
    case GET_DEBTLIST:
      return {
        ...state,
        debts: action.payload,
        error: null,
        loading: false,
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        success: null,
        loading: false,
      };
    case ADD_DEBT:
      return {
        ...state,
        res: action.payload,
        error: null,
        success: "add debt successfully",
        loading: false,
      };
    // case BENEFICIARIES_ERROR:
    // case BENEFICIARY_ERROR:
    // case UPDATE_BENEFICIARIES_ERROR:
    // case CHANGE_PASSWORD_ERROR:
    default:
      return state;
  }
};
