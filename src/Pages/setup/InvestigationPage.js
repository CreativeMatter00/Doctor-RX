import { Box } from "@mui/material";
import React, { useState } from "react";
import InvestigationEditForm from "../../components/setup/investigation/InvestigationEditForm";
import InvestigationAddForm from "../../components/setup/investigation/InvestigationAddForm";
import InvestigationTable from "../../components/setup/investigation/InvestigationTable";


function InvestigationPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<InvestigationTable setData={setData} reload={reload} />
				{data.hasOwnProperty('id') ?
					<InvestigationEditForm data={data} setData={setData} reload={reload} setReload={setReload} />
					: <InvestigationAddForm reload={reload} setReload={setReload} />
				}
			</Box>
		</div>
	);
}

export default InvestigationPage;
