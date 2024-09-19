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
import { handleInvestigation } from "../../../Reducer/PrescriptionSlice";
import InvestigationModal from "./InvestigationModal";

function Investigation() {
	const preselected = useSelector((state) => state.Prescription.investigation);

	const [investigationList] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/investigation`
	);

	const [showModal, setShowModal] = useState(false);
	const [selectedInvestigation, setSelectedInvestigation] = useState(
		preselected || []
	);
	const [investigationArray, setInvestigationArray] = useState([]);

	const handleDelete = (element) => {
		// removing from the prescription
		let temp = selectedInvestigation;
		temp = temp.filter((item) => item.value !== element.value);
		setSelectedInvestigation(temp);

		// removing from the checklist
		let i = investigationList.findIndex((item) => item.id === element.value);
		investigationArray[i] = false;
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(handleInvestigation(selectedInvestigation));
	}, [selectedInvestigation]);

	useEffect(() => {
		setSelectedInvestigation(preselected);
		if (preselected.length > 0) {
			const matches = investigationList.filter((investiagtion, index) => {
				const match = preselected.find(
					(preselect) => investiagtion.id === preselect.value
				);
				return match
					? (investigationArray[index] = true)
					: (investigationArray[index] = false);
			});
			console.log(matches);
		}
	}, [preselected]);

	return (
		<Box minHeight="80px">
			<Button onClick={() => setShowModal(true)}>Investigation</Button>
			{selectedInvestigation.length > 0 ? (
				<List sx={{ padding: "0" }}>
					{selectedInvestigation.map((investigation, i) => {
						return (
							<ListItem
								key={i}
								secondaryAction={
									<IconButton
										edge="end"
										onClick={() => handleDelete(investigation)}
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
								<ListItemText primary={investigation.name} />
							</ListItem>
						);
					})}
				</List>
			) : (
				<></>
			)}
			<InvestigationModal
				showModal={showModal}
				setShowModal={setShowModal}
				selectedInvestigation={selectedInvestigation}
				setSelectedInvestigation={setSelectedInvestigation}
				investigationArray={investigationArray}
				investigationList={investigationList}
			/>
		</Box>
	);
}

export default Investigation;
