import React from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

function MedicineCategoryEditForm({ data, setData, reload, setReload }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const onSubmit = (categoryData) => {
		console.log(data);
		fetch(`${process.env.REACT_APP_API_URL}/api/category/${data.id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				slNo: parseInt(data.slNo),
				categoryName: data.categoryName,
				shortName: data.shortName,
				description: data.description,
				activeStatus: parseInt(data.activeStatus),
			}),
		})
			.then((res) => res.json())
			.then((genericData) => {
				if (genericData.success) {
					setReload(!reload);
				} else {
					alert("Something went wrong, Try again");
				}
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box padding="10px">
				<Typography variant="h4" textAlign="center">
					Edit Category
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
						<Typography variant="p">Category Name</Typography>
						<TextField
							{...register("categoryName", { required: true })}
							fullWidth
							value={data.categoryName}
							error={errors.categoryName ? true : false}
							size="small"
							onChange={handleChange}
						/>
					</Box>
					{errors.genericName?.type === "required" && (
						<p style={{ color: "red", fontSize: "12px" }}>
							Category Name is required*
						</p>
					)}
					<Box marginBottom="10px">
						<Typography variant="p">Category Short Name</Typography>
						<TextField
							{...register("shortName", { required: true })}
							fullWidth
							value={data.shortName}
							size="small"
							onChange={handleChange}
							error={errors.shortName ? true : false}
						/>
						{errors.shortName?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Category Short Name is required*
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
					</Box>
					{errors.description?.type === "required" && (
						<p style={{ color: "red", fontSize: "12px" }}>
							Description is required*
						</p>
					)}
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
						<Button
							type="submit"
							size="small"
							variant="contained"
							color="success"
						>
							EDIT
						</Button>
					</Box>
				</Box>
			</Box>
		</form>
	);
}

export default MedicineCategoryEditForm;
