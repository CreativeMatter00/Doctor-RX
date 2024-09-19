import React from "react";
import {
	Autocomplete,
	Box,
	Button,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import Beatloader from "react-spinners/BeatLoader";
import { useState } from "react";

function MedicineEditForm({ data, setData, reload, setReload }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const [medicineGeneric] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/medicineGeneric`
	);

	const [category] = useFetch(`${process.env.REACT_APP_API_URL}/api/category`);

	const [manufacturer] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/manufacturer`
	);
	console.log(data);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};
	const [loading, setLoading] = useState(false);

	console.log(data);

	const onSubmit = (medicineData) => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_URL}/api/medicine/${data.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				slNo: parseInt(data.slNo),
				medicineName: data.medicineName,
				medicineGenericeId: data.medicineGenericeId,
				categoryId: data.categoryId,
				strength: data.strength,
				manufacturerId: data.manufacturerId,
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
						<Typography variant="p">Medicine Name</Typography>
						<TextField
							{...register("medicineName", { required: true })}
							fullWidth
							value={data.medicineName}
							error={errors.medicineName ? true : false}
							size="small"
							onChange={handleChange}
						/>
						{errors.medicineName?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Medicine Name is required*
							</p>
						)}
					</Box>
					<Box marginBottom="10px">
						<Typography variant="p">Generic Id</Typography>
						<Autocomplete
							fullWidth
							disableClearable
							size="small"
							name="medicineGenericeId"
							options={medicineGeneric}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							onChange={(e, value) =>
								setData({
									...data,
									medicineGeneric: value,
									medicineGenericeId: value.id,
								})
							}
							getOptionLabel={(option) => `${option.genericName}`}
							renderInput={(params) => <TextField {...params} />}
							value={data.medicineGeneric}
						/>
						{errors.medicineGenericeId?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Generic Id is required*
							</p>
						)}
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p">Medicine Category</Typography>
						<Autocomplete
							fullWidth
							disableClearable
							size="small"
							name="categoryId"
							options={category}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							onChange={
								(e, value) =>
									setData({ ...data, category: value, categoryId: value.id })
								// console.log(value.id)
							}
							getOptionLabel={(option) => `${option.categoryName}`}
							renderInput={(params) => <TextField {...params} />}
							value={data.category}
						/>
						{errors.categoryId?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Medicine Category is required*
							</p>
						)}
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p"> Strength </Typography>
						<TextField
							{...register("strength", { required: true })}
							fullWidth
							value={data.strength}
							error={errors.strength ? true : false}
							size="small"
							onChange={handleChange}
						/>
						{errors.strength?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Strength is required*
							</p>
						)}
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p">Manufacturer</Typography>
						<Autocomplete
							fullWidth
							disableClearable
							size="small"
							name="manufacturerId"
							options={manufacturer}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							onChange={
								(e, value) =>
									setData({
										...data,
										medicineManufacturer: value,
										manufacturerId: value.id,
									})
								// console.log(value.id)
							}
							getOptionLabel={(option) => `${option.manufacturerName}`}
							renderInput={(params) => <TextField {...params} />}
							value={data.medicineManufacturer}
						/>
						{errors.manufacturerId?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Manufacturer is required*
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

export default MedicineEditForm;
