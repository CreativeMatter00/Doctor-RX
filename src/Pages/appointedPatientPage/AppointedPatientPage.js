import React, { useState } from "react";
import EmptySpace from "../../Layout/empty-space/EmptySpace";
import { Tab, Tabs, Box } from "@mui/material";
import PatientToday from "../../components/patient/PatientToday";
import PatientNew from "../../components/patient/PatientNew";
import { useSelector } from "react-redux";

const Tabpanel = ({ value, index, children }) => {
	return value === index && <Box role="tabpanel">{children}</Box>;
};

function AppointedPatientPage() {
	const tabVal = useSelector((state) => state.Modal.tabValue);
	const [value, setValue] = useState(tabVal);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div style={{ padding: "5px 20px 20px 20px" }} className="sidebar-close">
			<EmptySpace />
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				sx={{ marginBottom: "20px" }}
			>
				<Tab value={0} label="Today Patients" />
				<Tab value={1} label="Appointed Patients" />
			</Tabs>
			<Tabpanel value={value} index={0}>
				<PatientToday />
			</Tabpanel>
			<Tabpanel value={value} index={1}>
				<PatientNew />
			</Tabpanel>
		</div>
	);
}

export default AppointedPatientPage;
