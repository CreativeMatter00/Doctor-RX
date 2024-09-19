import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleEditClose } from "../../Reducer/ModalSlice";
import CloseIcon from "@mui/icons-material/Close";

function EditModal({ children, ModalWidth, ModalTitle }) {
	const edit = useSelector((state) => state.Modal.edit);
	const dispatch = useDispatch();

	return (
		<Dialog
			onClose={() => {
				dispatch(handleEditClose());
			}}
			open={edit}
			fullWidth={true}
			maxWidth={ModalWidth}
		>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
				<span>{ModalTitle}</span>
				<IconButton
					onClick={() => {
						dispatch(handleEditClose());
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent dividers style={{ padding: " 0px" }}>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export default EditModal;
