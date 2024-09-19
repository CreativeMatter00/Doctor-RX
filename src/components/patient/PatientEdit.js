import React, { useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	InputAdornment,
	MenuItem,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import { handleEditClose } from "../../Reducer/ModalSlice";
import { SyncLoader } from "react-spinners";
import styled from "@emotion/styled";

const ErrorText = styled(Typography)(({ theme }) => ({
	fontSize: "0.7rem",
	lineHeight: "1",
	color: "red",
	margin: "6px 0",
}));

const PatientEdit = () => {
	const patientInfo = useSelector((state) => state.Modal.val);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	// State and function for showing/hiding patent detail and history

	const [showComponent, setShowComponent] = useState("");

	const handlePatientDetail = () => {
		if (showComponent !== "patientDetail") setShowComponent("patientDetail");
		else setShowComponent("");
	};

	const handlePatientHistory = () => {
		if (showComponent !== "patientHistory") setShowComponent("patientHistory");
		else setShowComponent("");
	};

	const comorbidity = patientInfo.comorbidity;
	const physicalExamination = patientInfo.physicaExamination;

	let comorbidityCheck = comorbidity?.includes("hypertension");
	let comorbidityCheck1 = comorbidity?.includes("diabetes");
	let comorbidityCheck2 = comorbidity?.includes("CKD");
	let comorbidityCheck3 = comorbidity?.includes("ISD");
	let pECheck1 = physicalExamination?.includes("anaemie");
	let pECheck2 = physicalExamination?.includes("jaundice");
	let pECheck3 = physicalExamination?.includes("odema");
	let pECheck4 = physicalExamination?.includes("purpura");
	let pECheck5 = physicalExamination?.includes("lymphNodes");
	let pECheck6 = physicalExamination?.includes("palpable");

	// State for dyanimc medicine history fields

	const [medicineHistory, setMedicineHistory] = useState(
		patientInfo.patientMedicineHistory
	);

	// function for storing medicine history inputfields

	const handleInputChange = (index, e) => {
		let data = [...medicineHistory];
		data[index].medicine = e.target.value;
		setMedicineHistory(data);
	};

	// function for adding and deleteing medicine history inputfields

	const addMedicines = () => {
		setMedicineHistory([...medicineHistory, { medicine: "" }]);
	};

	const removeMedicines = (index) => {
		let data = [...medicineHistory];
		data.splice(index, 1);
		setMedicineHistory(data);
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data, e) => {
		setLoading(true);
		fetch(
			`${process.env.REACT_APP_API_URL}/api/patientInfo/${patientInfo.id}`,
			{
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: data.name,
					age: Number(data.age),
					phone: data.phone,
					gender: data.gender,
					appointmentDate: data.appointmentDate,
					email: data.email,
					bloodGroup: data.bloodGroup,
					height: data.height,
					weight: data.weight,
					bmr: data.bmr,
					activeLebel: data.activeLebel,
					tdee: data.tdee,
					bsa: data.bsa,
					bmi: data.bmi,
					nationalId: data.nationalId,
					address: data.address,
					refereedBy: data.refereedBy,
					refereedTo: data.refereedTo,
					registrationNo: data.registrationNo,
					disease: data.disease,
					presentComplaints: data.presentComplaints,
					systemicExamination: data.systemicExamination,
					patientOutcome: data.patientOutcome,
					physicaExamination: data?.physicaExamination?.toString(),
					comorbidity: data?.comorbidity?.toString(),
					investigation: data.investigation,
				}),
			}
		).then((res) => {
			if (res.status === 200) {
				dispatch(handleEditClose());
				setLoading(false);
			} else {
				setLoading(false);
				console.log(res);
			}
		});
	};

	return (
		<Box padding="0 20px 20px 20px">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					padding="20px 0"
					sx={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr 1fr",
						gap: "1.5rem",
					}}
				>
					<Box marginBottom="10px">
						<Typography variant="p">Name</Typography>
						<TextField
							fullWidth
							size="small"
							defaultValue={patientInfo.name}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
							{...register("name", { required: true })}
						/>
						{errors?.name?.type === "required" && (
							<p
								style={{
									color: " rgb(233, 69, 96)",
									fontWeight: "400",
									fontSize: "0.75rem",
									textAlign: "left",
									margin: "2px 14px 0px",
								}}
							>
								Patient name is required
							</p>
						)}
					</Box>
					{/* <Box> */}
					<Box>
						<Typography variant="p">Age</Typography>
						<OutlinedInput
							type="number"
							size="small"
							fullWidth
							defaultValue={patientInfo.age}
							endAdornment={
								<InputAdornment position="end">Year</InputAdornment>
							}
							{...register("age", { required: true })}
						/>
						{errors?.age?.type === "required" && (
							<p
								style={{
									color: " rgb(233, 69, 96)",
									fontWeight: "400",
									fontSize: "0.75rem",
									textAlign: "left",
									margin: "2px 14px 0px",
								}}
							>
								Age is required
							</p>
						)}
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Phone</Typography>
						<TextField
							fullWidth
							size="small"
							type="number"
							defaultValue={patientInfo.phone}
							// type="tel"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PhoneIcon />
									</InputAdornment>
								),
							}}
							{...register("phone", {
								required: true,
								minLength: 11,
							})}
							error={Boolean(errors.phone)}
						/>
						{errors?.phone?.type === "required" ? (
							<ErrorText>Mobile Number is required </ErrorText>
						) : errors?.phone?.type === "minLength" ? (
							<ErrorText>Please insert a valid phone number </ErrorText>
						) : (
							""
						)}
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Appointment Date</Typography>
						<TextField
							fullWidth
							size="small"
							type="date"
							defaultValue={patientInfo.appointmentDate?.slice(0, 10)}
							{...register("appointmentDate")}
						/>
					</Box>
				</Box>

				<Box display="flex" justifyContent="end" marginBottom="10px" gap="10px">
					<Button
						size="small"
						variant="outlined"
						onClick={() => handlePatientDetail()}
					>
						{showComponent === "patientDetail" ? "Hide" : "Show more"}
					</Button>
					<Button
						size="small"
						variant="outlined"
						onClick={() => handlePatientHistory()}
					>
						{showComponent === "patientHistory"
							? "Hide History"
							: "Show History"}
					</Button>
				</Box>
				{showComponent === "patientDetail" && (
					<>
						<Box
							padding="0"
							sx={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">Gender</Typography>
								<TextField
									select
									defaultValue={patientInfo.gender || ""}
									fullWidth
									size="small"
									{...register("gender", {})}
								>
									<MenuItem value="Male">Male</MenuItem>
									<MenuItem value="Female">Female</MenuItem>
									<MenuItem value="Other">Other</MenuItem>
								</TextField>
							</Box>
							<Box>
								<Typography variant="p">Email</Typography>
								<TextField
									fullWidth
									size="small"
									type="email"
									defaultValue={patientInfo.email}
									{...register("email", { pattern: /^\S+@\S+$/i })}
								/>
							</Box>
							<Box>
								<Typography variant="p">Generate serial number</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.serialNumber}
									// {...register("serialNumber", {})}
								/>
							</Box>
						</Box>
						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">Blood group</Typography>
								<TextField
									fullWidth
									size="small"
									select
									defaultValue={patientInfo.bloodGroup || ""}
									{...register("bloodGroup", {})}
								>
									<MenuItem value="O+">O+</MenuItem>
									<MenuItem value="O-">O-</MenuItem>
									<MenuItem value="A+">A+</MenuItem>
									<MenuItem value="A-">A-</MenuItem>
									<MenuItem value="B+">B+</MenuItem>
									<MenuItem value="B-">B-</MenuItem>
									<MenuItem value="AB+">AB+</MenuItem>
									<MenuItem value="AB-">AB-</MenuItem>
									<MenuItem value="Unknown">Unknown</MenuItem>
								</TextField>
							</Box>
							<Box size="small">
								<Typography variant="p">Height</Typography>
								<OutlinedInput
									size="small"
									fullWidth
									defaultValue={patientInfo.height}
									endAdornment={
										<InputAdornment position="end">Ft</InputAdornment>
									}
									{...register("height", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Weight</Typography>
								<OutlinedInput
									size="small"
									fullWidth
									defaultValue={patientInfo.weight}
									endAdornment={
										<InputAdornment position="end">kg</InputAdornment>
									}
									{...register("weight", {})}
								/>
							</Box>
						</Box>
						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">BMR</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.bmr}
									{...register("bmr", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Activity Level</Typography>
								<TextField
									fullWidth
									size="small"
									select
									defaultValue={patientInfo.activeLebel || ""}
									{...register("activeLebel", {})}
								>
									<MenuItem value="Sedentary">Sedentary</MenuItem>
									<MenuItem value="Light active">Light active</MenuItem>
									<MenuItem value="Moderately active">
										Moderately active
									</MenuItem>
									<MenuItem value="Very active">Very active</MenuItem>
									<MenuItem value="Extra active">Extra active</MenuItem>
								</TextField>
							</Box>
							<Box>
								<Typography variant="p">TDEE</Typography>
								<TextField
									defaultValue={patientInfo.tdee}
									fullWidth
									size="small"
									{...register("tdee", {})}
								/>
							</Box>
						</Box>
						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">BSA</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.bsa}
									{...register("bsa", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">BMI</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.bmi}
									{...register("bmi", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">National Id</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.nationalId}
									{...register("nationalId", {})}
								/>
							</Box>
						</Box>
						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">Address</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.address}
									{...register("address", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Referred By</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.refereedBy}
									{...register("refereedBy", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Referred To</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.refereedTo}
									{...register("refereedTo", {})}
								/>
							</Box>
						</Box>
						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">Registration No</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.registrationNo}
									{...register("registrationNo", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Disease</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.disease}
									{...register("disease", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Presenting Complaints</Typography>
								<TextField
									fullWidth
									defaultValue={patientInfo.presentComplaints}
									size="small"
									{...register("presentComplaints", {})}
								/>
							</Box>
						</Box>

						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">Systemic Examination</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.systemicExamination}
									{...register("systemicExamination", {})}
								/>
							</Box>
							<Box>
								<Typography variant="p">Patient Outcome</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.patientOutcome}
									{...register("patientOutcome", {})}
								/>
							</Box>
						</Box>
						<Box
							padding="0"
							sx={{
								marginTop: "16px",
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "1.5rem",
							}}
						>
							<Box>
								<Typography variant="p">Physical Examination</Typography>
								<Box>
									{pECheck1 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Anaemie"
											value="anaemie"
											{...register("physicaExamination")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Anaemie"
											value="anaemie"
											{...register("physicaExamination")}
										/>
									)}

									{pECheck2 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Jaundice"
											value="jaundice"
											{...register("physicaExamination")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Jaundice"
											value="jaundice"
											{...register("physicaExamination")}
										/>
									)}

									{pECheck3 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Odema"
											value="odema"
											{...register("physicaExamination")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Odema"
											value="odema"
											{...register("physicaExamination")}
										/>
									)}

									{pECheck4 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Purpura"
											value="purpura"
											{...register("physicaExamination")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Purpura"
											value="purpura"
											{...register("physicaExamination")}
										/>
									)}

									{pECheck5 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Lymph Nodes"
											value="lymphNodes"
											{...register("physicaExamination")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Lymph Nodes"
											value="lymphNodes"
											{...register("physicaExamination")}
										/>
									)}

									{pECheck6 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Palpable"
											value="palpable"
											{...register("physicaExamination")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Palpable"
											value="palpable"
											{...register("physicaExamination")}
										/>
									)}
								</Box>
							</Box>

							<Box>
								<Typography variant="p">Comorbidity</Typography>
								<Box>
									{comorbidityCheck === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Hypertension"
											value="hypertension"
											{...register("comorbidity")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Hypertension"
											value="hypertension"
											{...register("comorbidity")}
										/>
									)}

									{comorbidityCheck1 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Diabetes"
											value="diabetes"
											{...register("comorbidity")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="Diabetes"
											value="diabetes"
											{...register("comorbidity")}
										/>
									)}

									{comorbidityCheck2 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="CKD"
											value="CKD"
											{...register("comorbidity")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="CKD"
											value="CKD"
											{...register("comorbidity")}
										/>
									)}

									{comorbidityCheck3 === true ? (
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="ISD"
											value="ISD"
											{...register("comorbidity")}
										/>
									) : (
										<FormControlLabel
											control={<Checkbox />}
											label="ISD"
											value="ISD"
											{...register("comorbidity")}
										/>
									)}
								</Box>
							</Box>
						</Box>
					</>
				)}
				{showComponent === "patientHistory" && (
					<Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px">
						<Box>
							<Typography variant="h5" marginBottom="23px">
								Investigation History
							</Typography>

							<Box marginBottom="10px">
								<Typography variant="p">Investigation History</Typography>
								<TextField
									fullWidth
									size="small"
									defaultValue={patientInfo.investigationsHistory}
									{...register("investigation", {})}
								/>
							</Box>
						</Box>

						<Box>
							<Typography variant="h5" marginBottom="10px">
								Medicine History
							</Typography>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="end"
								marginBottom="6px"
							>
								<Typography variant="p">Medcine Names and Dosages</Typography>
								<Button variant="contained" size="small" onClick={addMedicines}>
									Add More
								</Button>
							</Box>
							{medicineHistory.map((input, index) => {
								return (
									<Box
										key={Math.random()}
										marginBottom="10px"
										display="flex"
										gap="20px"
									>
										<TextField
											fullWidth
											placeholder="Medicine Name - Dosage - Duration"
											size="small"
											defaultValue={input.medicine}
											onChange={(e) => handleInputChange(index, e)}
										/>
										<Button
											variant="outlined"
											size="small"
											color="error"
											onClick={() => removeMedicines(index)}
											disabled={medicineHistory.length === 1 ? true : false}
										>
											Delete
										</Button>
									</Box>
								);
							})}
						</Box>
					</Box>
				)}

				<Box marginTop="20px" display="flex" justifyContent="center">
					{loading ? (
						<SyncLoader color="#1565C0" />
					) : (
						<Button fullWidth type="submit" size="small" variant="contained">
							Edit
						</Button>
					)}
				</Box>
			</form>
		</Box>
	);
};

export default PatientEdit;
