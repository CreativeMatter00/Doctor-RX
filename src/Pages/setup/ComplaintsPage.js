import { Box } from "@mui/system";
import React, { useState } from "react";
import ComplaintTable from "../../components/setup/complaints/ComplaintTable";
import ComplaintEditForm from "../../components/setup/complaints/ComplaintEditForm";
import ComplaintAddForm from "../../components/setup/complaints/ComplaintAddForm";

function ComplaintsPage() {
	const [data, setData] = useState({});
	const [reload, setReload] = useState(false);
	console.log(data);

	return (
		<div className="sidebar-close">
			<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
				<ComplaintTable setData={setData} reload={reload} />
				{data.hasOwnProperty("id") ? (
					<ComplaintEditForm
						data={data}
						setData={setData}
						reload={reload}
						setReload={setReload}
					/>
				) : (
					<ComplaintAddForm reload={reload} setReload={setReload} />
				)}
			</Box>
		</div>
	);
}

export default ComplaintsPage;
