import { useReducer } from "react";
import { apiUrl } from "../../api/apiUrl";
import { typesMecanica } from "../../types/mecanica";
import { toast } from "react-toastify";
import { MecanicaContext, mecanicaReducer } from "./";

const defaultMechs = [
  {
    id: 14,
    code: "0010011",
    description: "Mecanica ejemplo",
    startDate: "2022-04-28T05:00:00.000+00:00",
    endDate: "2022-05-31T05:00:00.000+00:00",
    accumulate: "S",
    promotionType: "P",
    type: "R",
    range1: 10,
    range2: 100,
    factor: null,
    conditional: "E",
    emitter: "E",
    emitterObj: null,
    creationUser: "jcieza90@gmail.com",
    creationDate: "2022-04-28T17:38:59.316+00:00",
    updateUser: null,
    updateDate: null,
    status: "C",
    statusText: "Creada",
    emitterText: "Economysa",
  },
  {
    id: 13,
    code: "0010010",
    description: "bbbrt",
    startDate: "2022-04-27T05:00:00.000+00:00",
    endDate: "2022-04-30T05:00:00.000+00:00",
    accumulate: "S",
    promotionType: "P",
    type: "F",
    range1: null,
    range2: null,
    factor: 10,
    conditional: "E",
    emitter: "P",
    emitterObj: {
      id: 499,
      code: "00051",
      name: "AGROINDUSTRIA NORPERUANA SA",
      ruc: "20374817770",
      creationDate: "2022-03-03T06:56:37.415+00:00",
    },
    creationUser: "jcieza90@gmail.com",
    creationDate: "2022-04-27T05:32:58.252+00:00",
    updateUser: null,
    updateDate: null,
    status: "C",
    statusText: "Creada",
    emitterText: "Proveedor",
  },
  {
    id: 12,
    code: "0010009",
    description: "rvervver",
    startDate: "2022-04-27T05:00:00.000+00:00",
    endDate: "2022-04-30T05:00:00.000+00:00",
    accumulate: "S",
    promotionType: "D",
    type: "R",
    range1: 10,
    range2: 20,
    factor: null,
    conditional: "E",
    emitter: "E",
    emitterObj: null,
    creationUser: "jcieza90@gmail.com",
    creationDate: "2022-04-27T05:31:48.894+00:00",
    updateUser: null,
    updateDate: null,
    status: "C",
    statusText: "Creada",
    emitterText: "Economysa",
  },
  {
    id: 11,
    code: "0010008",
    description: "Mecanica 0011",
    startDate: "2022-04-27T05:00:00.000+00:00",
    endDate: "2022-04-30T05:00:00.000+00:00",
    accumulate: "S",
    promotionType: "P",
    type: "F",
    range1: null,
    range2: null,
    factor: 2,
    conditional: "I",
    emitter: "E",
    emitterObj: null,
    creationUser: "jcieza90@gmail.com",
    creationDate: "2022-04-27T05:22:06.059+00:00",
    updateUser: null,
    updateDate: null,
    status: "C",
    statusText: "Creada",
    emitterText: "Economysa",
  },
  {
    id: 10,
    code: "0010007",
    description: "Mecanica 0010",
    startDate: "2022-04-27T05:00:00.000+00:00",
    endDate: "2022-04-30T05:00:00.000+00:00",
    accumulate: "U",
    promotionType: "P",
    type: "F",
    range1: null,
    range2: null,
    factor: 12,
    conditional: "E",
    emitter: "E",
    emitterObj: null,
    creationUser: "jcieza90@gmail.com",
    creationDate: "2022-04-27T05:21:15.482+00:00",
    updateUser: null,
    updateDate: null,
    status: "C",
    statusText: "Creada",
    emitterText: "Economysa",
  },
];

export const Mecanica_INITIAL_STATE = {
  mecanicas: [],
  showForm: false,
  updateMecanica: false,
  selectedMecanica: null,
  mechanic_detail: [],
  mechanic_rules: [],
  mechanic_bonus: [],
  mechanic_entry: [],
  totalPages: null,
  mechanic_products: {},
  mechanic_clients: {},
};

