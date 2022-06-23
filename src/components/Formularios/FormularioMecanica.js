import {
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  InputAdornment,
  Box,
  Button,
} from "@mui/material";
import {
  acumulatesOptions,
  conditionals,
  emisorOptions,
  promotionTypes,
  types,
} from "../../utils/mecanicasCombos";
import { useContext } from "react";
import { MecanicaContext } from "../../context/mecanicas";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { isAfter, format } from "date-fns";

import {MdArrowBack, MdSave} from 'react-icons/md'

export const FormularioMecanica = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accumulate: "S",
      emitter: "E",
      type: "R",
      promotionType: "",
      conditional: "",
      emitterId: "",
      factor: "",
    },
  });

  const acumula = watch("accumulate");
  const tipo = watch("type");
  const emisor = watch("emitter");
  const promotion = watch("promotionType");
  const conditional = watch("conditional");
  const proveedor = watch("emitterId");

  const { toggleForm, crearMecanica, updateMecanica, selectedMecanica } = useContext(MecanicaContext);

  const onSubmit = async (params) => {
    if (params.type === "R") {
      params.factor = null;
      params.range1 = Number(params.range1).toFixed(2);
      params.range2 = Number(params.range2).toFixed(2);
    }

    if (params.type === "F") {
      params.range1 = null;
      params.range2 = null;
      params.factor = Number(params.factor).toFixed(2);
    }

    params.startDate = new Date(params.startDate).getTime();
    params.endDate = new Date(params.endDate).getTime();

    if(!isAfter(params.endDate, params.startDate)){
      toast.error('La fecha fin debe ser posterior a la fecha inicial')
      return
    }

    if(params.range1 && params.range2 && params.range1 > params.range2) {
      toast.error('El rango 1 debe ser menor al rango 2')
      return
    }

    crearMecanica(params);
  };

  useEffect(() => {
    if (tipo === "R") {
      setValue("factor", "");
    }
    if (tipo === "F") {
      setValue("range1", "");
      setValue("range2", "");
    }
  }, [tipo]);

  useEffect(() => {

    if(updateMecanica && selectedMecanica) {
      setValue("description", selectedMecanica.description)
      setValue("startDate", format(new Date(selectedMecanica.startDate),'yyyy-MM-dd'))
      setValue("endDate", format(new Date(selectedMecanica.endDate),'yyyy-MM-dd'))
      setValue("accumulate", selectedMecanica.accumulate)
      setValue("promotionType", selectedMecanica.promotionType)
      setValue("type", selectedMecanica.type)
      setValue("conditional", selectedMecanica.conditional)
      setValue("factor", selectedMecanica.factor)
      setValue("range1", selectedMecanica.range1)
      setValue("range2", selectedMecanica.range2)
      setValue("emitter", selectedMecanica.emitter)
      setValue("emitterId", selectedMecanica.emitterId)
    }

  },[])

  return (
    <>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Definicion */}
        <FormControl
          component="fieldset"
          fullWidth
          className="bg-gray-200 p-3 rounded"
        >
          <FormLabel component="legend" className="fw-bold mb-4">
            Definicion
          </FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {
              updateMecanica && (
                <TextField
                  label="Código"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={selectedMecanica.code || ""}
                  disabled
                />
              )
            }

            <TextField
              label="Descripción"
              variant="outlined"
              {...register("description", { required: true })}
              disabled={updateMecanica}
            />
            <TextField
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              label="Fecha Inicio"
              variant="outlined"
              {...register("startDate", { required: true })}
            />
            <TextField
              type="date"
              InputLabelProps={{ shrink: true, required: true }}
              label="Fecha Fin"
              variant="outlined"
              {...register("endDate", { required: true })}
            />
          </div>
        </FormControl>

        {/* Caracteristicas */}
        <FormControl
          component="fieldset"
          fullWidth
          className="mt-4 bg-gray-200 p-3 rounded"
        >
          <FormLabel component="legend" className="fw-bold  mb-4">
            Caracteristicas
          </FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TextField
              select
              label="Acumula"
              helperText="Porfavor seleccione el tipo de acumulacion"
              {...register("accumulate", { required: true })}
              value={acumula}
              disabled={updateMecanica}
            >
              {acumulatesOptions.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Tipo de Promocion"
              helperText="Porfavor seleccione el tipo promocion"
              value={promotion}
              {...register("promotionType", { required: true })}
              disabled={updateMecanica}
            >
              {promotionTypes.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Tipo"
              helperText="Porfavor seleccione el tipo"
              {...register("type", { required: true })}
              value={tipo}
              disabled={updateMecanica}
            >
              {types.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Condicional"
              helperText="Porfavor seleccione el condicional"
              {...register("conditional", { required: true })}
              value={conditional}
              disabled={updateMecanica}
            >
              {conditionals.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </FormControl>

        {/* Factor y Rango */}
        <FormControl
          component="fieldset"
          fullWidth
          className="mt-4 bg-gray-200 p-3 rounded"
        >
          <FormLabel component="legend" className="fw-bold  mb-4">
            Factor y Rango
          </FormLabel>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Factor */}

            {(tipo === "F" || tipo === "X") && (
              <TextField
                type="number"
                label="Factor"
                placeholder="0"
                {...register("factor", { required: true, shrink: true })}
                disabled={updateMecanica}
              />
            )}

            {/* Rango */}

            {(tipo === "R" || tipo === "X") && (
              <>
                <TextField
                  type="number"
                  label="Rango 1"
                  InputLabelProps={{ shrink: true, required: true }}
                  placeholder={acumula === "S" ? "0.00" : "0"}
                  {...register("range1", { required: true })}
                  disabled={updateMecanica}
                  InputProps={
                    acumula === "S"
                      ? {
                          startAdornment: (
                            <InputAdornment position="start">
                              S/.
                            </InputAdornment>
                          ),
                        }
                      : null
                  }
                />
                <TextField
                  type="number"
                  label="Rango 2"
                  InputLabelProps={{ shrink: true, required: true }}
                  placeholder={acumula === "S" ? "0.00" : "0"}
                  disabled={updateMecanica}
                  {...register("range2", { required: true })}
                  InputProps={
                    acumula === "S"
                      ? {
                          startAdornment: (
                            <InputAdornment position="start">
                              S/.
                            </InputAdornment>
                          ),
                        }
                      : null
                  }
                />
              </>
            )}
          </div>
        </FormControl>

        {/* Emisor */}

        <FormControl
          component="fieldset"
          fullWidth
          className="mt-4 bg-gray-200 p-3 rounded"
        >
          <FormLabel component="legend" className="fw-bold  mb-4">
            Emisor
          </FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TextField
              select
              label="Emisor"
              helperText="Porfavor seleccione el Emisor"
              disabled={updateMecanica}
              {...register("emitter", { required: true })}
              value={emisor}
            >
              {emisorOptions.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Emisor Proveedor */}

            {emisor === "P" && (
              <TextField
                select
                label="Proveedor"
                helperText="Porfavor seleccione el Proveedor"
                {...register("emitterId")}
                value={proveedor}
                disabled={updateMecanica}
              ></TextField>
            )}
          </div>
        </FormControl>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          className="mt-4"
        >
          <Button variant="contained" color="success" type="submit" startIcon={<MdSave/>}>
            Guardar
          </Button>
          <Button variant="contained" color="error" onClick={toggleForm} startIcon={<MdArrowBack/>}>
            Atras
          </Button>
        </Box>
      </form>
    </>
  );
};
