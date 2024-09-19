import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

function AccessDenied() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="85vh"
			padding="40px"
			gap="40px"
		>
			<Typography variant="h3" textAlign="center">
				You do not have permission to visit this page
			</Typography>
			<Link to="/">
				<Button variant="contained">Back To Home</Button>
			</Link>
		</Box>
	);
}

export default AccessDenied;
