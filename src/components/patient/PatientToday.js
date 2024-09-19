import { Chip } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import React, { useEffect, useMemo } from "react";
import { TiEdit } from "react-icons/ti";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  handleAppointmentOpen,
  handleEditOpen,
  handleViewOpen,
  rowValue,
} from "../../Reducer/ModalSlice";
import AddModal from "../modal/AddModal";
import EditModal from "../modal/EditModal";
import PatientAddForm from "./PatientAddForm";
import Pagination from "../table-components/pagination/Pagination";
import Table from "../table-components/table/Table";
import PatientEdit from "./PatientEdit";
import PatientSearchOptions from "./PatientSearchOptions";
import ViewModal from "../modal/ViewModal";
import PatientAdditionalInfo from "./PatientAdditionalInfo";
import { PuffLoader } from "react-spinners";
import { BiCalendarEdit } from "react-icons/bi";
import AppointmentModal from "../modal/AppointmentModal";
import AppointmentEditForm from "./AppointmentEditForm";

function PatientToday() {
  const dispatch = useDispatch();

  function handleEdit(rowData) {
    dispatch(handleEditOpen());
    dispatch(rowValue(rowData));
    console.log(rowData);
  }

  function handleEditAppoint(rowData) {
    dispatch(handleAppointmentOpen());
    dispatch(rowValue(rowData));
    console.log(rowData);
  }

  const showHistory = (rowData) => {
    dispatch(rowValue(rowData));
    dispatch(handleViewOpen());
    console.log(rowData);
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
      Filter: false,
      Cell: (row) => (
        <> {row.row.original.appointmentDate?.toString().slice(0, 10)} </>
      ),
    },
    {
      Header: "Mobile No",
      accessor: "phone",
      Filter: false,
    },
    {
      Header: "Active Status",
      accessor: "active_status",
      Filter: false,
      disableSortBy: true,
      Cell: (row) => (
        <>
          {row.row.original.activeStatus === 1 ? (
            <Chip size="small" label="Active" color="success" />
          ) : (
            <Chip size="small" label="Inactive" color="error" />
          )}
        </>
      ),
    },
    {
      Header: "Info",
      accessor: "information",
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
      Header: "Edit Info",
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
    {
      Header: "Edit Appoint.",
      accessor: "appointment",
      Filter: false,
      disableSortBy: true,
      Cell: (row) => (
        <button
          className="action-button"
          onClick={() => handleEditAppoint(row.row.original)}
        >
          <BiCalendarEdit className="action-icon" />
        </button>
      ),
    },
  ];

  const [patientInfo, loading, error, refetch] = useFetch(
    `${process.env.REACT_APP_API_URL}/api/patientInfo/getAllPatientsByCurrentDate`
  );

  console.log(patientInfo);
  const patientData = patientInfo.filter(
    (patient) => patient?.patientAppoinInfo.length > 0
  );

  console.log(patientData);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => patientData, [patientInfo]);

  const add = useSelector((state) => state.Modal.add);
  const edit = useSelector((state) => state.Modal.edit);

  useEffect(() => {
    if (!add) refetch();
  }, [add]);
  useEffect(() => {
    if (!edit) refetch();
  }, [edit]);

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
  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <PuffLoader size="100px" />
        </div>
      ) : (
        <div>
          <PatientSearchOptions
            pageSize={pageSize}
            setPageSize={setPageSize}
            data={data}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
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
          <div >
            <AddModal ModalWidth="md" ModalTitle="Add Patient Information">
              <PatientAddForm />
            </AddModal>
          </div>
          <div>
            <EditModal ModalWidth="md" ModalTitle="Edit Patient Information">
              <PatientEdit />
            </EditModal>
          </div>
          <div>
            <ViewModal ModalTitle="Patient Information">
              <PatientAdditionalInfo />
            </ViewModal>
          </div>
          <div>
            <AppointmentModal
              ModalWidth="sm"
              ModalTitle="Edit Appointment Date"
            >
              <AppointmentEditForm />
            </AppointmentModal>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientToday;
