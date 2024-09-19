import { configureStore } from "@reduxjs/toolkit";
import navSidebarReducer from "../Reducer/NavSidebarSlice";
import ModalReducer from "../Reducer/ModalSlice";
import PrescriptionReducer from "../Reducer/PrescriptionSlice";

const store = configureStore({
	reducer: {
		NavSidebar: navSidebarReducer,
		Modal: ModalReducer,
		Prescription: PrescriptionReducer,
	},
});

export default store;
