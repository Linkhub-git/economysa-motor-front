import { Proveedor_INITIAL_STATE } from "./"
import { typesProveedores } from '../../types/proveedores'

export const proveedorReducer = (state = Proveedor_INITIAL_STATE, action) => {

  switch (action.type) {

    case typesProveedores.getProveedores: 
      return {
        ...state,
        proveedores: action.payload
      }
    default:
      return state;
  }

}