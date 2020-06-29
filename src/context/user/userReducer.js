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
  POST_TRANSFERINTRABANK,
  POST_TRANSFERINTERBANK,
  VERIFY_OTP,
  GET_OTP,
  USER_ERROR,
  // BENEFICIARY_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return {
        ...state,
        accountsOwner: action.payload,
        error: null,
        // success: "success",
        otpSuccess: "abc",
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
      console.log(action.payload)
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

    case POST_TRANSFERINTRABANK:
      return {
        ...state,
        error: null,
        success: action.payload,
        loading: false
      }
    case POST_TRANSFERINTERBANK:
      return {
        ...state,
        error: null,
        success: { msg: "Transfer successfully" },
        loading: false
      }

    case VERIFY_OTP:
      console.log(action.payload.msg)
      return {
        ...state,
        error: null,
        success: action.payload
      }

    case GET_OTP:
      return {
        ...state,
        error: null,
        success: action.payload
      }

    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        success: null,
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
