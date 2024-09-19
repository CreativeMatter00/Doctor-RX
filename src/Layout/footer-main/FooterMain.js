import { Box } from "@mui/material";
import React from "react";

function FooterMain() {
	const year = new Date().getFullYear();

	return (
		<Box
			backgroundColor="#191919"
			color="white"
			padding="1rem"
			display="flex"
			alignItems="center"
			gap="6px"
			justifyContent="center"
			fontSize="0.825rem"
			width="100%"
			marginTop="10px"
		>
			<Box>@ Copyright {year} All rights reserved by ATI Limited |</Box>
			<Box display="flex" alignItems="center" gap="6px">
				Developed by
				<img
					src={`${process.env.PUBLIC_URL}/assets/images/ati-logo.png`}
					alt="ATI"
					style={{ maxHeight: "30px", cursor: "pointer" }}
					onClick={() => window.open("https://www.atilimited.net/", "_blank")}
				/>
			</Box>
		</Box>
	);
}

export default FooterMain;
