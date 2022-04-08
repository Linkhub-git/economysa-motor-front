import React from "react";
import { PageContainer } from "../components/layout/pageContainer";
import { Title } from "../components/layout/Title";
import { Cell } from "../components/Table/Cell";
import { Header } from "../components/Table/Header";
import { Table } from "../components/Table/Table";

export const CategoriesPage = () => {
  const data = [
    {
      id: "760",
      padre: "Alimentos",
      nombre: "cereales",
    },
    {
      id: "761",
      padre: "Alimentos",
      nombre: "tomates",
    },
    {
      id: "763",
      padre: "Almuerzo",
      nombre: "conservas de pescado",
    },
    {
      id: "764",
      padre: "Almuerzo",
      nombre: "fideos cortos",
    },
    {
      id: "765",
      padre: "Almuerzo",
      nombre: "fideos cortos marco polo",
    },
    {
      id: "766",
      padre: "Almuerzo",
      nombre: "fideos largos",
    },
    {
      id: "767",
      padre: "Almuerzo",
      nombre: "fideos largos marco polo",
    },
    {
      id: "768",
      padre: "Almuerzo",
      nombre: "harinas",
    },
    {
      id: "769",
      padre: "Almuerzo",
      nombre: "salsas listas",
    },
    {
      id: "770",
      padre: "Almuerzo",
      nombre: "semola",
    },
  ];
  const columns = [
    {
      Header: () => <Header texto="ID" />,
      accessor: "id",
      Cell: ({ value }) => <Cell text={value.toUpperCase()} />,
    },
    {
      Header: () => <Header texto="PADRE" />,
      accessor: "padre",
      Cell: ({ value }) => <Cell text={value.toUpperCase()} />,
    },
    {
      Header: () => <Header texto="NOMBRE" />,
      accessor: "nombre",
      Cell: ({ value }) => <Cell text={value.toUpperCase()} />,
    },
  ];
  return (
    <PageContainer>
      <Title title="Listado de Categorías" />
      <Table data={data} columnsData={columns} />
    </PageContainer>
  );
};
