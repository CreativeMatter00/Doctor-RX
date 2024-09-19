import React from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleViewClose } from "../../Reducer/ModalSlice";
import CloseIcon from "@mui/icons-material/Close";

function ViewModal({ children, ModalWidth, ModalTitle }) {
	const view = useSelector((state) => state.Modal.view);
	const dispatch = useDispatch();

	return (
		<Dialog
			onClose={() => {
				dispatch(handleViewClose());
			}}
			open={view}
			fullWidth={true}
			maxWidth={ModalWidth}
		>
			<DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
				<span>{ModalTitle}</span>
				<IconButton
					onClick={() => {
						dispatch(handleViewClose());
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

export default ViewModal;
