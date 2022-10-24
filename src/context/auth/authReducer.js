import { authTypes } from "../../types/auth";
import { Auth_INITIAL_STATE } from "./";


export const authReducer = (state = Auth_INITIAL_STATE, action) => {
  switch(action.type) {

    case authTypes.logoutUser:
      return {
        ...state,
        token: ''
      }
    
    case authTypes.authenticateUser:
    case authTypes.tokenStorage: 
      return {
        ...state,
        token: action.payload
      }

    default: 
      return state
  }
}