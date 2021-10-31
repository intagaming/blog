/* eslint-disable */
import React from "react";
import usePostsQuery, {
  GetPostsEntry,
} from "../../../hooks/supabase/usePostsQuery";
import { Column, useSortBy, useTable } from "react-table";

const columns: Column<GetPostsEntry>[] = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "title",
    accessor: "title",
  },
  {
    Header: "slug",
    accessor: "slug",
  },
  {
    Header: "cover",
    accessor: "cover",
  },
];

const DashboardPosts = (): JSX.Element => {
  const { data } = usePostsQuery();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<GetPostsEntry>(
      {
        columns,
        data: data ?? [],
      },
      useSortBy
    );

  return (
    <div>
      <h2>Posts</h2>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPosts;
