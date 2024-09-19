import { createBrowserRouter } from "react-router-dom";
import HeaderFooterNavbar from "../Layout/header-footer-navbar/HeaderFooterNavbar";
import Main from "../Layout/main/Main";
import MedicineNavbar from "../Layout/medicineNavbar/MedicineNavbar";
import SetupNavbar from "../Layout/setup-navbar/SetupNavbar";
import Dashboardpage from "../Pages/Dashboard/Dashboardpage";
import Errorpage from "../Pages/error/ErrorPage";
import Footer from "../Pages/header-footer/Footer";
import Header from "../Pages/header-footer/Header";
import LoginPage from "../Pages/login/LoginPage";
import PatientPage from "../Pages/patientPage/PatientPage";
import PrescriptionPage from "../Pages/prescription/PrescriptionPage";
import PreviewPage from "../Pages/previewPage/PreviewPage";
import AdvicePage from "../Pages/setup/AdvicePage";
import ComplaintsPage from "../Pages/setup/ComplaintsPage";
import DiagnosisPage from "../Pages/setup/DiagnosisPage";
import ExaminationPage from "../Pages/setup/ExaminationPage";
import InvestigationPage from "../Pages/setup/InvestigationPage";
// import MedicineGenericPage from "../Pages/medicineSetup/MedicineGenericPage";
// import MedicinePage from "../Pages/medicineSetup/MedicinePage";
// import MedicineCategoryPage from "../Pages/medicineSetup/MedicineCategoryPage";
// import ManufacturerPage from "../Pages/medicineSetup/ManufacturerPage";
import DoctorRoute from "./DoctorRoute";
// import AdminRoute from "./AdminRoute";
import AccessDenied from "../Pages/error/AccessDenied";
import AppointedPatientPage from "../Pages/appointedPatientPage/AppointedPatientPage";

const router = createBrowserRouter(
  [
    {
      element: (
        <DoctorRoute>
          <Main />
        </DoctorRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashboardpage />,
        },
        // {
        // 	path: "patient-info",
        // 	element: <PatientPage />,
        // },
        {
          path: "appointed-patients",
          element: <AppointedPatientPage />,
        },
        {
          path: "prescription",
          element: <PrescriptionPage />,
        },
      ],
    },
    {
      path: "/setup/",
      element: (
        <DoctorRoute>
          <Main>
            <SetupNavbar />
          </Main>
        </DoctorRoute>
      ),
      children: [
        {
          path: "complaints",
          element: <ComplaintsPage />,
        },
        {
          path: "examination",
          element: <ExaminationPage />,
        },
        {
          path: "diagnosis",
          element: <DiagnosisPage />,
        },
        {
          path: "investigation",
          element: <InvestigationPage />,
        },
        {
          path: "advice",
          element: <AdvicePage />,
        },
      ],
    },
    {
      path: "/doctor-info",
      element: (
        <DoctorRoute>
          <Main>
            <HeaderFooterNavbar />
          </Main>
        </DoctorRoute>
      ),
      children: [
        {
          path: "header",
          element: <Header />,
        },
        {
          path: "footer",
          element: <Footer />,
        },
      ],
    },
    // {
    // 	path: "/medicine-setup",
    // 	element: (
    // 		<AdminRoute>
    // 			<Main>
    // 				<MedicineNavbar />
    // 			</Main>
    // 		</AdminRoute>
    // 	),
    // 	children: [
    // 		{
    // 			path: "/medicine-setup/medicine-category",
    // 			element: <MedicineCategoryPage />,
    // 		},
    // 		{
    // 			path: "medicine",
    // 			element: <MedicinePage />,
    // 		},
    // 		{
    // 			path: "medicine-generic",
    // 			element: <MedicineGenericPage />,
    // 		},
    // 		{
    // 			path: "manufacturer",
    // 			element: <ManufacturerPage />,
    // 		},
    // 	],
    // },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/preview",
      element: <PreviewPage />,
    },
    {
      path: "*",
      element: <Errorpage />,
    },
    {
      path: "access-denied",
      element: <AccessDenied />,
    },
  ]
  // {
  // 	basename: `/${process.env.REACT_APP_BASENAME}`,
  // }
);

export default router;
