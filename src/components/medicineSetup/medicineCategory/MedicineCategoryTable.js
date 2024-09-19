import SearchOptions from "../../table-components/search-options/SearchOptions";
import React, { useEffect, useMemo } from "react";
import "../../table-components/table/tableStyle.scss";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import { ColumnFilter } from "../../table-components/column-filter/ColumnFilter";
import { TiEdit } from "react-icons/ti";
import { Chip } from "@mui/material";
import Table from "../../table-components/table/Table";
import Pagination from "../../table-components/pagination/Pagination";
import useFetch from "../../../hooks/useFetch";
import { PuffLoader } from "react-spinners";

function MedicineCategoryTable({ setData, reload }) {
	function handleEdit(rowData) {
		setData(rowData);
	}

	const COLUMNS = [
		{
			Header: "SL.No",
			Cell: (row) => {
				return <div>{Number(row.row.id) + 1}</div>;
			},
			Filter: false,
		},
		{
			Header: "Category Name",
			accessor: "categoryName",
			Filter: ColumnFilter,
		},
		{
			Header: "Category Short Name",
			accessor: "shortName",
			Filter: ColumnFilter,
		},
		{
			Header: "Description",
			accessor: "description",
			Filter: ColumnFilter,
		},
		{
			Header: "Active Status",
			accessor: "activeStatus",
			Filter: false,
			disableSortBy: true,
			Cell: (e) => (
				<>
					{e.value === 1 ? (
						<Chip size="small" label="Active" color="success" />
					) : (
						<Chip size="small" label="Inactive" color="error" />
					)}
				</>
			),
		},
		{
			Header: "Edit",
			accessor: "edit",
			Filter: false,
			disableSortBy: true,
			Cell: (row) => (
				<button
					className="action-button"
					onClick={() => handleEdit(row.row.original)}
				>
					<TiEdit className="action-icon" />
				</button>
			),
		},
	];

	const [category, isLoading, , refetch] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/category`
	);

	useEffect(() => {
		refetch();
	}, [reload]);

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => category, [category]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canPreviousPage,
		canNextPage,
		prepareRow,
		gotoPage,
		pageCount,
		setPageSize,
		state,
		setGlobalFilter,
	} = useTable(
		{ columns, data },
		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);
	const { globalFilter } = state;
	const { pageIndex, pageSize } = state;

	return (
		<>
			{isLoading ? (
				<div className="loader-container">
					<PuffLoader size="100px" />
				</div>
			) : (
				<div>
					<SearchOptions
						pageSize={pageSize}
						setPageSize={setPageSize}
						data={data}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
						setData={setData}
					/>

					<div className="table-container">
						<Table
							getTableProps={getTableProps}
							headerGroups={headerGroups}
							getTableBodyProps={getTableBodyProps}
							page={page}
							prepareRow={prepareRow}
						/>
					</div>

					<Pagination
						page={page}
						data={data}
						pageIndex={pageIndex}
						gotoPage={gotoPage}
						canPreviousPage={canPreviousPage}
						previousPage={previousPage}
						nextPage={nextPage}
						canNextPage={canNextPage}
						pageCount={pageCount}
					/>
				</div>
			)}
		</>
	);
}

export default MedicineCategoryTable;
