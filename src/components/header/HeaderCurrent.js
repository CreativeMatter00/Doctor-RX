import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function HeaderCurrent({ header, value }) {
	return (
		<Box padding="20px">
			<Typography variant="h4" textAlign="center" paddingBottom="20px">
				Current Header
			</Typography>
			<Typography variant="h5" fontWeight="700">
				{header[0]?.doctorName}
			</Typography>
			<Typography variant="h6" fontWeight="500">
				{header[0]?.doctorMajorDegree}
			</Typography>
			<Typography variant="h6" fontWeight="500">
				{header[0]?.doctorMinorDegree}
			</Typography>
			<Typography variant="h6" fontWeight="400">
				{header[0]?.training}
			</Typography>
			<Typography variant="h6" fontWeight="400">
				{header[0]?.specialist}
			</Typography>
			<Typography variant="h6" fontWeight="400">
				{header[0]?.hospitalName}
			</Typography>
		</Box>
	);
}

export default HeaderCurrent;
