import { Box, Paper } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./setupNavbar.scss";

function SetupNavbar() {
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
			<NavLink to="/setup/complaints">
				<Box> Complaints </Box>
			</NavLink>
			<NavLink to="/setup/examination">
				<Box> Examinations </Box>
			</NavLink>
			<NavLink to="/setup/diagnosis">
				<Box> Diagnosis </Box>
			</NavLink>
			<NavLink to="/setup/investigation">
				<Box> Investigations </Box>
			</NavLink>
			<NavLink to="/setup/advice">
				<Box> Advices </Box>
			</NavLink>
		</Paper>
	);
}

export default SetupNavbar;
