import { useReducer } from "react";
import { apiUrl } from "../../api/apiUrl";
import { typesMecanica } from "../../types/mecanica";
import { toast } from 'react-toastify';
import { MecanicaContext, mecanicaReducer } from "./";



export const Mecanica_INITIAL_STATE = {
  mecanicas: [],
  showForm: false,
  updateMecanica: false,
  selectedMecanica: null,
  mechanic_detail: null,
  mechanic_bonus: null,
  mechanic_entry: null,
  totalPages: null
};

export const MecanicaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mecanicaReducer, Mecanica_INITIAL_STATE);

  const toggleForm = () => {
    dispatch({
      type: typesMecanica.toggleForm
    })
  }

  const getMecanicas = async (page) => {
    try {
      const { data } = await apiUrl.get(`/mechanic?size=10&page=${page}`);

      data.content = data.content.filter(mech => mech.status !== 'D');
      
      dispatch({
        type: typesMecanica.getAllMecanica,
        payload: {
          mecanicas: data.content,
          totalPages: data.totalPages
        }
      })
      

      return data;

    } catch (err) {
      console.log(err);
      toast.error('No se pudieron obtener las mecacnicas')
    }
  };

  const crearMecanica = async (mechParams) => {
    try {
      const { data } = await toast.promise(
        apiUrl.post('/mechanic', mechParams),
        {
          pending: 'Creando mecanica',
          success: 'Mecanica creada',
          error: 'No se pudo crear la mecanica'
        }
      )

      dispatch({
        type: typesMecanica.addMecanica,
        payload: data
      })
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const mecanicaToUpdate = async (mech) => {
    // TODO: Agregar Entry peticiones
    try {
      
      const [detail, bonus] = await Promise.all(
        [
          apiUrl.get(`/mechanic_detail?mechanic=${mech.id}`).then(response => response.data),
          apiUrl.get(`/mechanic_bonus?mechanicId=${mech.id}`).then(response => response.data)
          // apiUrl.get(`/mechanic_entry?mechanic=${mech.id}`).then(response => response.data),
        ]
      )
      
      dispatch({
        type: typesMecanica.mecanicaToUpdate,
        payload: {
          mech,
          detail,
          bonus
        }
      })

    } catch (error) {
      console.log(error)
    }

  }

  const cleanMecanicaUpdate = () => {
    dispatch({
      type: typesMecanica.cleanMecanicaToUpdate
    })
  }

  const deleteMecanica = async (mecanicaId) => {
    try {
      const response = await apiUrl.delete(`/mechanic/${mecanicaId}`)

      dispatch({
        type: typesMecanica.deleteMecanica,
        payload: mecanicaId
      })

      toast.success('Se elimino correctamente la mecanica')
      console.log(response)
    } catch (error) {
      toast.error('Hubo un error al eliminar la mecanica')
      console.log(error)
    }
  }
  
  
  

  return (
    <MecanicaContext.Provider
      value={{
        ...state,
        toggleForm,
        crearMecanica,
        getMecanicas,
        deleteMecanica,
        mecanicaToUpdate,
        cleanMecanicaUpdate
      }}
    >
      {children}
    </MecanicaContext.Provider>
  );
};
