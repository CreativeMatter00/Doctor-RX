import React, { useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Beatloader from "react-spinners/BeatLoader";

function ManufacturerEditForm({ data, setData, reload, setReload }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const [loading, setLoading] = useState(false);

	const onSubmit = (manufacturerData) => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_URL}/api/manufacturer/${data.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				slNo: parseInt(data.slNo),
				manufacturerName: data.manufacturerName,
				description: data.description,
				activeStatus: parseInt(data.activeStatus),
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
					Edit Medicine
				</Typography>
				<Box padding="20px 0">
					<Box marginBottom="10px">
						<Typography variant="p">Serial No</Typography>
						<TextField
							{...register("slNo", { required: true })}
							fullWidth
							size="small"
							value={data.slNo}
							error={errors.slNo ? true : false}
							onChange={handleChange}
						/>
						{errors.slNo?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Serial No is required*
							</p>
						)}
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p">Manufacturer Name :</Typography>
						<TextField
							{...register("manufacturerName", { required: true })}
							fullWidth
							value={data.manufacturerName}
							error={errors.manufacturerName ? true : false}
							size="small"
							onChange={handleChange}
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
							value={data.description}
							error={errors.description ? true : false}
							size="small"
							onChange={handleChange}
						/>
						{errors.description?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Description is required*
							</p>
						)}
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Active Status</Typography>
						<TextField
							{...register("activeStatus", { required: true })}
							select
							fullWidth
							value={data.activeStatus}
							error={errors.activeStatus ? true : false}
							size="small"
							onChange={handleChange}
						>
							<MenuItem value={0}>Inactive</MenuItem>
							<MenuItem value={1}>Active</MenuItem>
						</TextField>
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
								// onClick={handleSubmit}
								type="submit"
							>
								EDIT
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</form>
	);
}

export default ManufacturerEditForm;
