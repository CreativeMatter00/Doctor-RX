import { Box, Typography } from "@mui/material";
import React from "react";
import { FadeLoader } from "react-spinners";
import useFetch from "../../hooks/useFetch";

function Header() {
	const [header, loading] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/presheader`
	);
	return loading ? (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			padding="10px"
		>
			<FadeLoader color="#2A334E" />
		</Box>
	) : (
		<Box
			padding="10px 20px"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
		>
			<Box>
				<Typography fontSize="1.25rem" color="#2A3189" fontWeight="700">
					{header[0]?.doctorName}
				</Typography>
				<Typography fontSize="1.125rem" fontWeight="500">
					{header[0]?.doctorMajorDegree}
				</Typography>
				<Typography fontSize="1.125rem" fontWeight="500">
					{header[0]?.doctorMinorDegree}
				</Typography>
				<Typography fontSize="1rem">{header[0]?.training}</Typography>
				<Typography fontSize="1rem" color="green" fontWeight="500">
					{header[0]?.specialist}
				</Typography>
				<Typography fontSize="1rem" color="#2A3189">
					{header[0]?.hospitalName}
				</Typography>
			</Box>
			<Box>
				<img
					src={`${process.env.PUBLIC_URL}/assets/images/stethoscope2.png`}
					alt="Prescription"
					style={{ maxHeight: "100px" }}
				/>
			</Box>
		</Box>
	);
}

export default Header;
