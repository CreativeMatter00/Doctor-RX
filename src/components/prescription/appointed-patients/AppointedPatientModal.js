import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import NewPatients from "./NewPatients";
import OldPatients from "./OldPatients";
import TodayPatients from "./TodayPatients";

const Tabpanel = ({ value, index, children }) => {
	return value === index && <Box role="tabpanel">{children}</Box>;
};

function AppointedPatientModal() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box padding="20px">
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				sx={{ marginBottom: "20px" }}
			>
				<Tab value={0} label="Today Appointments" />
				<Tab value={1} label="Upcoming Appointments" />
				<Tab value={2} label="Visited Patients" />
			</Tabs>
			<Tabpanel value={value} index={0}>
				<TodayPatients />
			</Tabpanel>
			<Tabpanel value={value} index={1}>
				<NewPatients />
			</Tabpanel>
			<Tabpanel value={value} index={2}>
				<OldPatients />
			</Tabpanel>
		</Box>
	);
}

export default AppointedPatientModal;
