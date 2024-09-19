import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { PuffLoader } from "react-spinners";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  handleEditClose,
  handleViewOpen,
  rowValue,
} from "../../../Reducer/ModalSlice";
import {
  handleAdvice,
  handleComplaints,
  handleDiagnosis,
  handleExamination,
  handleFollowUp,
  handleInvestigation,
  handleMedicine,
  handleOldPatientInfo,
} from "../../../Reducer/PrescriptionSlice";
import ViewModal from "../../modal/ViewModal";
import PatientAdditionalInfo from "../../patient/PatientAdditionalInfo";
import { GlobalFilter } from "../../table-components/global-filter/GlobalFilter";
import Pagination from "../../table-components/pagination/Pagination";
import Table from "../../table-components/table/Table";
import "../../table-components/table/tableStyle.scss";

function OldPatients() {
  const dispatch = useDispatch();

  // function handleSelect(rowData) {
  // 	dispatch(handlePatientInfo(rowData));
  // 	dispatch(handleEditClose());
  // }

  const showHistory = (rowData) => {
    const patientInfo = rowData.patientsInfos;
    console.log(patientInfo);
    dispatch(rowValue(patientInfo));
    dispatch(handleViewOpen());
  };

  const handlePres = (rowData) => {
    // if (handleOldPatientInfo(rowData.patientId) === "null") {
    //   alert("User Data is Partially Deleted");
    // }
    console.log();
    dispatch(handleOldPatientInfo(rowData));

    const selectedComplaints = rowData?.rxComplaints?.map((complaint) => {
      return {
        value: complaint?.chiefComplaints?.id,
        name: complaint?.chiefComplaints?.name,
        checked: true,
      };
    });
    dispatch(handleComplaints(selectedComplaints));

    const selectedExaminations = rowData?.rxExaminations?.map((examination) => {
      return {
        value: examination.examinationId,
        name: examination.onExamination.name,
        checked: true,
      };
    });
    dispatch(handleExamination(selectedExaminations));

    const selectedDiagnosis = rowData.rxDiagnosis.map((diagnosis) => {
      return {
        value: diagnosis.diagnosis.id,
        name: diagnosis.diagnosis.name,
        checked: true,
      };
    });
    dispatch(handleDiagnosis(selectedDiagnosis));

    const selectedInvestigation = rowData.rxInvestigation.map(
      (investigation) => {
        return {
          value: investigation.investigations.id,
          name: investigation.investigations.name,
          checked: true,
        };
      }
    );
    dispatch(handleInvestigation(selectedInvestigation));

    const selectedMedicine = rowData.rxMedicine.map((medicine) => {
      return {
        medicine: medicine.medicine,
        morning: Number(medicine.doses[0]),
        noon: Number(medicine.doses[2]),
        evening: Number(medicine.doses[4]),
        night: Number(medicine.doses[6]),
        continue: medicine.isContinue ? "yes" : "no",
        duration: Number(medicine.duration),
        remarks: medicine.remarks,
      };
    });
    dispatch(handleMedicine(selectedMedicine));

    const selectedAdvices = rowData.rxAdvice.map((advice) => {
      return {
        value: advice.advice.id,
        name: advice.advice.name,
        checked: true,
      };
    });
    dispatch(handleAdvice(selectedAdvices));

    const selectedFollowUp = rowData.followUp;
    dispatch(handleFollowUp(selectedFollowUp));

    dispatch(handleEditClose());
  };

  const COLUMNS = [
    {
      Header: "Patient ID",
      accessor: "patientsInfos.patientId",
      Filter: false,
    },
    {
      Header: "Patient Name",
      accessor: "patientsInfos.name",
      Filter: false,
    },
    {
      Header: "Age",
      accessor: "patientsInfos.age",
      Filter: false,
    },
    {
      Header: "Gender",
      accessor: "patientsInfos.gender",
      Filter: false,
    },
    {
      Header: "Visit Date",
      // accessor: "appointmentDate",
      Cell: (row) => (
        <> {row.row.original.createdAt?.toString().slice(0, 10)} </>
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
      accessor: "patientsInfos.phone",
      Filter: false,
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
    // {
    // 	Header: "Select",
    // 	accessor: "select",
    // 	Filter: false,
    // 	disableSortBy: true,
    // 	Cell: (row) => (
    // 		<button
    // 			className="action-button"
    // 			onClick={() => handleSelect(row.row.original)}
    // 		>
    // 			<BiSelectMultiple className="action-icon" />
    // 		</button>
    // 	),
    // },
    {
      Header: "Update",
      accessor: "update",
      Filter: false,
      disableSortBy: true,
      Cell: (row) => (
        <button
          className="action-button"
          onClick={() => handlePres(row.row.original)}
        >
          <HiDocumentText className="action-icon" />
        </button>
      ),
    },
  ];
  // const [patientList, isLoading] = useFetch(
  // 	`${process.env.REACT_APP_API_URL}/api/patientInfo/getAlreadyAppointedPatients`
  // );

  const { isLoading, data: patientList = [] } = useQuery({
    queryKey: ["patientList"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/patientInfo/getAlreadyAppointedPatients`
      );
      const patientData = await res.json();
      const data = await patientData.result;
      return data;
    },
  });

  console.log(patientList);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => patientList, [patientList]);

  // if (isLoading) return <div>Loading...</div>;

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

  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <PuffLoader size="100px" />
        </div>
      ) : (
        <div>
          {/* <SearchOptions
                pageSize={pageSize}
                setPageSize={setPageSize}
                data={data}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                setData={setData}
              /> */}

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

export default OldPatients;
