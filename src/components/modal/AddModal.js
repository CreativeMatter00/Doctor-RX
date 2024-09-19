import React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleAddClose } from "../../Reducer/ModalSlice";
import CloseIcon from "@mui/icons-material/Close";

function AddModal({ children, ModalWidth, ModalTitle }) {
	const add = useSelector((state) => state.Modal.add);
	const dispatch = useDispatch();

	return (
		<Dialog
			onClose={() => {
				dispatch(handleAddClose());
			}}
			open={add}
			fullWidth={true}
			maxWidth={ModalWidth}
		>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
				<span>{ModalTitle}</span>
				<IconButton
					onClick={() => {
						dispatch(handleAddClose());
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

export default AddModal;
