import { Box } from "@mui/material";
import React, { useState } from "react";
import ExaminationAddForm from "../../components/setup/examination/ExaminationAddForm";
import ExaminationEditForm from "../../components/setup/examination/ExaminationEditForm";
import ExaminationTable from "../../components/setup/examination/ExaminationTable";


function ExaminationPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<ExaminationTable setData={setData} reload={reload} />
				{data.hasOwnProperty('id') ?
					<ExaminationEditForm data={data} setData={setData} reload={reload} setReload={setReload} />
					: <ExaminationAddForm reload={reload} setReload={setReload} />
				}
			</Box>
		</div>
	);
}

export default ExaminationPage;