export const MecanicaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mecanicaReducer, Mecanica_INITIAL_STATE);

  const toggleForm = () => {
    dispatch({
      type: typesMecanica.toggleForm,
    });
  };

  const getMecanicas = async (page) => {
    try {
      // const { data } = await apiUrl.get(`/mechanic?size=10&page=${page}`);
      // data.content = data.content.filter(mech => mech.status !== 'D');
      // dispatch({
      //   type: typesMecanica.getAllMecanica,
      //   payload: {
      //     mecanicas: data.content,
      //     totalPages: data.totalPages
      //   }
      // })
      // return data;
      dispatch({
        type: typesMecanica.getAllMecanica,
        payload: {
          mecanicas: defaultMechs,
          totalPages: 1,
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("No se pudieron obtener las mecacnicas");
    }
  };

  const crearMecanica = async (mechParams, rangeParams) => {
    try {
      const { data } = await toast.promise(
        apiUrl.post("/mechanic", mechParams),
        {
          pending: "Creando mecanica",
          success: "Mecanica creada",
          error: "No se pudo crear la mecanica",
        }
      );

      await apiUrl.post("/mechanic_rules", {
        mechanic: data.id,
        mechanicRules: rangeParams,
      });



      const searchRulesProducts = {
        mechanic: data.id,
        type: "P1",
        searchRules: state.mechanic_products,
      };
      const searchRulesClients = {
        mechanic: data.id,
        type: "C1",
        searchRules: state.mechanic_clients,
      };

      await apiUrl.post("/search", searchRulesProducts);
      await apiUrl.post("/search", searchRulesClients);

      dispatch({
        type: typesMecanica.addMecanica,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const mecanicaToUpdate = async (mech) => {
    // TODO: Agregar Entry peticiones
    try {
      // const { data } = await apiUrl.get(`/mechanic_rules/${mech.id}`)
      const { data } = await apiUrl.get(
        `/mechanic_rules?mechanicId=${mech.id}`
      );

      console.log(data);

      dispatch({
        type: typesMecanica.mecanicaToUpdate,
        payload: {
          mech,
          rules: data.mechanicRules,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateMechanic = async (mechParams, rangeParams) => {
    try {
      const { data } = await apiUrl.put(
        `/mechanic/${state.selectedMecanica.id}`,
        mechParams
      );

      await apiUrl.post("/mechanic_rules", {
        mechanic: state.selectedMecanica.id,
        mechanicRules: rangeParams,
      });

      dispatch({
        type: typesMecanica.updateMechanic,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cleanMecanicaUpdate = () => {
    dispatch({
      type: typesMecanica.cleanMecanicaToUpdate,
    });
  };

  const setDetailsMechanic = (details) => {
    dispatch({
      type: typesMecanica.setMecanicaDetails,
      payload: details,
    });
  };

  const removeDetailMechanic = (id) => {
    dispatch({
      type: typesMecanica.removeDetailMechanic,
      payload: id,
    });
  };

  const deleteMecanica = async (mecanicaId) => {
    try {
      const response = await apiUrl.delete(`/mechanic/${mecanicaId}`);

      dispatch({
        type: typesMecanica.deleteMecanica,
        payload: mecanicaId,
      });

      toast.success("Se elimino correctamente la mecanica");
      console.log(response);
    } catch (error) {
      toast.error("Hubo un error al eliminar la mecanica");
      console.log(error);
    }
  };

  const setClientsUniverse = (universe, globalLogicOperator) => {
    dispatch({
      type: typesMecanica.setClientUniverse,
      payload: { searchOperator: globalLogicOperator, groups: universe },
    });
  };

  const setProductsUniverse = (universe, globalLogicOperator) => {
    dispatch({
      type: typesMecanica.setProductUniverse,
      payload: { searchOperator: globalLogicOperator, groups: universe },
    });
  };

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
        updateMechanic,
        setClientsUniverse,
        setProductsUniverse,
      }}
    >
      {children}
    </MecanicaContext.Provider>
  );
};
