import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, TextField } from "@mui/material";
import { FormularioMecanica } from "../components/Formularios/FormularioMecanica";
import { PageContainer } from "../components/layout/pageContainer";
import { Title } from "../components/layout/Title";
import { ActionCell } from "../components/Table/ActionCell";
import { Cell } from "../components/Table/Cell";
import { Header } from "../components/Table/Header";
import { Table } from "../components/Table/Table";
import { emisorOptions } from "../utils/mecanicasCombos";
import { MecanicaContext } from "../context/mecanicas";
import { DetailsCard } from "../components/Mecanica/DetailsCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MechsPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [paginacion, setPaginacion] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  
  const [selectedMecanicaToDelete, setSelectedMecanicaToDelete] = useState(null);

  const { mecanicas, showForm, toggleForm, updateMecanica, getMecanicas, deleteMecanica, mecanicaToUpdate, cleanMecanicaUpdate } = useContext(MecanicaContext)

  const fetchData = async (page) => {
    try {
      const data = await getMecanicas(page);
      if (page === 0) {
        setPaginacion(data.totalPages - 1);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if(filter === 'all') {
      setFilteredData(mecanicas);
    }else {
      const filterData = mecanicas.filter(item => item.emitter === filter)
      setFilteredData(filterData)
    }
    
  },[mecanicas,filter])

  const columns = [
    {
      Header: () => <Header texto="Código" />,
      accessor: "code",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Emisor" />,
      accessor: "emitterText",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Fecha Inicio" />,
      accessor: "startDate",
      Cell: ({ value }) => (
        <Cell text={format(parseISO(value), "dd-MM-yyyy")} />
      ),
    },
    {
      Header: () => <Header texto="Fecha Fin" />,
      accessor: "endDate",
      Cell: ({ value }) => (
        <Cell text={format(parseISO(value), "dd-MM-yyyy")} />
      ),
    },
    {
      Header: () => <Header texto="Usuario Creación" />,
      accessor: "creationUser",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Fecha Creación" />,
      accessor: "creationDate",
      Cell: ({ value }) => (
        <Cell text={format(parseISO(value), "dd-MM-yyyy")} />
      ),
    },
    {
      Header: () => <Header texto="Acciones" />,
      accessor: "status",
      Cell: ({row}) => (
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          <ActionCell editar={true} onClick={() => handleSelectToUpdate(row.original)} />
          <ActionCell eliminar={true} onClick={() => handleDelete(row.original)}/>
        </Box>
      ),
    },
  ];

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
    if(e.target.value !== 'all'){
      const filterData = mecanicas.filter(item => item.emitter === e.target.value)
      setFilteredData(filterData)
      return;
    }
    
    setFilteredData(mecanicas)
  };

  const confirmDeleteMecanica = () => {
    deleteMecanica(selectedMecanicaToDelete.id)
    setShowConfirmDialog(false);
    setSelectedMecanicaToDelete(null)
  }

  const handleCreate = () => {
    cleanMecanicaUpdate();
    toggleForm();
  }
  
  const handleDelete = (mecanica) => {
    setShowConfirmDialog(true);
    setSelectedMecanicaToDelete(mecanica)
  }

  const handleSelectToUpdate = (mecanica) => {
    mecanicaToUpdate(mecanica)
    toggleForm();
  }
  
  const cancelDeleteAction = () => {
    setShowConfirmDialog(false);
    setSelectedMecanicaToDelete(null)
  }
  

  return (
    
    <PageContainer>
      <Title title={showForm && updateMecanica && 'Actualizar Mecanica' } />
      <Title title={showForm && !updateMecanica && 'Crear Mecanica' } />
      <Title title={!showForm && !updateMecanica && 'Listado Mecanica' } />

      {!showForm && (
        <>
          <Box className="grid grid-cols-1 md:grid-cols-3 mt-4">
            <TextField

              select
              label="Filtro de Mecanicas"
              value={filter}
              onChange={handleChangeFilter}
              helperText="Filtrado de mecanicas"
            >
              <MenuItem value="all">
                  Todos
              </MenuItem>
              {emisorOptions.map((item) => (
                <MenuItem key={item.code} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Table
            button={
              <button
                className="rounded text-white px-2 py-1 flex bg-sky-900 items-center"
                onClick={handleCreate}
              >
                <FaPlus className="mr-2" />
                Nuevo
              </button>
            }
            data={filteredData}
            columnsData={columns}
            setCurrentPage={setCurrentPage}
            limMax={paginacion}
            currentPage={currentPage}
          />
        </>
      )}

      {showForm && <FormularioMecanica />}

      {showForm && updateMecanica && (
        <DetailsCard/>
      )}


      <Dialog
        open={showConfirmDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowConfirmDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Esta seguro de eliminar la mecanica ${selectedMecanicaToDelete?.code} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Al aceptar se eliminara la mecanica seleccionada con codigo <strong>{selectedMecanicaToDelete?.code}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDeleteMecanica}>Aceptar</Button>
          <Button onClick={cancelDeleteAction}>Cancelar</Button>
        </DialogActions>
      </Dialog>

    </PageContainer>
  );
};
