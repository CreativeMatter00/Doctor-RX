import { Box, Typography } from "@mui/material";
import React from "react";
import useFetch from "../../hooks/useFetch";

function Footer() {
	const [footer, loading] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/presfooter`
	);

	return (
		<>
			{!loading && (
				<Box
					display="flex"
					justifyContent="space-between"
					padding="10px"
					alignItems="end"
					borderTop="solid 1px"
				>
					<Box textAlign={{ base: "right", md: "left" }}>
						<Typography fontSize="1rem" fontWeight="500">
							For Serial:
						</Typography>
						<Typography fontSize="1rem" color="green">
							{footer[0]?.serialPhoneNumber}
						</Typography>
					</Box>
					<Box textAlign="right">
						<Typography fontSize="1rem" fontWeight="500" color="#2A3189">
							{footer[0]?.hospitalName}
						</Typography>
						<Typography fontSize="1rem" fontWeight="400">
							{footer[0]?.address}
						</Typography>
						<Typography fontSize="1rem" fontWeight="400">
							{footer[0]?.helpline}
						</Typography>
						<Typography fontSize="1rem" fontWeight="400">
							{footer[0]?.email}
						</Typography>
					</Box>
				</Box>
			)}
		</>
	);
}

export default Footer;
