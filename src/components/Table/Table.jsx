import React from "react";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { useTable } from "react-table";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

export const Table = ({
  columnsData,
  data,
  button,
  setCurrentPage,
  limMax,
  currentPage,
}) => {
  //Memorizamos las columnas
  const columns = React.useMemo(() => columnsData, [columnsData]);
  //Usamos el hook de react-table que nos permitirá construir la data necesaria
  const tableInstance = useTable({ columns, data });
  //Desestructuramos las propiedades que usaremos
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  //Soporte para la paginación
  //Siguiente Pagina
  const handleNextPage = () => {
    if (currentPage < limMax) {
      setCurrentPage((st) => st + 1);
    }
  };
  //Pagina anterior
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((st) => st - 1);
    }
  };
  //Primera pagina
  const handleFirstPage = () => {
    setCurrentPage(0);
  };
  //Ultima pagina
  const handleLastPage = () => {
    setCurrentPage(limMax);
  };

  return (
    <div className="bg-gray-50 p-4 rounded border-gray-200 border-1 shadow-gray-200 shadow-md mt-5">
      {button}
      <table
        className="border-1 table border-gray-800 mt-4 w-full"
        {...getTableProps()}
      >
        <thead className="bg-gray-700">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center ">
        <button
          disabled={currentPage === 0}
          onClick={handleFirstPage}
          className="bg-white text-gray-700 p-2 border-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaStepBackward />
        </button>
        <button
          disabled={currentPage === 0}
          onClick={handlePrevPage}
          className="bg-white text-gray-700 p-2 border-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BsCaretLeftFill />
        </button>
        <button className="h-full text-gray-700 px-3">
          <p className="inline-block">{currentPage + 1}</p>
        </button>
        <button
          disabled={currentPage === limMax}
          onClick={handleNextPage}
          className="bg-white text-gray-700 p-2 border-1  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BsCaretRightFill />
        </button>
        <button
          disabled={currentPage === limMax}
          onClick={handleLastPage}
          className="bg-white text-gray-700 p-2 border-1  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};
