import { createSlice } from "@reduxjs/toolkit";

export const NavSidebarSlice = createSlice({
	name: "NavSidebar",
	initialState: { open: false },
	reducers: {
		handleDrawerOpen: (state) => {
			state.open = true;
		},
		handleDrawerClose: (state) => {
			state.open = false;
		},
	},
});

export const { handleDrawerOpen, handleDrawerClose } = NavSidebarSlice.actions;

export default NavSidebarSlice.reducer;
