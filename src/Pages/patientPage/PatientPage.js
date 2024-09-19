import React from "react";
import EmptySpace from "../../Layout/empty-space/EmptySpace";
import Patient from "../../components/patient/Patient";

function PatientPage() {
	return (
		<div style={{ padding: "5px 20px 20px 20px" }} className="sidebar-close">
			<EmptySpace />
			<Patient />
		</div>
	);
}

export default PatientPage;
