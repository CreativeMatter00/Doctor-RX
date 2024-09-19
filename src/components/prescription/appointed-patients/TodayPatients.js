import React, { useMemo, useState } from "react";
import "../../table-components/table/tableStyle.scss";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import { BiSelectMultiple } from "react-icons/bi";
import {
	BsFillEyeFill,
	BsCheckCircleFill,
	BsFillXCircleFill,
} from "react-icons/bs";
import { PuffLoader } from "react-spinners";
import useFetch from "../../../hooks/useFetch";
import Table from "../../table-components/table/Table";
import Pagination from "../../table-components/pagination/Pagination";
import "../../table-components/table/tableStyle.scss";
import { useDispatch } from "react-redux";
import { handlePatientInfo } from "../../../Reducer/PrescriptionSlice";
import {
	handleEditClose,
	handleViewOpen,
	rowValue,
} from "../../../Reducer/ModalSlice";
import ViewModal from "../../modal/ViewModal";
import PatientAdditionalInfo from "../../patient/PatientAdditionalInfo";
import { Box } from "@mui/material";
import { GlobalFilter } from "../../table-components/global-filter/GlobalFilter";
import { useQuery } from "@tanstack/react-query";

function TodayPatients() {
	const dispatch = useDispatch();

	function handleSelect(rowData) {
		dispatch(handlePatientInfo(rowData));
		dispatch(handleEditClose());
	}

	const showHistory = (rowData) => {
		dispatch(rowValue(rowData));
		dispatch(handleViewOpen());
	};

	const COLUMNS = [
		{
			Header: "Patient ID",
			accessor: "patientId",
			Filter: false,
		},
		{
			Header: "Patient Name",
			accessor: "name",
			Filter: false,
		},
		{
			Header: "Age",
			accessor: "age",
			Filter: false,
		},
		{
			Header: "Gender",
			accessor: "gender",
			Filter: false,
		},
		{
			Header: "Appointment Date",
			// accessor: "appointmentDate",
			Cell: (row) => (
				<> {row.row.original.appointmentDate?.toString().slice(0, 10)} </>
			),
			Filter: false,
		},
		// {
		//   Header: "Blood Group",
		//   accessor: "blood",
		//   Filter: false,
		// },
		{
			Header: "Mobile No",
			accessor: "phone",
			Filter: false,
		},
		{
			Header: "Already Visited",
			accessor: "visited",
			Filter: false,
			disableSortBy: true,
			Cell: (row) =>
				row.row.original.visitedStatus ? (
					<div className="visited-status">
						<BsCheckCircleFill size="20px" color="green" />
					</div>
				) : (
					<div className="visited-status">
						<BsFillXCircleFill size="20px" color="red" />
					</div>
				),
		},
		{
			Header: "History",
			accessor: "history",
			Filter: false,
			disableSortBy: true,
			Cell: (row) => (
				<button
					className="history-button"
					onClick={() => showHistory(row.row.original)}
				>
					<BsFillEyeFill className="action-icon" />
				</button>
			),
		},
		{
			Header: "Select",
			accessor: "select",
			Filter: false,
			disableSortBy: true,
			Cell: (row) => (
				<button
					className="action-button"
					onClick={() => handleSelect(row.row.original)}
				>
					<BiSelectMultiple className="action-icon" />
				</button>
			),
		},
	];

	// const [patientList, isLoading] = useFetch(
	// 	`${process.env.REACT_APP_API_URL}/api/patientInfo/getAllPatientsByCurrentDate`
	// );

	const { isLoading, data: patientList = [] } = useQuery({
		queryKey: ["todayPatientList"],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/api/patientInfo/getAllPatientsByCurrentDate`
			);
			const patientData = await res.json();
			const data = await patientData.result;
			return data;
		},
	});

	const patientData = patientList.filter(
		(patient) => patient?.patientAppoinInfo.length > 0
	);

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => patientData, [patientList]);

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
		{
			columns,
			data,
			initialState: {
				sortBy: [
					{
						id: "patientId",
						desc: true,
					},
				],
			},
		},
		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);

	const { pageIndex, globalFilter } = state;

	return (
		<>
			{isLoading ? (
				<div className="loader-container">
					<PuffLoader size="100px" />
				</div>
			) : (
				<div>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						marginBottom="10px"
					>
						<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					</Box>
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
					<ViewModal ModalTitle="History">
						<PatientAdditionalInfo />
					</ViewModal>
				</div>
			)}
		</>
	);
}

export default TodayPatients;
