import { useReducer } from "react";
import { apiUrl } from "../../api/apiUrl";
import { typesProveedores } from "../../types/proveedores";
import { proveedorReducer, ProveedorContext } from "./";




export const Proveedor_INITIAL_STATE = {
  proveedores: []
};

export const ProveedorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(proveedorReducer, Proveedor_INITIAL_STATE);

  const getProveedores = async () => {
    
    try {
      
      const { data } = await apiUrl.get('/provider/all')

      dispatch({
        type: typesProveedores.getProveedores,
        payload: data
      })

    } catch (error) {
      console.log(error);
    }

  }
  

  return (
    <ProveedorContext.Provider
      value={{
        ...state,
        getProveedores
      }}
    >
      {children}
    </ProveedorContext.Provider>
  )
}