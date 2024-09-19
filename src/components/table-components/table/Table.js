import React from "react";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";

function Table(props) {
  return (
    <div>
      <table {...props.getTableProps()} className="table-width">
        <thead>
          {props.headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  style={{ textAlign: "left", padding: '5px' }}
                  key={index}
                  {...column.getHeaderProps()}
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    <span className="sortIcon">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <HiOutlineArrowNarrowDown />
                        ) : (
                          <HiOutlineArrowNarrowUp />
                        )
                      ) : (
                        " "
                      )}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...props.getTableBodyProps()}>
          {props.page.map((row, index) => {
            props.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td style={{ textAlign: "left" }} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
