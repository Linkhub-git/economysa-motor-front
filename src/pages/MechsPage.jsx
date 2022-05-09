import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { apiUrl } from "../api/apiUrl";
import { PageContainer } from "../components/layout/pageContainer";
import { Title } from "../components/layout/Title";
import { ActionCell } from "../components/Table/ActionCell";
import { Cell } from "../components/Table/Cell";
import { Header } from "../components/Table/Header";
import { Table } from "../components/Table/Table";

export const MechsPage = () => {
  const [data, setData] = useState([]);
  const [paginacion, setPaginacion] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (page) => {
    try {
      const { data } = await apiUrl.get(`/mechanic?size=10&page=${page}`);
      if (page === 0) {
        setPaginacion(data.totalPages - 1);
      }
      console.log(data);
      setData(data.content);
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
      Cell: () => <ActionCell editar={true} />,
    },
  ];
  return (
    <PageContainer>
      <Title title="Listado de Mecánicas" />
      <Table
        button={
          <button className="rounded text-white px-2 py-1 flex bg-sky-900 items-center">
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
