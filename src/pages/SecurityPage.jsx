import { format, parseISO } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api/apiUrl";
import { PageContainer } from "../components/layout/pageContainer";
import { Title } from "../components/layout/Title";
import { ActionCell } from "../components/Table/ActionCell";
import { Cell } from "../components/Table/Cell";
import { Header } from "../components/Table/Header";
import { Table } from "../components/Table/Table";

export const SecurityPage = () => {
  const [data, setData] = useState([]);
  const [paginacion, setPaginacion] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const columns = [
    {
      Header: () => <Header texto="Nombre" />,
      accessor: "name",
      Cell: ({ row }) => (
        <Cell text={`${row.original.name}  ${row.original.lastName}`} />
      ),
    },
    {
      Header: () => <Header texto="Correo" />,
      accessor: "email",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Roles" />,
      accessor: "role",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Teléfono" />,
      accessor: "phone",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Fecha Creación" />,
      accessor: "creationDate",
      Cell: ({ value }) => (
        <Cell text={format(parseISO(value), "MM/dd/yyyy")} />
      ),
    },
    {
      Header: () => <Header texto="Acciones" />,
      accessor: "status",
      Cell: ({ row }) => {
        return (
          <ActionCell
            editar={true}
            onClick={() => navigate(`/security/edit/${row.original.id}`)}
          />
        );
      },
    },
  ];

  const fetchData = useCallback(async (page) => {
    try {
      const { data } = await apiUrl.get("/user?page=0&size=10");
      setData(data.content);
      if (page === 0) {
        setPaginacion(data.totalPages - 1);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData(0);
  }, [fetchData]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  return (
    <PageContainer>
      <Title title="Listado de Usuarios" />
      <div className="bg-gray-200 px-3 py-2 mt-4 rounded flex-col w-full items-center justify-between">
        <button
          type="button"
          className="font-semibold text-md flex items-center w-full justify-between"
          onClick={() => setShowFilters((st) => !st)}
        >
          Filtros de Búsqueda <FaPlus />
        </button>
      </div>
      {showFilters && (
        <ul className="py-2 px-3 space-y-2 bg-white">
          <li className="flex items-center">
            <FaUser className="mr-3" />
            Usuario 1
          </li>
          <li className="flex items-center">
            <FaUser className="mr-3" />
            Usuario 2
          </li>
          <hr />
          <li className="text-sm text-gray-500">
            {data && data.length} registro(s) encontrados
          </li>
        </ul>
      )}
      <Table
        button={
          <button
            className="rounded text-white px-2 py-1 flex bg-sky-900 items-center"
            onClick={() => navigate("/security/new")}
          >
            <FaPlus className="mr-2" />
            Nuevo
          </button>
        }
        data={data}
        columnsData={columns}
        setCurrentPage={setCurrentPage}
        limMax={paginacion}
        currentPage={currentPage}
      />
    </PageContainer>
  );
};
