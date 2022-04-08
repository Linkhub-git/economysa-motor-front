import React from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { PageContainer } from "../components/layout/pageContainer";
import { Title } from "../components/layout/Title";
import { ActionCell } from "../components/Table/ActionCell";
import { Cell } from "../components/Table/Cell";
import { Header } from "../components/Table/Header";
import { Table } from "../components/Table/Table";

export const SecurityPage = () => {
  const data = [
    {
      nombre: "Jeferson Cieza",
      correo: "jcieza90@gmail.com",
      roles: "admin",
      telefono: "983552193",
      fecha_creacion: "20-08-2020 12:07:50",
      acciones: "editar",
    },
    {
      nombre: "Jose Urbano",
      correo: "jurbano@gmail.com",
      roles: "editor",
      telefono: "983552193",
      fecha_creacion: "07-03-2022 14:54:34",
      acciones: "editar",
    },
    {
      nombre: "Juan Cieza",
      correo: "jcieza91@gmail.com",
      roles: "admin",
      telefono: "983552193",
      fecha_creacion: "20-08-2020 12:07:50",
      acciones: "editar",
    },
    {
      nombre: "Luz Sanchez",
      correo: "luz02m@gmail.com",
      roles: "admin",
      telefono: "983552193",
      fecha_creacion: "20-08-2020 12:07:50",
      acciones: "editar",
    },
  ];
  const columns = [
    {
      Header: () => <Header texto="Nombre" />,
      accessor: "nombre",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Correo" />,
      accessor: "correo",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Roles" />,
      accessor: "roles",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Teléfono" />,
      accessor: "telefono",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Fecha Creación" />,
      accessor: "fecha_creacion",
      Cell: ({ value }) => <Cell text={value} />,
    },
    {
      Header: () => <Header texto="Acciones" />,
      accessor: "acciones",
      Cell: ({ value }) => <ActionCell editar={value} />,
    },
  ];

  return (
    <PageContainer>
      <Title title="Listado de Usuarios" />
      <div className="bg-gray-200 px-3 py-2 mt-4 rounded flex-col w-full items-center justify-between">
        <button
          type="button"
          aria-controls="dropdown-example4"
          className="font-semibold text-md flex items-center w-full justify-between"
          data-collapse-toggle="dropdown-example4"
        >
          Filtros de Búsqueda <FaPlus />
        </button>
      </div>
      <ul
        id="dropdown-example4"
        className="hidden py-2 px-3 space-y-2 bg-white"
      >
        <li className="flex items-center">
          <FaUser className="mr-3" />
          Usuario 1
        </li>
        <li className="flex items-center">
          <FaUser className="mr-3" />
          Usuario 2
        </li>
        <hr />
        <li className="text-sm text-gray-500">4 registro(s) encontrados</li>
      </ul>
      <Table
        button={
          <button className="rounded text-white px-2 py-1 flex bg-sky-900 items-center">
            <FaPlus className="mr-2" />
            Nuevo
          </button>
        }
        data={data}
        columnsData={columns}
      />
    </PageContainer>
  );
};
