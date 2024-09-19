import { createSlice } from "@reduxjs/toolkit";

export const ModalSlice = createSlice({
	name: "Modal",
	initialState: {
		view: false,
		add: false,
		edit: false,
		appointment: false,
		val: [],
		tabValue: 0,
	},
	reducers: {
		handleViewOpen: (state) => {
			state.view = true;
		},
		handleViewClose: (state) => {
			state.view = false;
		},
		rowValue: (state, action) => {
			state.val = action.payload;
		},
		handleAddOpen: (state) => {
			state.add = true;
		},
		handleAddClose: (state) => {
			state.add = false;
		},
		handleEditOpen: (state) => {
			state.edit = true;
		},
		handleEditClose: (state) => {
			state.edit = false;
		},
		handleAppointmentOpen: (state) => {
			state.appointment = true;
		},
		handleAppointmentClose: (state) => {
			state.appointment = false;
		},
		handletabValue: (state, action) => {
			state.tabValue = action.payload;
		},
	},
});

export const {
	handleViewOpen,
	handleViewClose,
	rowValue,
	handleAddOpen,
	handleAddClose,
	handleEditOpen,
	handleEditClose,
	handleAppointmentOpen,
	handleAppointmentClose,
	handletabValue,
} = ModalSlice.actions;

export default ModalSlice.reducer;
