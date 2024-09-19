import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function PatientModalOld({ open, setOpen, patientInfo, setPatientInfo }) {
	const handlePatientInfo = (e) => {
		const { name, value } = e.target;
		setPatientInfo({
			...patientInfo,
			[name]: value,
		});
	};
	return (
		<div>
			<Box
				display="grid"
				gridTemplateColumns="1fr 1fr"
				gap="20px"
				padding="0 20px"
			>
				<Box>
					<Box marginBottom="10px">
						<Typography variant="p">Name</Typography>
						<TextField
							fullWidth
							name="name"
							size="small"
							value={patientInfo.name}
							onChange={handlePatientInfo}
						/>
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Age</Typography>
						<TextField
							fullWidth
							type="number"
							name="age"
							size="small"
							value={patientInfo.age}
							onChange={handlePatientInfo}
						/>
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Gender</Typography>
						<TextField
							select
							fullWidth
							// defaultValue=""
							name="gender"
							size="small"
							value={patientInfo.gender}
							onChange={handlePatientInfo}
						>
							<MenuItem value="male">Male</MenuItem>
							<MenuItem value="female">Female</MenuItem>
						</TextField>
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Mobile no</Typography>
						<TextField
							fullWidth
							type="number"
							name="mobileNo"
							size="small"
							value={patientInfo.mobileNo}
							onChange={handlePatientInfo}
						/>
					</Box>
				</Box>
				<Box>
					<Box marginBottom="10px">
						<Typography variant="p">Weight</Typography>
						<TextField
							fullWidth
							name="weight"
							size="small"
							value={patientInfo.weight}
							onChange={handlePatientInfo}
						/>
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Pulse</Typography>
						<TextField
							fullWidth
							name="pulse"
							size="small"
							value={patientInfo.pulse}
							onChange={handlePatientInfo}
						/>
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">BP</Typography>
						<TextField
							fullWidth
							name="bp"
							size="small"
							value={patientInfo.bp}
							onChange={handlePatientInfo}
						/>
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Date</Typography>
						<TextField
							fullWidth
							type="date"
							name="date"
							size="small"
							value={patientInfo.date}
							onChange={handlePatientInfo}
						/>
					</Box>
				</Box>
			</Box>
			<Box marginBottom="10px" padding="0 20px">
				<Typography variant="p">Other Information</Typography>
				<TextField
					fullWidth
					name="otherInfo"
					size="small"
					value={patientInfo.otherInfo}
					onChange={handlePatientInfo}
				/>
			</Box>
			{/* <Box display="flex" justifyContent="end" gap="10px" padding="0 20px">
					<Button
						type="submit"
						size="small"
						variant="contained"
						color="success"
					>
						ADD
					</Button>
					<Button
						type="submit"
						size="small"
						variant="contained"
						color="error"
						onClick={() => setOpen(false)}
					>
						Close
					</Button>
				</Box> */}
		</div>
	);
}

export default PatientModalOld;
