import {
  DELETE_PERSONNEL,
  UPDATE_PERSONNEL,
  GET_LIST_EMPLOYEES,
  ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_LIST_EMPLOYEES:
      return {
        ...state,
        listEmployees: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_PERSONNEL:
      return {
        ...state,
        listEmployees: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_PERSONNEL:
      return {
        ...state,
        listEmployees: action.payload,
        error: null,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
