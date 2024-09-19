import { Box } from "@mui/material";
import React, { useState } from "react";
import GenericAddForm from "../../components/medicineSetup/medicineGeneric/GenericAddForm";
import GenericEditForm from "../../components/medicineSetup/medicineGeneric/GenericEditForm";
import GenericTable from "../../components/medicineSetup/medicineGeneric/GenericTable";

function MedicineGenericPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<GenericTable setData={setData} reload={reload} />
				{data.hasOwnProperty("id") ? (
					<GenericEditForm
						data={data}
						setData={setData}
						reload={reload}
						setReload={setReload}
					/>
				) : (
					<GenericAddForm reload={reload} setReload={setReload} />
				)}
			</Box>
		</div>
	);
}

export default MedicineGenericPage;
