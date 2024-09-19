import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Beatloader from "react-spinners/BeatLoader";

function ManufacturerAddForm({ data, setData, reload, setReload }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const [loading, setLoading] = useState(false);

	const onSubmit = (data) => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_URL}/api/manufacturer`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				slNo: parseInt(data.slNo),
				manufacturerName: data.manufacturerName,
				description: data.description,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					setReload(!reload);
					setLoading(false);
				} else {
					alert("Something went wrong, Try again");
					setLoading(false);
				}
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box padding="10px">
				<Typography variant="h4" textAlign="center">
					Add Manufacturer
				</Typography>
				<Box padding="20px 0">
					<Box marginBottom="10px">
						<Typography variant="p">Serial No</Typography>
						<TextField
							{...register("slNo", { required: true })}
							fullWidth
							size="small"
							type="number"
							error={errors.slNo ? true : false}
						/>
						{errors.slNo?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Serial No is required*
							</p>
						)}
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Manufacturer Name</Typography>
						<TextField
							{...register("manufacturerName", { required: true })}
							fullWidth
							size="small"
							error={errors.manufacturerName ? true : false}
						/>
						{errors.manufacturerName?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Manufacturer Name is required*
							</p>
						)}
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Description</Typography>
						<TextField
							{...register("description", { required: true })}
							fullWidth
							size="small"
							error={errors.description ? true : false}
						/>
						{errors.description?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Description is required*
							</p>
						)}
					</Box>

					<Box display="flex" justifyContent="end">
						{loading ? (
							<Button size="small" variant="contained" color="success">
								<Beatloader size="13px" color="#fff" />
							</Button>
						) : (
							<Button
								size="small"
								variant="contained"
								color="success"
								type="submit"
							>
								ADD
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</form>
	);
}

export default ManufacturerAddForm;
