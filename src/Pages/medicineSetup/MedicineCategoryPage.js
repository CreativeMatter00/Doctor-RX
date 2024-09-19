import { Box } from "@mui/material";
import React, { useState } from "react";
import MedicineCategoryAddForm from "../../components/medicineSetup/medicineCategory/MedicineCategoryAddForm";
import MedicineCategoryEditForm from "../../components/medicineSetup/medicineCategory/MedicineCategoryEditForm";
import MedicineCategoryTable from "../../components/medicineSetup/medicineCategory/MedicineCategoryTable";

function MedicineCategoryPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);
	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<MedicineCategoryTable setData={setData} reload={reload} />
				{data.hasOwnProperty("id") ? (
					<MedicineCategoryEditForm
						data={data}
						setData={setData}
						reload={reload}
						setReload={setReload}
					/>
				) : (
					<MedicineCategoryAddForm reload={reload} setReload={setReload} />
				)}
			</Box>
		</div>
	);
}

export default MedicineCategoryPage;
