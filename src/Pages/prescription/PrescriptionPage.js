import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AddModal from "../../components/modal/AddModal";
import Header from "../../components/prescription/header/Header";
import Complaints from "../../components/prescription/complaints/Complaints";
import OnExamination from "../../components/prescription/on-examination/OnExamination.js";
import Diagnosis from "../../components/prescription/diagnosis/Diagnosis";
import Investigation from "../../components/prescription/investigation/Investigation";
import Rx from "../../components/prescription/rx/Rx";
import Advices from "../../components/prescription/advices/Advices";
import FollowUp from "../../components/prescription/followup/FollowUp";
import PatientInfo from "../../components/prescription/patient-info/PatientInfo";
import EmptySpace from "../../Layout/empty-space/EmptySpace";
import Footer from "../../components/prescription/footer/Footer";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleAddOpen, handleEditOpen } from "../../Reducer/ModalSlice";
import Layout from "../../components/prescription/layout-settings/Layout";
import EditModal from "../../components/modal/EditModal";
import Preview from "../../components/preview/Preview";
import AppointedPatientModal from "../../components/prescription/appointed-patients/AppointedPatientModal";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import SystemicExamination from "../../components/prescription/systemic-examination/SystemicExamination.js";
import CoMorbidities from "../../components/prescription/co-morbidities/CoMorbidities.js";

