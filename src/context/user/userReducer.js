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
  GET_DEBTLIST,
  ADD_DEBT,
  DEL_DEBT,
  UPDATE_DEBT,
  SET_LOADING,
  REFRESH,
  GET_NOTIFS,
  ADD_NOTIFS,
  READ_NOTIF
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
        // otpSuccess: "abc",
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
        // addBeneficiaryRes: action.payload,
        // beneficiaries: { ...state.benefinotifsciaries, 4: { beneficiary_account: action.payload.beneficiary_account, beneficiary_name: action.payload.name } },
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
        // success: "get beneficiary successfully",
        loading: false,
      };
    case BENEFICIARY_ERROR:
      return {
        ...state,
        error: "get beneficiary error, please check the connection or input",
        success: null,
        loading: false,
      }
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

    case POST_TRANSFERINTRABANK:
      return {
        ...state,
        error: null,
        success: "Transfer successfully",
        loading: false
      }
    case POST_TRANSFERINTERBANK:
      return {
        ...state,
        error: null,
        success: "Transfer successfully",
        loading: false
      }

    case VERIFY_OTP:
      return {
        ...state,
        error: null,
        success: "verifily otp successfully",
        loading: false
      }

    case GET_OTP:
      return {
        ...state,
        error: null,
        success: "send otp successfully, Check your email",
        loading: false
      }

    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        success: null,
        loading: false,
      };
    case ADD_DEBT:
      {
        const { debts } = state;
        const { creditors } = debts;
        console.log('debts', debts);
        console.log('creditors', creditors);
        return {
          ...state,
          debts: { ...debts, creditors: [...creditors, action.payload] },
          error: null,
          success: "add debt successfully",
          loading: false,
        };
      }
    case DEL_DEBT:
      {
        const { debts } = state;
        const { creditors } = debts;
        console.log('debts', debts);
        const removedIndex = creditors.findIndex(obj => obj.id === action.payload)
        return {
          ...state,
          debts: {
            ...debts, creditors: [...creditors.slice(0, removedIndex),
            ...creditors.slice(removedIndex + 1)]
          },
          error: null,
          success: "delete debt successfully",
          loading: false,
        }
      }
    case UPDATE_DEBT:
      {
        const { debts } = state;
        const { payers } = debts;
        const { id } = action.payload;
        const index = payers.findIndex(obj => obj.id === id);
        Object.assign(payers[index], { ...action.payload });
        console.log('debts', debts)
        return {
          ...state,
          error: null,
          success: "update debt successfully",
          loading: false,
        };
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
        beneficiary: {}
      }
    case GET_NOTIFS:
      {
        return {
          ...state,
          notifs: action.payload,
          error: null,
          loading: false,
        }
      }
    case ADD_NOTIFS: {
      const { notifs } = state
      return {
        ...state,
        notifs: [action.payload, ...notifs],
        error: null,
        loading: false,
      }
    }
    case READ_NOTIF: {
      const { notifs } = state
      const readNotifs = notifs.map(notif => ({ ...notif, unread: false }))
      console.log('readNotifs', readNotifs)
      return {
        ...state,
        notifs: [...readNotifs],
        error: null,
        loading: false,
      }
    }

    // case BENEFICIARIES_ERROR:
    // case BENEFICIARY_ERROR:
    // case UPDATE_BENEFICIARIES_ERROR:
    // case CHANGE_PASSWORD_ERROR:
    default:
      return state;
  }
};
