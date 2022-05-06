import React, { useEffect, useState } from "react";
import { apiUrl } from "../api/apiUrl";
import { PageContainer } from "../components/layout/pageContainer";
import { Title } from "../components/layout/Title";
import { Cell } from "../components/Table/Cell";
import { Header } from "../components/Table/Header";
import { Table } from "../components/Table/Table";

export const ListUnityPage = () => {
  const [data, setData] = useState([]);
  const [paginacion, setPaginacion] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (page) => {
    try {
      const { data } = await apiUrl.get(`/unity?size=10&page=${page}`);
      if (page === 0) {
        setPaginacion(data.totalPages);
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
      Header: () => <Header texto="ID" />,
      accessor: "id",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="CÓDIGO" />,
      accessor: "code",
      Cell: ({ value }) => <Cell text={value.toUpperCase()} />,
    },
    {
      Header: () => <Header texto="NOMBRE" />,
      accessor: "name",
      Cell: ({ value }) => <Cell text={value.toUpperCase()} />,
    },
  ];
  return (
    <PageContainer>
      <Title title="Listado de Unidades" />
      <Table
        data={data}
        columnsData={columns}
        setCurrentPage={setCurrentPage}
        limMax={paginacion}
        currentPage={currentPage}
      />
    </PageContainer>
  );
};
