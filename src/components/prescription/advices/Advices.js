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
import { handleAdvice } from "../../../Reducer/PrescriptionSlice";
import AdvicesModal from "./AdvicesModal";

function Advices() {
	const [advicesList] = useFetch(`${process.env.REACT_APP_API_URL}/api/advice`);
	const preselected = useSelector((state) => state.Prescription.advice);

	const [showModal, setShowModal] = useState(false);
	const [selectedAdvices, setSelectedAdvices] = useState(preselected || []);
	const [advicesArray, setAdvicesArray] = useState([]);

	const handleDelete = (element) => {
		// removing from the prescription
		let temp = selectedAdvices;
		temp = temp.filter((item) => item.value !== element.value);
		setSelectedAdvices(temp);

		// removing from the checklist
		let i = advicesList.findIndex((item) => item.id === element.value);
		advicesArray[i] = false;
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(handleAdvice(selectedAdvices));
	}, [selectedAdvices]);

	useEffect(() => {
		setSelectedAdvices(preselected);
		if (preselected.length > 0) {
			const matches = advicesList.filter((advice, index) => {
				const match = preselected.find(
					(preselect) => advice.id === preselect.value
				);
				return match
					? (advicesArray[index] = true)
					: (advicesArray[index] = false);
			});
			console.log(matches);
		}
	}, [preselected]);

	return (
		<Box minHeight="80px" width="70%">
			<Button onClick={() => setShowModal(true)}>Advices</Button>
			{selectedAdvices.length > 0 ? (
				<List sx={{ padding: "0", paddingRight: "80px" }}>
					{selectedAdvices.map((advice, i) => {
						return (
							<ListItem
								key={i}
								secondaryAction={
									<IconButton edge="end" onClick={() => handleDelete(advice)}>
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
								<ListItemText primary={advice.name} />
							</ListItem>
						);
					})}
				</List>
			) : (
				<></>
			)}
			<AdvicesModal
				showModal={showModal}
				setShowModal={setShowModal}
				selectedAdvices={selectedAdvices}
				setSelectedAdvices={setSelectedAdvices}
				advicesArray={advicesArray}
				advicesList={advicesList}
			/>
		</Box>
	);
}

export default Advices;
