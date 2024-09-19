import { Box, Paper } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./medicineNavbar.scss";

function MedicineNavbar() {
	return (
		<Paper
			className="setup-navbar"
			elevation={6}
			style={{
				backgroundColor: "#0d2f9489",
				display: "flex",
				justifyContent: "space-around",
				margin: "70px 10px 10px 76px",
			}}
		>
			<NavLink to="/medicine-setup/medicine-category">
				<Box> Medicine Category </Box>
			</NavLink>
			<NavLink to="/medicine-setup/medicine">
				<Box> Medicines </Box>
			</NavLink>
			<NavLink to="/medicine-setup/medicine-generic">
				<Box> Medicine Generic </Box>
			</NavLink>
			<NavLink to="/medicine-setup/manufacturer">
				<Box> Manufacturer </Box>
			</NavLink>
		</Paper>
	);
}

export default MedicineNavbar;
