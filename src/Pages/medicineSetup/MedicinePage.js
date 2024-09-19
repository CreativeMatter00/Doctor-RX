import { Box } from "@mui/material";
import React, { useState } from "react";
import MedicineTable from "../../components/medicineSetup/medicine/MedicineTable";
import MedicineEditForm from "../../components/medicineSetup/medicine/MedicineEditForm";
import MedicineAddForm from "../../components/medicineSetup/medicine/MedicineAddForm";

function MedicinePage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="10px">
				<MedicineTable setData={setData} reload={reload} />
				{data.hasOwnProperty("id") ? (
					<MedicineEditForm
						data={data}
						setData={setData}
						reload={reload}
						setReload={setReload}
					/>
				) : (
					<MedicineAddForm
						data={data}
						setData={setData}
						reload={reload}
						setReload={setReload}
					/>
				)}
			</Box>
		</div>
	);
}

export default MedicinePage;
