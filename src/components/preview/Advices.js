import styled from "@emotion/styled";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";

const Heading = styled(Typography)(({ theme }) => ({
	fontSize: "1rem",
	fontWeight: "500",
}));

function Advices() {
	const advices = useSelector((state) => state.Prescription.advice);
	const followUp = useSelector((state) => state.Prescription.followUp);
	return (
		<Box padding="10px">
			{/* {advices.length !== 0 && ( */}
			<Box marginBottom="10px">
				<Heading> Advices : </Heading>
				<List sx={{ padding: "0" }}>
					{advices?.map((advice, i) => {
						return (
							<ListItem key={i} sx={{ padding: "0" }}>
								<ListItemIcon style={{ minWidth: "30px" }}>
									<RxDotFilled style={{ color: "black" }} />
								</ListItemIcon>
								<ListItemText primary={advice.name} />
							</ListItem>
						);
					})}
				</List>
			</Box>
			{/* )} */}
			<Box>{followUp && <Box>Please visit after {followUp} days</Box>}</Box>
		</Box>
	);
}

export default Advices;
