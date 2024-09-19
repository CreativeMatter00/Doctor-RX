import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PatientAddForm from "../../patient/PatientAddForm";

function PatientModal({ open, setOpen }) {
	var prescriptionPage = true;

	return (
		<Dialog onClose={() => setOpen(false)} open={open} maxWidth="md">
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
				<span> Patient Info </span>
				<IconButton onClick={() => setOpen(false)}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent dividers style={{ padding: "16px 0px" }}>
				<PatientAddForm setOpen={setOpen} prescriptionPage={prescriptionPage} />
			</DialogContent>
		</Dialog>
	);
}

export default PatientModal;
