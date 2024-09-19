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

function Diagnosis() {
	const complaints = useSelector((state) => state.Prescription.complaints);
	const examinations = useSelector((state) => state.Prescription.examination);
	const diagnosis = useSelector((state) => state.Prescription.diagnosis);
	const investigations = useSelector(
		(state) => state.Prescription.investigation
	);

	return (
		<Box padding="10px">
			<Box marginBottom="10px">
				<Heading> Complaints : </Heading>
				<List sx={{ padding: "0" }}>
					{complaints?.map((complaint, i) => {
						return (
							<ListItem key={i} sx={{ padding: "0" }}>
								<ListItemIcon style={{ minWidth: "30px" }}>
									<RxDotFilled style={{ color: "black" }} />
								</ListItemIcon>
								<ListItemText primary={complaint.name} />
							</ListItem>
						);
					})}
				</List>
			</Box>
			{examinations.length !== 0 && (
				<Box marginBottom="10px">
					<Heading> Examination : </Heading>
					<List sx={{ padding: "0" }}>
						{examinations.map((examination, i) => {
							return (
								<ListItem key={i} sx={{ padding: "0" }}>
									<ListItemIcon style={{ minWidth: "30px" }}>
										<RxDotFilled style={{ color: "black" }} />
									</ListItemIcon>
									<ListItemText primary={examination.name} />
								</ListItem>
							);
						})}
					</List>
				</Box>
			)}

			{diagnosis.length !== 0 && (
				<Box marginBottom="10px">
					<Heading> Diagnosis : </Heading>
					<List sx={{ padding: "0" }}>
						{diagnosis.map((diagnosis, i) => {
							return (
								<ListItem key={i} sx={{ padding: "0" }}>
									<ListItemIcon style={{ minWidth: "30px" }}>
										<RxDotFilled style={{ color: "black" }} />
									</ListItemIcon>
									<ListItemText primary={diagnosis.name} />
								</ListItem>
							);
						})}
					</List>
				</Box>
			)}
			{investigations.length !== 0 && (
				<Box marginBottom="10px">
					<Heading> Investigation : </Heading>
					<List sx={{ padding: "0" }}>
						{investigations.map((investigation, i) => {
							return (
								<ListItem key={i} sx={{ padding: "0" }}>
									<ListItemIcon style={{ minWidth: "30px" }}>
										<RxDotFilled style={{ color: "black" }} />
									</ListItemIcon>
									<ListItemText primary={investigation.name} />
								</ListItem>
							);
						})}
					</List>
				</Box>
			)}
		</Box>
	);
}

export default Diagnosis;
