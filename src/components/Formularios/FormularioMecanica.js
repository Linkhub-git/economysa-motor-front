import {
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  InputAdornment,
  Box,
  Grid,
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

import { MdArrowBack, MdSave } from "react-icons/md";
import { useState } from "react";

import moment from "moment";
import { ProveedorContext } from "../../context/proveedores";
import { ClientMechanic } from "../Mecanica/ClientMechanic";

const defaultRangeAndFactorItem = {
  factor: 0,
  startRange: 0,
  endRange: 0,
  percentageDiscount: 0,
  productId: "",
  quantityProduct: 0,
  priority: 0,
  bonusMax: 0,
  bonusQuantity: 0
};

export const FormularioMecanica = () => {
  const { proveedores } = useContext(ProveedorContext);
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

  const [rangeDivisions, setRangeDivisions] = useState([
    {
      factor: 0,
      startRange: 0,
      endRange: 0,
      percentageDiscount: 0,
      productId: "",
      quantityProduct: 0,
      priority: 0,
      bonusMax: 0,
      bonusQuantity: 0
    },
  ]);

  const { toggleForm, crearMecanica, updateMecanica, selectedMecanica, mechanic_rules, updateMechanic } =
    useContext(MecanicaContext);

  const onSubmit = async (params) => {
    params.startDate = moment(params.startDate).format("YYYY-MM-DD");
    params.endDate = moment(params.endDate).format("YYYY-MM-DD");
    params.startTime = params.startTime.length < 8  ? params.startTime + ":00" : params.startTime;
    params.endTime = params.endTime.length < 8  ? params.endTime + ":00" : params.endTime;

    if (!moment(params.endDate).isAfter(params.startDate, "day")) {
      toast.error("La fecha fin debe ser posterior a la fecha inicial");
      return;
    }


    const objectToSend = {
      providerDescription: params.providerDescription,
      catalogDescription: params.catalogDescription,
      startDate: params.startDate,
      endDate: params.endDate,
      startTime: params.startTime,
      endTime: params.endTime,
      accumulate: params.accumulate,
      promotionType: params.promotionType,
      type: params.type,
      conditional: params.conditional,
      emitter: params.emitter,
      emitterId: params.emitterId,
      funder: "P",
      funderId: 421,
      level: 1,
      chatbot: 1

    };

    if(updateMecanica){
      updateMechanic(objectToSend, rangeDivisions)
    } else {
      crearMecanica(objectToSend, rangeDivisions);
    }

  };

  const handleAddRangeAndFactor = () => {
    setRangeDivisions([...rangeDivisions, defaultRangeAndFactorItem]);
  };

  const onChangeRule = (e, index, field) => {
    const newRules = [...rangeDivisions];

    if(e.target.value === '') {
      newRules[index][field] = e.target.value;
    } else {
      newRules[index][field] = Number(e.target.value);
    }


    setRangeDivisions(newRules)
  }

  const deleteCurrentRule = (index) => {
    
    const newRules = rangeDivisions.filter((_, indexRule) => indexRule !== index)

    setRangeDivisions(newRules)
  }
  
  

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
    if (updateMecanica && selectedMecanica) {
      setValue("providerDescription", selectedMecanica.providerDescription);
      setValue("catalogDescription", selectedMecanica.catalogDescription);
      setValue(
        "startDate",
        selectedMecanica.startDate
      );
      setValue(
        "endDate",
        selectedMecanica.endDate
      );
      setValue(
        "startTime",
        selectedMecanica.startTime
      );
      setValue(
        "endTime",
        selectedMecanica.endTime,
      );
      setValue("accumulate", selectedMecanica.accumulate);
      setValue("promotionType", selectedMecanica.promotionType);
      setValue("type", selectedMecanica.type);
      setValue("conditional", selectedMecanica.conditional);

      setValue("emitter", selectedMecanica.emitter);
      if(selectedMecanica.emitter === 'P'){
        setValue("emitterId", selectedMecanica.emitterObj.id);
      }

      setRangeDivisions(mechanic_rules)
    }
  }, [selectedMecanica]);

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
          <Grid container spacing={2}>
            {updateMecanica && (
              <Grid item xs={12} md={2}>
                <TextField
                  label="Código"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={selectedMecanica.code || ""}
                  disabled
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                label="Descripción Proveedor"
                InputLabelProps={{ shrink: true}}
                variant="outlined"
                fullWidth
                {...register("providerDescription", { required: true })}
                // disabled={updateMecanica}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Descripción Catalogo"
                variant="outlined"
                InputLabelProps={{ shrink: true}}
                fullWidth
                {...register("catalogDescription", { required: true })}
                // disabled={updateMecanica}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                type="date"
                InputLabelProps={{ shrink: true, required: true }}
                label="Fecha Inicio"
                fullWidth
                variant="outlined"
                {...register("startDate", { required: true })}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true, required: true }}
                label="Fecha Fin"
                variant="outlined"
                {...register("endDate", { required: true })}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="time"
                label="Hora Inicio"
                type="time"
                fullWidth
                // defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("startTime", { required: true })}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                id="time-final"
                label="Hora Fin"
                type="time"
                fullWidth
                // defaultValue="07:30"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("endTime", { required: true })}
              />
            </Grid>
          </Grid>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 align-items-center">
            <TextField
              select
              fullWidth
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

            <ClientMechanic/>
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

          
            <Box display="flex" justifyContent="end">
              <Button variant="contained" onClick={handleAddRangeAndFactor}>
                +
              </Button>
            </Box>
          

          {/* Factor */}
          {rangeDivisions.map((division, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              alignItems="center"
              sx={{ marginBottom: "16px" }}
            >
              <>
                {(tipo === "F" || tipo === "X") && (
                  <Grid item xs={12} md={1}>
                    <TextField
                      type="number"
                      label="Factor"
                      InputLabelProps={{ shrink: true }}
                      placeholder="0"
                      fullWidth
                      onChange={(e) => onChangeRule(e, index, 'factor')}
                      value={rangeDivisions[index].factor}
                      // disabled={updateMecanica}
                    />
                  </Grid>
                )}

                {/* Rango */}

                {(tipo === "R" || tipo === "X") && (
                  <>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="number"
                        label="Rango Inicial"
                        fullWidth
                        InputLabelProps={{ shrink: true, required: false }}
                        placeholder={acumula === "S" ? "0.00" : "0"}
                        onChange={(e) => onChangeRule(e, index, 'startRange')}
                        // disabled={updateMecanica}
                        value={rangeDivisions[index].startRange}
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
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="number"
                        label="Rango Final"
                        fullWidth
                        InputLabelProps={{ shrink: true, required: false }}
                        placeholder={acumula === "S" ? "0.00" : "0"}
                        // disabled={updateMecanica}
                        onChange={(e) => onChangeRule(e, index, 'endRange')}
                        value={rangeDivisions[index].endRange}
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
                    </Grid>
                  </>
                )}
                <Grid item xs={12} md={1}>
                  <TextField
                    type="number"
                    label={promotion === "D" ? "% Descuento" : "Producto"}
                    onChange={(e) => onChangeRule(e, index, promotion === "D" ? "percentageDiscount" : "productId")}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={promotion === "D" ? rangeDivisions[index].percentageDiscount : rangeDivisions[index].productId }
                    placeholder={"0"}
                    // disabled={updateMecanica}
                  />
                </Grid>
                {promotion !== "D" && (
                  <>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="number"
                        label={"Cantidad a Bonificar"}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => onChangeRule(e, index, 'bonusQuantity')}
                        fullWidth
                        value={rangeDivisions[index].bonusQuantity}
                        placeholder={"0"}
                        disabled={updateMecanica}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        type="number"
                        label={"Maximo a Bonificar"}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => onChangeRule(e, index, 'bonusMax')}
                        value={rangeDivisions[index].bonusMax}
                        fullWidth
                        placeholder={"0"}
                        disabled={updateMecanica}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} md={1}>
                  <TextField
                    type="number"
                    label="Prioridad"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => onChangeRule(e, index, 'priority')}
                    value={rangeDivisions[index].priority}
                    placeholder={acumula === "S" ? "0.00" : "0"}
                    // disabled={updateMecanica}
                  />
                </Grid>

                { index > 0 && (
                  <Grid item xs={12} md={1}>
                    <Button color="error" variant="contained" onClick={() =>deleteCurrentRule(index)}>X</Button>
                  </Grid>
                )}
              </>
            </Grid>
          ))}
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
              // disabled={updateMecanica}
              {...register("emitter", { required: false })}
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
                // disabled={updateMecanica}
              >
                {proveedores.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
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
          <Button
            variant="contained"
            color="success"
            type="submit"
            startIcon={<MdSave />}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={toggleForm}
            startIcon={<MdArrowBack />}
          >
            Atras
          </Button>
        </Box>
      </form>
    </>
  );
};
