/* eslint-disable */
import React from "react";
import { Column, useSortBy, useTable } from "react-table";
import { useRouter } from "next/router";
import usePagesQuery, {
  GetPagesEntry,
} from "../../../../hooks/supabase/page/usePagesQuery";
import Link from "next/link";

const columns: Column<GetPagesEntry>[] = [
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
    Header: "published",
    accessor: "published_at",
    Cell: ({ value }) =>
      value ? new Date(value).toLocaleDateString() : "Unpublished",
  },
];

const DashboardPages = (): JSX.Element => {
  const { data, isLoading } = usePagesQuery();
  const router = useRouter();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<GetPagesEntry>(
      {
        columns,
        data: data ?? [],
      },
      useSortBy
    );

  const handleRowClick = (entry: GetPagesEntry) => {
    router.push(`/dashboard/pages/edit/${entry.id}`);
  };

  return (
    <div className="flex-1">
      <h2>Pages</h2>

      <Link href={"/dashboard/pages/write"}>
        <button className="bg-green-700 text-dark-white p-2">New Page</button>
      </Link>
      {isLoading && <p>Please wait...</p>}
      <table className="list-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="flex">
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "🔽 "
                          : "🔼 "
                        : ""}
                    </span>
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleRowClick(row.original)}
              >
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

export default DashboardPages;
