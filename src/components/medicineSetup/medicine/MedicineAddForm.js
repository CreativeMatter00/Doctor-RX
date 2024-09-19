import React from "react";
import {
	Autocomplete,
	Box,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import Beatloader from "react-spinners/BeatLoader";
import { useState } from "react";

function MedicineAddForm({ data, setData, reload, setReload }) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [medicineGeneric] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/medicineGeneric`
	);

	const [manufacturer] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/manufacturer`
	);

	const [category] = useFetch(`${process.env.REACT_APP_API_URL}/api/category`);

	console.log(manufacturer);

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const onSubmit = (medicinedata) => {
		setLoading(true);

		fetch(`${process.env.REACT_APP_API_URL}/api/medicine`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				slNo: parseInt(medicinedata.slNo),
				medicineName: medicinedata.medicineName,
				medicineGenericeId: medicinedata.medicineGenericeId,
				description: medicinedata.description,
				manufacturerId: medicinedata.manufacturerId,
				categoryId: medicinedata.categoryId,
				strength: medicinedata.strength,
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
					Add Medicine
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
						<Typography variant="p">Medicine Name</Typography>
						<TextField
							{...register("medicineName", { required: true })}
							fullWidth
							size="small"
							error={errors.medicineName ? true : false}
						/>
						{errors.medicineName?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Medicine Name is required*
							</p>
						)}
					</Box>
					{/* <Box marginBottom="10px">
						<Typography variant="p">Generic Id</Typography>
						<Autocomplete
							fullWidth
							size="small"
							name="medicineGenericeId"
							options={medicineGeneric}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							onChange={(e, value) =>
								setData({ ...data, medicineGenericeId: value.id })
							}
							getOptionLabel={(option) => `${option.genericName}`}
							renderInput={(params) => (
								<TextField
									{...params}
									error={errors.medicineGenericeId ? true : false}
								/>
							)}
						/>
						{errors.medicineGenericeId?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Generic Id is required*
							</p>
						)}
					</Box> */}

					<Box marginBottom="10px">
						<Typography variant="p">Generic Id</Typography>
						<Controller
							name="medicineGenericeId"
							control={control}
							rules={{
								required: "Generic is requried",
							}}
							render={({ field, fieldState: { error } }) => {
								const { onChange, value, ref } = field;
								return (
									<>
										<Autocomplete
											size="small"
											disableClearable
											value={
												value
													? medicineGeneric.find((option) => {
															return value === option.id;
													  }) ?? null
													: null
											}
											getOptionLabel={(option) => {
												return option.genericName;
											}}
											onChange={(event, newValue) => {
												onChange(newValue ? newValue.id : null);
											}}
											options={medicineGeneric}
											renderInput={(params) => (
												<TextField
													{...params}
													inputRef={ref}
													error={errors.medicineGenericeId ? true : false}
												/>
											)}
										/>
										{errors.medicineGenericeId?.type === "required" && (
											<p style={{ color: "red", fontSize: "12px" }}>
												Generic Id is required*
											</p>
										)}
									</>
								);
							}}
						/>
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p">Medicine Category</Typography>
						<Controller
							name="categoryId"
							control={control}
							rules={{
								required: "Category is requried",
							}}
							render={({ field, fieldState: { error } }) => {
								const { onChange, value, ref } = field;
								return (
									<>
										<Autocomplete
											size="small"
											disableClearable
											value={
												value
													? category.find((option) => {
															return value === option.id;
													  }) ?? null
													: null
											}
											getOptionLabel={(option) => {
												return option.categoryName;
											}}
											onChange={(event, newValue) => {
												onChange(newValue ? newValue.id : null);
											}}
											options={category}
											renderInput={(params) => (
												<TextField
													{...params}
													inputRef={ref}
													error={errors.categoryId ? true : false}
												/>
											)}
										/>
										{errors.categoryId?.type === "required" && (
											<p style={{ color: "red", fontSize: "12px" }}>
												Category is required*
											</p>
										)}
									</>
								);
							}}
						/>
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p">Strength</Typography>
						<TextField
							{...register("strength", { required: true })}
							fullWidth
							size="small"
							error={errors.strength ? true : false}
						/>
						{errors.strength?.type === "required" && (
							<p style={{ color: "red", fontSize: "12px" }}>
								Strength is required*
							</p>
						)}
					</Box>

					<Box marginBottom="10px">
						<Typography variant="p">Manufacturer</Typography>
						<Controller
							name="manufacturerId"
							control={control}
							rules={{
								required: "Manufacturer is requried",
							}}
							render={({ field, fieldState: { error } }) => {
								const { onChange, value, ref } = field;
								return (
									<>
										<Autocomplete
											size="small"
											disableClearable
											value={
												value
													? manufacturer.find((option) => {
															return value === option.id;
													  }) ?? null
													: null
											}
											getOptionLabel={(option) => {
												return option.manufacturerName;
											}}
											onChange={(event, newValue) => {
												onChange(newValue ? newValue.id : null);
											}}
											options={manufacturer}
											renderInput={(params) => (
												<TextField
													{...params}
													inputRef={ref}
													error={errors.manufacturerId ? true : false}
												/>
											)}
										/>
										{errors.manufacturerId?.type === "required" && (
											<p style={{ color: "red", fontSize: "12px" }}>
												Manufacturer is required*
											</p>
										)}
									</>
								);
							}}
						/>
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

export default MedicineAddForm;
