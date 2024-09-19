import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function PatientAdditionalInfo() {
	const patientInfo = useSelector((state) => state.Modal.val);
	console.log(patientInfo);

	const Title = styled(Typography)(({ theme }) => ({
		fontWeight: "500",
	}));

	return (
		<Box padding="20px">
			<Box>
				<Typography variant="h6" marginBottom="10px">
					Additional Info
				</Typography>
				<Box
					display="grid"
					gridTemplateColumns="1fr 1fr"
					gap="20px"
					padding="10px 0"
				>
					<Box>
						<Typography variant="body1">
							<Title component="span"> Height : </Title> {patientInfo?.height}
						</Typography>
						<Typography variant="body1">
							<Title component="span"> Weight : </Title> {patientInfo?.weight}
						</Typography>
						<Typography variant="body1">
							<Title component="span"> Blood Group : </Title>{" "}
							{patientInfo?.weight}
						</Typography>
						<Typography variant="body1">
							<Title component="span"> Physical Examination : </Title>{" "}
							{patientInfo?.physicaExamination}
						</Typography>
					</Box>
					<Box>
						<Typography variant="body1">
							<Title component="span"> Referred By : </Title>{" "}
							{patientInfo?.refereedBy}
						</Typography>
						<Typography variant="body1">
							<Title component="span"> referred To : </Title>{" "}
							{patientInfo?.refereedTo}
						</Typography>
						<Typography variant="body1">
							<Title component="span"> Disease : </Title> {patientInfo.disease}
						</Typography>
						<Typography variant="body1">
							<Title component="span"> Comorbidity : </Title>{" "}
							{patientInfo?.comorbidity}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px">
				<Box>
					<Typography variant="h6" marginBottom="20px">
						Investigation History
					</Typography>
					<Box>
						{patientInfo.investigationsHistory ? (
							<Typography variant="body1">
								{patientInfo?.investigationsHistory}
							</Typography>
						) : (
							<Typography variant="body1">
								Investigation History is not available for this patient
							</Typography>
						)}
					</Box>
				</Box>
				<Box>
					<Typography variant="h6" marginBottom="20px">
						Medicine History
					</Typography>
					<Box>
						{patientInfo?.patientMedicineHistory?.length !== 0 ? (
							patientInfo?.patientMedicineHistory?.map((obj, index) => {
								return (
									<Typography variant="body1" key={index}>
										{index + 1}. {obj.medicine}
									</Typography>
								);
							})
						) : (
							<Typography variant="body1">
								Medicine History is not available for this patient
							</Typography>
						)}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default PatientAdditionalInfo;
