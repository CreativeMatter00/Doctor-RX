import { Box } from "@mui/material";
import React, { useState } from "react";
import AdviceAddForm from "../../components/setup/advice/AdviceAddForm";
import AdviceEditForm from "../../components/setup/advice/AdviceEditForm";
import AdviceTable from "../../components/setup/advice/AdviceTable";

function AdvicePage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);
	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<AdviceTable setData={setData} reload={reload} />
				{data.hasOwnProperty('id') ?
					<AdviceEditForm data={data} setData={setData} reload={reload} setReload={setReload} />
					: <AdviceAddForm reload={reload} setReload={setReload} />
				}
			</Box>
		</div>
	);
}

export default AdvicePage;
