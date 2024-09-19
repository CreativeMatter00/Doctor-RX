import { Box } from "@mui/material";
import React, { useState } from "react";
import DiagnosisAddForm from "../../components/setup/diagnosis/DiagnosisAddForm";
import DiagnosisEditForm from "../../components/setup/diagnosis/DiagnosisEditForm";
import DiagnosisTable from "../../components/setup/diagnosis/DiagnosisTable";

function DiagnosisPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<DiagnosisTable setData={setData} reload={reload} />
				{data.hasOwnProperty('id') ?
					<DiagnosisEditForm data={data} setData={setData} reload={reload} setReload={setReload} />
					: <DiagnosisAddForm reload={reload} setReload={setReload} />
				}
			</Box>
		</div>
	);
}

export default DiagnosisPage;
