/* eslint-disable */
import React from "react";
import usePostsQuery, {
  GetPostsEntry,
} from "../../../../hooks/supabase/post/usePostsQuery";
import { Column, useSortBy, useTable } from "react-table";
import { useRouter } from "next/router";
import Image from "next/image";
import { getObjectUrl } from "../../../../utils/supabase";
import Link from "next/link";

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
    Cell: ({ value }) => (
      <div className="relative aspect-h-9 aspect-w-16 bg-white">
        <Image src={getObjectUrl(value)} alt="" layout="fill" />
      </div>
    ),
  },
  {
    Header: "published",
    accessor: "published_at",
    Cell: ({ value }) =>
      value ? new Date(value).toLocaleDateString() : "Unpublished",
  },
];

const DashboardPosts = (): JSX.Element => {
  const { data, isLoading } = usePostsQuery();
  const router = useRouter();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<GetPostsEntry>(
      {
        columns,
        data: data ?? [],
      },
      useSortBy
    );

  const handleRowClick = (entry: GetPostsEntry) => {
    router.push(`/dashboard/posts/edit/${entry.id}`);
  };

  return (
    <div className="flex-1">
      <h2>Posts</h2>

      <Link href={"/dashboard/posts/write"}>
        <button className="bg-green-700 text-dark-white p-2">New Post</button>
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
                          ? "???? "
                          : "???? "
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

export default DashboardPosts;
