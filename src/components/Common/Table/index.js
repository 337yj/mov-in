import cx from "classnames";
import React, { useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";
import { CheckBox } from "../../Common";
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
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (id) => {
    return () => {
      //NOTE: checkItems에 id가 있는지 확인
      if (!checkItems.includes(id)) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems((prev) => [...prev, id]);
      } else {
        // 단일 선택 해제 시 체크된 아이템을 제외하고 배열 추가
        setCheckItems(checkItems.filter((el) => el !== id));
      }
    };
  };

  // 체크박스 전체 선택
  //NOTE: 전체 선택 => checkItems에 모든 id를 담거나 / 모든 id를 빼거나
  const handleAllCheck = () => {
    if (checkItems.length !== data.length) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      setCheckItems(data.map((item) => item.id));
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const rowsPerPage = rows.slice(0, 10);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className={styles.headTrStyle}
            {...headerGroup.getHeaderGroupProps()}
          >
            <td>
              <CheckBox
                onChange={handleAllCheck}
                checked={checkItems.length === data.length ? true : false}
              />
            </td>

            {headerGroup.headers.map((column) => (
              <th
                className={styles.thStyle}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <span className={styles.sortStyle}>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )
                  ) : (
                    <FaSort />
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
              <td>
                <CheckBox
                  checked={checkItems.includes(row.original.id)}
                  onClick={handleSingleCheck(row.original.id)}
                />
              </td>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.row.original[cell.column.id]}
                  </td>
                );
              })}
              {/* //TODO: 테이블을 사용하는 다른 페이지에서도 firstButton을 함수로 바꿔야한다. */}
              <td>
                {firstButton(row.original.id)}
              </td>
              <td>{secondButton}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
