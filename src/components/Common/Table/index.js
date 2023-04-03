import React, { useState, useEffect, useMemo } from "react";
import { useSortBy, useTable, useRowSelect, usePagination } from "react-table";
import cx from "classnames";
import { CheckBox } from "../../Common";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import styles from "./table.module.scss";

const Table = ({ columns, data, isSelected, firstButton, secondButton }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

    // // 체크된 아이템을 담을 배열
    // const [checkItems, setCheckItems] = useState([]);

    // // 체크박스 단일 선택
    // const handleSingleCheck = (checked, nickname) => {
    //   if (checked) {
    //     // 단일 선택 시 체크된 아이템을 배열에 추가
    //     setCheckItems(prev => [...prev, nickname]);
    //   } else {
    //     // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
    //     setCheckItems(checkItems.filter((el) => el !== nickname));
    //   }
    // };
  
    // // 체크박스 전체 선택
    // const handleAllCheck = (checked) => {
    //   if(checked) {
    //     // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
    //     const idArray = [];
    //     data.forEach((el) => idArray.push(el.id));
    //     setCheckItems(idArray);
    //   }
    //   else {
    //     // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
    //     setCheckItems([]);
    //   }
    // }

  const rowsPerPage = rows.slice(0, 7);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className={styles.headTrStyle}
            {...headerGroup.getHeaderGroupProps()}
          >
            <CheckBox />
            {headerGroup.headers.map((column) => (
              <th
                className={styles.thStyle}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <span className={styles.sortStyle}>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TiArrowSortedUp />
                    ) : (
                      <TiArrowSortedDown />
                    )
                  ) : (
                    <TiArrowUnsorted />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rowsPerPage.map((row) => {
          prepareRow(row);
          return (
            <tr
              className={cx(styles.bodyTrStyle, {
                [styles.isSelected]: isSelected,
              })}
              {...row.getRowProps()}
            >
              <CheckBox />
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
              {firstButton}
              {secondButton}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
