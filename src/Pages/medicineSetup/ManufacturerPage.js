import { Box } from "@mui/material";
import React, { useState } from "react";
import ManufacturerAddForm from "../../components/medicineSetup/manufacturer/ManufacturerAddForm";
import ManufacturerEditForm from "../../components/medicineSetup/manufacturer/ManufacturerEditForm";
import ManufacturerTable from "../../components/medicineSetup/manufacturer/ManufacturerTable";

function ManufacturerPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="10px">
				<ManufacturerTable setData={setData} reload={reload} />
				{data.hasOwnProperty("id") ? (
					<ManufacturerEditForm
						data={data}
						setData={setData}
						reload={reload}
						setReload={setReload}
					/>
				) : (
					<ManufacturerAddForm
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

export default ManufacturerPage;
