import React, { useState, useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import { IconName } from "react-icons/ti";
import styles from "./table.module.scss";

const Table = ({ className, type, isSelected, ...props }) => {
  
  const columns = useMemo(() => columnData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

  const rowsPerPage = rows.slice(0, 7);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TiArrowSortedDown color="white" />
                    ) : (
                      <TiArrowSortedUp color="white" />
                    )
                  ) : (
                    <TiArrowUnsorted color="white" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rowsPerPage.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
