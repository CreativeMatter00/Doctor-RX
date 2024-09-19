import { Box, Typography } from "@mui/material";
import React from "react";

function FooterCurrent({ footer }) {
	return (
		<Box padding="20px">
			<Typography variant="h4" textAlign="center" paddingBottom="20px">
				Current Footer
			</Typography>
			<Typography variant="h5" fontWeight="700">
				{footer[0]?.hospitalName}
			</Typography>
			<Typography variant="h6" fontWeight="500">
				{footer[0]?.address}
			</Typography>
			<Typography variant="h6" fontWeight="500">
				{footer[0]?.helpline}
			</Typography>
			<Typography variant="h6" fontWeight="400">
				{footer[0]?.email}
			</Typography>
			<Typography variant="h6" fontWeight="400">
				{footer[0]?.serialPhoneNumber}
			</Typography>
		</Box>
	);
}

export default FooterCurrent;
