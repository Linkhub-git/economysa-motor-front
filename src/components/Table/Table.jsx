import React from "react";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { useTable } from "react-table";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

export const Table = ({ columnsData, data, button }) => {
  //Memorizamos las columnas
  const columns = React.useMemo(() => columnsData, [columnsData]);
  //Usamos el hook de react-table que nos permitirá construir la data necesaria
  const tableInstance = useTable({ columns, data });
  //Desestructuramos las propiedades que usaremos
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
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
        <button className="bg-white text-gray-700 p-2 border-1 ">
          <FaStepBackward />
        </button>
        <button className="bg-white text-gray-700 p-2 border-1 ">
          <BsCaretLeftFill />
        </button>
        <button className="h-full text-gray-700 px-3">
          <p className="inline-block">1</p>
        </button>
        <button className="bg-white text-gray-700 p-2 border-1 ">
          <BsCaretRightFill />
        </button>
        <button className="bg-white text-gray-700 p-2 border-1 ">
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};
