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
  mechanic_detail: [],
  mechanic_rules: [],
  mechanic_bonus: [],
  mechanic_entry: [],
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

  const crearMecanica = async (mechParams, rangeParams) => {
    try {
      const { data } = await toast.promise(
        apiUrl.post('/mechanic', mechParams),
        {
          pending: 'Creando mecanica',
          success: 'Mecanica creada',
          error: 'No se pudo crear la mecanica'
        }
      )
      
      await apiUrl.post('/mechanic_rules', {
        mechanic: data.id,
        mechanicRules: rangeParams
      });

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
      
      // const { data } = await apiUrl.get(`/mechanic_rules/${mech.id}`)
      const { data } = await apiUrl.get(`/mechanic_rules?mechanicId=${mech.id}`)

      console.log(data);
      
      dispatch({
        type: typesMecanica.mecanicaToUpdate,
        payload: {
          mech,
          rules: data.mechanicRules
        }
      })

    } catch (error) {
      console.log(error)
    }

  }

  const updateMechanic = async (mechParams, rangeParams) => {
    try {

      const { data } = await apiUrl.put(`/mechanic/${state.selectedMecanica.id}`, mechParams)
      
      await apiUrl.post('/mechanic_rules', {
        mechanic: state.selectedMecanica.id,
        mechanicRules: rangeParams
      });

      dispatch({
        type: typesMecanica.updateMechanic,
        payload: data
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

  const setDetailsMechanic = (details) => {
    dispatch({
      type: typesMecanica.setMecanicaDetails,
      payload: details
    })
  } 
  
  const removeDetailMechanic = (id) => {
    dispatch({
      type: typesMecanica.removeDetailMechanic,
      payload: id
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
        cleanMecanicaUpdate,
        setDetailsMechanic,
        removeDetailMechanic,
        updateMechanic
      }}
    >
      {children}
    </MecanicaContext.Provider>
  );
};
