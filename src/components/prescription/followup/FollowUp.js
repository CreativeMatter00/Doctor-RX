import {
	Button,
	FormControl,
	InputAdornment,
	OutlinedInput,
	Popover,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFollowUp } from "../../../Reducer/PrescriptionSlice";

function FollowUp() {
	const preselected = useSelector((state) => state.Prescription.followUp);
	const [value, setValue] = useState();

	const dispatch = useDispatch(preselected || "");
	useEffect(() => {
		dispatch(handleFollowUp(value));
	}, [value, dispatch]);

	useEffect(() => {
		setValue(preselected);
	}, [preselected]);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<>
			<Button onClick={handleClick}>Follow Up</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
					<OutlinedInput
						autoFocus={true}
						size="small"
						type="number"
						endAdornment={<InputAdornment position="end">Days</InputAdornment>}
						onChange={(e) => setValue(e.target.value)}
						value={value || ""}
					/>
				</FormControl>
			</Popover>
			{value && (
				<Typography sx={{ padding: "10px 0" }}>
					{" "}
					Please visit again after {value} days
				</Typography>
			)}
		</>
	);
}

export default FollowUp;
