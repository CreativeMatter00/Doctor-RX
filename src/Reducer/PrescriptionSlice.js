import { createSlice } from "@reduxjs/toolkit";

export const PrescriptionSlice = createSlice({
  name: "Prescription",
  initialState: {
    complaints: [],
    examination: [],
    diagnosis: [],
    investigation: [],
    medicine: [],
    advice: [],
    followUp: "",
    patientInfo: {
      id: null,
      name: "",
      age: "",
      gender: "",
      phone: "",
      appointmentDate: "",
    },
  },
  reducers: {
    handleComplaints: (state, action) => {
      state.complaints = action.payload;
    },
    handleExamination: (state, action) => {
      state.examination = action.payload;
    },
    handleDiagnosis: (state, action) => {
      state.diagnosis = action.payload;
    },
    handleInvestigation: (state, action) => {
      state.investigation = action.payload;
    },
    handleMedicine: (state, action) => {
      state.medicine = action.payload;
    },
    handleAdvice: (state, action) => {
      state.advice = action.payload;
    },
    handleFollowUp: (state, action) => {
      state.followUp = action.payload;
    },
    handlePatientInfo: (state, action) => {
      state.patientInfo.id = action?.payload?.id;
      state.patientInfo.name = action?.payload?.name;
      state.patientInfo.age = action?.payload?.age;
      state.patientInfo.gender = action?.payload?.gender;
      state.patientInfo.phone = action?.payload?.phone;
    },
    handleOldPatientInfo: (state, action) => {
      state.patientInfo.id = action?.payload?.patientsInfos?.id;
      state.patientInfo.name = action?.payload?.patientsInfos?.name;
      state.patientInfo.age = action?.payload?.patientsInfos?.age;
      state.patientInfo.gender = action.payload?.patientsInfos?.gender;
      state.patientInfo.phone = action?.payload?.patientsInfos?.phone;
    },
  },
});

export const {
  handleComplaints,
  handleExamination,
  handleDiagnosis,
  handleInvestigation,
  handleMedicine,
  handleAdvice,
  handleFollowUp,
  handlePatientInfo,
  handleOldPatientInfo,
} = PrescriptionSlice.actions;

export default PrescriptionSlice.reducer;
