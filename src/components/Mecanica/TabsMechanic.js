import { Fragment, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { IoMdAddCircle } from "react-icons/io";
import { DetailTable } from "./DetailTable";
import { detailtypes } from "../../utils/mecanicasCombos";
import { apiUrl } from "../../api/apiUrl";
import { useContext } from "react";
import { MecanicaContext } from "../../context/mecanicas";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrash as DeleteIcon } from "react-icons/fa";

const searchParameter = [
  {
    key: "producto",
    value: "Producto",
  },
];

const fields = [
  {
    key: 1,
    value: "Nombre producto",
  },
  {
    key: 2,
    value: "Codigo producto",
  },
  {
    key: 3,
    value: "Nombre proveedor",
  },
  {
    key: 4,
    value: "Codigo proveedor",
  },
  {
    key: 5,
    value: "Nombre marca",
  },
  {
    key: 6,
    value: "Nombre categoria",
  },
];

const operators = [
  { key: 1, value: "igual" },
  { key: 2, value: "diferente" },
  { key: 3, value: "contiene" },
  { key: 4, value: "es parte de" },
];

const initialQuery = {
  field_id: "",
  operator_id: "",
  value: "",
};

const initialGroup = {
  groupOperator: "AND",
  conditions: [
    {
      field_id: "",
      operator_id: "",
      value: "",
    },
  ],
};

export const TabsMechanic = () => {
  const [activeTab, setActiveTab] = useState("detalle");
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("A");

  const { mechanic_detail, setDetailsMechanic } = useContext(MecanicaContext);

  const [querys, setQuerys] = useState([
    {
      field_id: "",
      operator_id: "",
      value: "",
    },
  ]);

  const [globalLogicOperator, setGlobalLogicOperator] = useState("AND");

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

  const handleChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchText("");
    setSearchResults([]);
  };

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleChangeType = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearch = async () => {
    const queryBody = {
      searchRules: {
        searchOperator: "OR",
        groups: groupQueries,
      },
    };

    const { data } = await apiUrl.post(`/product/conditions`, queryBody);


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

  const handleSave = () => {
    const filterData = searchResults
      .filter((item) => item.checked === true)
      .map((item) => {
        return {
          includedText: "Incluye",
          typeText: "Articulo",
          codigo: item.codigo,
          descripcion: item.descripcion,
          factor: 0,
          grupo: "A",
          id: item.id,
        };
      });
    setDetailsMechanic(filterData);
    setSearchText("");
    setSearchResults([]);
    setOpen(false);
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
    newGroup.splice(groupIndex,1);
    setGroupQueries(newGroup);
  }
  

  const columnsGrid = [
    { field: "id", headerName: "Codigo" },
    { field: "descripcion", headerName: "Producto", flex: 1 },
    { field: "unitMasterEquivalent", headerName: "Stock" },
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

  return (
    <Box sx={{ marginTop: 5 }}>
      <Card>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Detalle" value="detalle" />
          <Tab label="Productos a Bonificar" value="bonificar" />
          <Tab label="Listas de Precios" value="precios" />
        </Tabs>

        <CardContent>
          <Button
            variant="contained"
            startIcon={<IoMdAddCircle />}
            sx={{ marginBottom: 2 }}
            onClick={handleOpen}
          >
            Agregar {activeTab === "detalle" && "detalle"}
            {activeTab === "bonificar" && "producto"}
            {activeTab === "precios" && "rubro"}
          </Button>

          {activeTab === "detalle" && <DetailTable />}
          {/* 
          {activeTab === "bonificar" && <ProductBonusTable />}

          {activeTab === "precios" && <PriceListTable />} */}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Agregar {activeTab === "detalle" && "detalle"}
          {activeTab === "bonificar" && "producto"}
          {activeTab === "precios" && "rubro"}
        </DialogTitle>
        <DialogContent>
          <form>
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
                    <Box display="flex" justifyContent={'flex-end'}>
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
                              name="field_id"
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
                              name="operator_id"
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Guardar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
