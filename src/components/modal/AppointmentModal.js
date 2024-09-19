import React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleAppointmentClose } from "../../Reducer/ModalSlice";
import CloseIcon from "@mui/icons-material/Close";

function AppointmentModal({ children, ModalWidth, ModalTitle }) {
	const appointment = useSelector((state) => state.Modal.appointment);
	const dispatch = useDispatch();

	return (
		<Dialog
			onClose={() => {
				dispatch(handleAppointmentClose());
			}}
			open={appointment}
			fullWidth={true}
			maxWidth={ModalWidth}
		>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
				<span>{ModalTitle}</span>
				<IconButton
					onClick={() => {
						dispatch(handleAppointmentClose());
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers style={{ padding: "0px" }}>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export default AppointmentModal;
