import { Mecanica_INITIAL_STATE } from "./"
import { typesMecanica } from "../../types/mecanica";

export const mecanicaReducer = (state = Mecanica_INITIAL_STATE, action) => {

  switch (action.type) {
    case typesMecanica.toggleForm :
      return {
        ...state,
        showForm: !state.showForm
      }
    
    case typesMecanica.addMecanica: 
      return {
        ...state,
        showForm: false,
        mecanicas: [...state.mecanicas, action.payload]
      }
  
    case typesMecanica.getAllMecanica:
      return {
        ...state,
        mecanicas: action.payload.mecanicas,
        totalPages: action.payload.totalPages
      }

    case typesMecanica.deleteMecanica:
      return {
        ...state,
        mecanicas: state.mecanicas.filter(mech => mech.id !== action.payload)
      }

    case typesMecanica.mecanicaToUpdate:
      return {
        ...state,
        updateMecanica: true,
        selectedMecanica: action.payload.mech,
        mechanic_detail: action.payload.detail,
        mechanic_bonus: action.payload.bonus,
      }

    case typesMecanica.cleanMecanicaToUpdate:
      return {
        ...state,
        selectedMecanica: null,
        updateMecanica: false,
        mechanic_detail: null,
        mechanic_bonus: null
      }

    default:
      return state;
  }
  
}