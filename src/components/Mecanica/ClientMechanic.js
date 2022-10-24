import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { apiUrl } from "../../api/apiUrl";

import { FaTrash as DeleteIcon } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";

const fields = [
  {
    key: 7,
    value: "Codigo Cliente",
  },
  {
    key: 8,
    value: "Distrito",
  },
  {
    key: 9,
    value: "Provincia",
  },
  {
    key: 10,
    value: "Departamento",
  },
  {
    key: 11,
    value: "Giro de Negocio",
  },
  {
    key: 12,
    value: "Almacen",
  },
  {
    key: 13,
    value: "Modulo",
  },
  {
    key: 14,
    value: "Lista de Precios",
  },
  {
    key: 15,
    value: "Clase de Negocio",
  },
];

const operators = [
  { key: 1, value: "igual" },
  { key: 2, value: "diferente" },
  { key: 3, value: "contiene" },
  { key: 4, value: "no contiene" },
  { key: 5, value: "es parte de" },
];

const initialQuery = {
  fieldId: "",
  operatorId: "",
  value: "",
};

const initialGroup = {
  groupOperator: "AND",
  conditions: [
    {
      fieldId: "",
      operatorId: "",
      value: "",
    },
  ],
};

export const ClientMechanic = () => {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [globalLogicOperator, setGlobalLogicOperator] = useState("AND");

  const columnsGrid = [
    { field: "codigo", headerName: "Codigo" },
    { field: "nombre", headerName: "Nombre", flex: 1 },

    {
      field: "seleccion",
      headerName: "Seleccion",
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.row.checked}
            onChange={() => handleCheckChange(params.row.id)}
          />
        );
      },
    },
  ];

  const [groupQueries, setGroupQueries] = useState([
    {
      groupOperator: "AND",
      conditions: [
        {
          field_id: "",
          operator_id: "",
          value: "",
        },
      ],
    },
  ]);

  const handleCheckChange = (id) => {
    const newSearchResults = searchResults.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });

    setSearchResults(newSearchResults);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchResults([]);
  };

  const handleSearch = async () => {
    const queryBody = {
      searchRules: {
        searchOperator: "OR",
        groups: groupQueries,
      },
    };

    const { data } = await apiUrl.post(`/customer/search`, queryBody);

    const formatData = data.map((item) => {
      return {
        id: item.id,
        codigo: item.code,
        descripcion: item.name,
        ...item,
        checked: true,
      };
    });
    setSearchResults(formatData);
  };

  const handleToggleAll = (status) => {
    const newSearchResults = searchResults.map((item) => {
      return {
        ...item,
        checked: status,
      };
    });

    setSearchResults(newSearchResults);
  };

  const handleClickAddQuery = (groupIndex) => {
    const newQuery = [...groupQueries];

    newQuery[groupIndex].conditions.push(initialQuery);
    // newQuery[groupIndex][queryIndex]

    setGroupQueries(newQuery);
  };

  const handleClickAddGroup = () => {
    const newGroup = [...groupQueries];
    newGroup.push(initialGroup);
    setGroupQueries(newGroup);
    // setGroupQueries([...groupQueries, initialGroup]);
  };

  const handleChangeQuery = (e, groupIndex, queryIndex) => {
    const newGroups = [...groupQueries];

    newGroups[groupIndex].conditions[queryIndex][e.target.name] =
      e.target.value;

    setGroupQueries(newGroups);
  };

  const handleChangeLogicOperator = (e, groupIndex) => {
    const newGroup = [...groupQueries];
    newGroup[groupIndex].groupOperator = e.target.value;

    setGroupQueries(newGroup);
  };

  const handleClickRemoveQuery = (groupIndex, queryIndex) => {
    const newGroup = [...groupQueries];
    newGroup[groupIndex].conditions.splice(queryIndex, 1);
    console.log(newGroup);
    setGroupQueries(newGroup);
  };

  const handleClickRemoveGroup = (groupIndex) => {
    const newGroup = [...groupQueries];
    newGroup.splice(groupIndex, 1);
    setGroupQueries(newGroup);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Añadir Clientes
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Clientes a Bonificar</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent={"center"}
            sx={{ marginBottom: 1, marginTop: "10px" }}
          >
            <TextField
              select
              label="Operador Logico"
              sx={{ width: "200px" }}
              value={globalLogicOperator}
              onChange={(e) => setGlobalLogicOperator(e.target.value)}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </TextField>
            <Button variant="contained" onClick={handleClickAddGroup} sm>
              +
            </Button>
          </Box>

          <Box display="flex" flexDirection="column" sx={{ gap: "10px" }}>
            {groupQueries.map((group, index) => (
              <Box
                key={`group-${index}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  border: "1px solid blue",
                  borderRadius: "10px",
                  padding: "15px",
                }}
              >
                {index !== 0 && (
                  <Box display="flex" justifyContent={"flex-end"}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleClickRemoveGroup(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                )}

                {group.conditions.map((q, queryIndex) => (
                  <Fragment key={`query-${queryIndex}`}>
                    <Grid
                      container
                      // sx={{ marginTop: 1 }}
                      spacing={2}
                      alignItems={"center"}
                    >
                      <Fragment>
                        <Grid item md={3}>
                          <TextField
                            select
                            label="Campo"
                            name="fieldId"
                            fullWidth
                            onChange={(e) =>
                              handleChangeQuery(e, index, queryIndex)
                            }
                          >
                            {fields.map((item) => (
                              <MenuItem key={item.key} value={item.key}>
                                {item.value}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={2}>
                          <TextField
                            select
                            label="Operador"
                            name="operatorId"
                            fullWidth
                            onChange={(e) =>
                              handleChangeQuery(e, index, queryIndex)
                            }
                          >
                            {operators.map((item) => (
                              <MenuItem key={item.key} value={item.key}>
                                {item.value}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={3}>
                          <TextField
                            label="Valor"
                            name="value"
                            fullWidth
                            onChange={(e) =>
                              handleChangeQuery(e, index, queryIndex)
                            }
                          />
                        </Grid>

                        {queryIndex === 0 ? (
                          <Grid item md={2}>
                            <Button
                              variant="contained"
                              onClick={() => handleClickAddQuery(index)}
                            >
                              +
                            </Button>
                          </Grid>
                        ) : (
                          <Grid item md={2}>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                handleClickRemoveQuery(index, queryIndex)
                              }
                            >
                              <DeleteIcon />
                            </Button>
                          </Grid>
                        )}
                      </Fragment>
                    </Grid>
                  </Fragment>
                ))}
                <TextField
                  select
                  label="Operador Logico"
                  defaultValue={"AND"}
                  sx={{ width: "200px" }}
                  onChange={(e) => handleChangeLogicOperator(e, index)}
                >
                  <MenuItem value="AND">AND</MenuItem>
                  <MenuItem value="OR">OR</MenuItem>
                </TextField>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSearch}
            sx={{ marginTop: "16px" }}
          >
            Buscar
          </Button>

          <Box
            display="flex"
            gap={3}
            sx={{
              marginTop: 3,
              height: "300px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <DataGrid
              disableSelectionOnClick
              rowsPerPageOptions={[]}
              hideFooterRowCount
              isRowSelectable={false}
              columns={columnsGrid}
              rows={searchResults}
            />
          </Box>
          <Box display="flex" gap={3} sx={{ marginTop: 3 }}>
            <Button variant="outlined" onClick={() => handleToggleAll(true)}>
              Seleccionar Todos
            </Button>
            <Button variant="outlined" onClick={() => handleToggleAll(false)}>
              Quitar Todos
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
