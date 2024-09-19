import {
	Button,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { handleDiagnosis } from "../../../Reducer/PrescriptionSlice";
import DiagnosisModal from "./DiagnosisModal";

function Diagnosis() {
	const preselected = useSelector((state) => state.Prescription.diagnosis);

	const [showModal, setShowModal] = useState(false);
	const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
	const [diagnosisArray, setDiagnosisArray] = useState([]);

	const [diagnosisList] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/diagnosis`
	);

	const handleDelete = (element) => {
		// removing from the prescription
		let temp = selectedDiagnosis;
		temp = temp.filter((item) => item.value !== element.value);
		setSelectedDiagnosis(temp);

		// removing from the checklist
		let i = diagnosisList.findIndex((item) => item.id === element.value);
		diagnosisArray[i] = false;
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(handleDiagnosis(selectedDiagnosis));
	}, [selectedDiagnosis]);

	useEffect(() => {
		setSelectedDiagnosis(preselected);
		if (preselected.length > 0) {
			const matches = diagnosisList.filter((diagnosis, index) => {
				const match = preselected.find(
					(preselect) => diagnosis.id === preselect.value
				);
				return match
					? (diagnosisArray[index] = true)
					: (diagnosisArray[index] = false);
			});
			console.log(matches);
		}
	}, [preselected]);

	return (
		<Box minHeight="80px">
			<Button onClick={() => setShowModal(true)}>Diagnosis</Button>
			{selectedDiagnosis.length > 0 ? (
				<List sx={{ padding: "0" }}>
					{selectedDiagnosis.map((diagnosis, i) => {
						return (
							<ListItem
								key={i}
								secondaryAction={
									<IconButton
										edge="end"
										onClick={() => handleDelete(diagnosis)}
									>
										<TiDeleteOutline
											style={{ color: "#ff3333", fontSize: "1.125rem" }}
										/>
									</IconButton>
								}
								sx={{ padding: "0" }}
							>
								<ListItemIcon>
									<RxDotFilled style={{ color: "black" }} />
								</ListItemIcon>
								<ListItemText primary={diagnosis.name} />
							</ListItem>
						);
					})}
				</List>
			) : (
				<></>
			)}
			<DiagnosisModal
				showModal={showModal}
				setShowModal={setShowModal}
				selectedDiagnosis={selectedDiagnosis}
				setSelectedDiagnosis={setSelectedDiagnosis}
				diagnosisArray={diagnosisArray}
				diagnosisList={diagnosisList}
			/>
		</Box>
	);
}

export default Diagnosis;