function PrescriptionPage() {
  const [submitError, setSubmitError] = useState(false);
  const [selectPatientPreview, setSelectPatientPreview] = useState(false);
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("selectedFields")) || {
      header: true,
      patientInfo: true,
      complaints: true,
      examination: true,
      medicines: true,
    }
  );
  const dispatch = useDispatch();
  const preselected = useSelector((state) => state.Prescription.medicine);
  const [selectedMedicines, setSelectedMedicines] = useState(preselected || []);
  const data = useSelector((state) => state.Prescription);
  // console.log(data);

  useEffect(() => {
    if (data.patientInfo.id && data?.medicine?.length > 0) {
      setSelectPatientPreview(true);
    } else {
      setSelectPatientPreview(false);
    }
  }, [data]);

  useEffect(() => {
    if (data.patientInfo.id && selectedMedicines.length > 0) {
      setSelectPatientPreview(true);
    } else {
      setSelectPatientPreview(false);
    }
  }, [selectedMedicines, data.patientInfo.id]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectPatientPreview) {
      setSubmitError(true);
    } else {
      setLoading(true);
      var complaintArray = [];
      var examinationArray = [];
      var diagnosisArray = [];
      var investigationArray = [];
      var adviceArray = [];
      var medicineArray = [];

      if (data.complaints?.length > 0) {
        complaintArray = data.complaints.map((complaint) => ({
          complainId: complaint.value,
        }));
      }

      if (data.examination?.length > 0) {
        examinationArray = data.examination.map((examination) => ({
          examinationId: examination.value,
        }));
      }

      if (data.diagnosis?.length > 0) {
        diagnosisArray = data.diagnosis.map((diagnosis) => ({
          diagnosisId: diagnosis.value,
        }));
      }

      if (data.investigation?.length > 0) {
        investigationArray = data.investigation.map((investigation) => ({
          investigationId: investigation.value,
        }));
      }

      if (data.advice?.length > 0) {
        adviceArray = data.advice.map((advice) => ({
          adviceId: advice.value,
        }));
      }

      if (data.medicine?.length > 0) {
        medicineArray = data.medicine.map((medicine) => ({
          medicineId: medicine.medicine.id,
          doses:
            medicine.morning +
            "+" +
            medicine.noon +
            "+" +
            medicine.evening +
            "+" +
            medicine.night,
          isContinue: medicine.continue ? false : true,
          duration:
            medicine.continue === "yes" ? "0" : medicine.duration.toString(),
          remarks: medicine.remarks,
        }));
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/rx`,
          {
            patientId: data.patientInfo.id,
            rxDate: new Date().toISOString().slice(0, 10),
            followUp: data.followUp ? Number(data.followUp) : 0,
            chiefComplaintsList: complaintArray,
            examinationList: examinationArray,
            diagnosisList: diagnosisArray,
            rxInvestigationList: investigationArray,
            rxAdviceList: adviceArray,
            medicineList: medicineArray,
          }
        );
        console.log(response);
        // setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/rx/statusChange/${data.patientInfo.id}`
        );
        console.log(response);
        setLoading(false);
        window.scroll(0, 0);
        window.print();
        // window.location.reload();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (submitError) {
      timer = setTimeout(() => setSubmitError(false), 3000); // Hide after 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [submitError]);

  console.log(selected.patientInfo);
  return (
    <div>
      <Box className="sidebar-close pres" position="relative">
        <EmptySpace />
        <Box
          margin="0 10px 10px"
          border="1px solid black"
          borderRadius="8px"
          sx={{ minHeight: "calc(100vh - 100px)" }}
        >
          <Button
            variant="contained"
            sx={{ position: "absolute", right: "20px", top: "60px" }}
            onClick={() => dispatch(handleAddOpen())}
          >
            Layout
          </Button>
          <Button
            variant="contained"
            sx={{ position: "absolute", right: "20px", top: "120px" }}
            onClick={() => dispatch(handleEditOpen())}
          >
            Appointed Patients
          </Button>
          {loading ? (
            <Button
              variant="contained"
              color="info"
              sx={{
                position: "fixed",
                right: "20px",
                bottom: "20px",
                zIndex: "10",
                minHeight: "36px",
              }}
            >
              {<BeatLoader color="white" />}
            </Button>
          ) : (
            <Button
              variant="contained"
              // color="info"
              sx={{
                position: "fixed",
                right: "20px",
                bottom: "20px",
                zIndex: "10",
                backgroundColor: "#4A934A",
              }}
              onClick={handleSubmit}
            >
              Preview
            </Button>
          )}
          {selected.header ? <Header /> : <></>}

          {/* working on this - miraz   */}
          {selected.patientInfo ? <PatientInfo /> : <></>}
          <Box
            display="grid"
            gridTemplateColumns="1fr 2fr"
            gap="1px"
            sx={{ backgroundColor: "black" }}
            minHeight="30vh"
          >
            <Box sx={{ backgroundColor: "white" }} padding="10px">
              {selected.complaints ? <Complaints /> : <></>}
              {/* {selected.examination ? <Examination /> : <></>} */}
              {selected.examination ? <OnExamination /> : <></>}
              {selected.diagnosis ? <Diagnosis /> : <></>}
              {selected.complaints ? <SystemicExamination /> : <></>}
              {selected.complaints ? <CoMorbidities /> : <></>}
              {selected.investigation ? <Investigation /> : <></>}
            </Box>
            <Box sx={{ backgroundColor: "white" }} padding="10px">
              {selected.medicines ? (
                <Rx
                  selectedMedicines={selectedMedicines}
                  setSelectedMedicines={setSelectedMedicines}
                  preselected={preselected}
                />
              ) : (
                <></>
              )}
              {selected.advices ? <Advices /> : <></>}
              {selected.followUp ? <FollowUp /> : <></>}
            </Box>
          </Box>
          <Box>{selected.footer ? <Footer /> : <></>}</Box>
        </Box>
        <AddModal ModalTitle="Layout">
          <Layout selected={selected} setSelected={setSelected} />
        </AddModal>

        <EditModal ModalTitle="Appointed Patients" ModalWidth="lg">
          {/* <AppointedPatients /> */}
          <AppointedPatientModal />
        </EditModal>
      </Box>
      <Preview selectedMedicines={selectedMedicines} />
      {submitError && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "110px",
            zIndex: "999",
            background: "red",
            color: "white",
            padding: "1rem",
            opacity: submitError ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          Select at Least 1 patient and 1 Medicine
        </div>
      )}
    </div>
  );
}

export default PrescriptionPage;
