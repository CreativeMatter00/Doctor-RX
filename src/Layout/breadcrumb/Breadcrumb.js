import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { MdDoubleArrow } from "react-icons/md";
import { useDispatch } from "react-redux";
import { handleAddOpen } from "../../Reducer/ModalSlice";

export default function Breadcrumb({ breadTitle }) {
	const dispatch = useDispatch();
	return (
		<Box
			sx={{
				display: "flex",
				backgroundColor: "#0d2f9489",
				justifyContent: "space-between",
				borderRadius: "4px",
				padding: "5px",
				marginBottom: "10px",
				minWidth: "285px",
			}}
		>
			<Typography
				sx={{
					fontWeight: 600,
					display: "flex",
					alignItems: "center",
					padding: "6px",
				}}
			>
				<MdDoubleArrow sx={{ mr: "5px" }} /> &nbsp; {breadTitle}
			</Typography>
			<Button
				size="small"
				variant="contained"
				color="success"
				onClick={() => {
					dispatch(handleAddOpen());
				}}
			>
				{" "}
				Add{" "}
			</Button>
		</Box>
	);
}
