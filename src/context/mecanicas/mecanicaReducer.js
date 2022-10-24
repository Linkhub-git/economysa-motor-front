import { Mecanica_INITIAL_STATE } from "./"
import { typesMecanica } from "../../types/mecanica";

export const mecanicaReducer = (state = Mecanica_INITIAL_STATE, action) => {

  switch (action.type) {
    case typesMecanica.toggleForm :
      return {
        ...state,
        showForm: !state.showForm,
        mechanic_products: {},
        mechanic_clients: {}
      }
    
    case typesMecanica.addMecanica: 
      return {
        ...state,
        showForm: false,
        mecanicas: [action.payload, ...state.mecanicas],
        mechanic_products: {},
        mechanic_clients: {}
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
        mechanic_rules: action.payload.rules,
      }

    case typesMecanica.cleanMecanicaToUpdate:
      return {
        ...state,
        showForm:false,
        selectedMecanica: null,
        updateMecanica: false,
        mechanic_detail: [],
        mechanic_bonus: [],
        mechanic_rules: []
      }

    case typesMecanica.setMecanicaDetails:
      return {
        ...state,
        mechanic_detail: [...state.mechanic_detail, ...action.payload]
      }

    case typesMecanica.updateMechanic:
      return {
        ...state,
        showForm: false,
        selectedMecanica: null,
        updateMecanica: false,
        mecanicas: [...state.mecanicas.filter(mech => mech.id !== action.payload.id), action.payload],
        mechanic_rules: [],
        mechanic_detail: [],
        mechanic_bonus: [],
      }

    case typesMecanica.removeDetailMechanic:
      return {
        ...state,
        mechanic_detail: state.mechanic_detail.filter(detail => detail.id !== action.payload)
      }

    case typesMecanica.setClientUniverse:
      return {
        ...state,
        mechanic_clients: action.payload
      }

    case typesMecanica.setProductUniverse:
      return {
        ...state,
        mechanic_products: action.payload
      }
    default:
      return state;
  }
  
}