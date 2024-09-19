import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

function FooterEdit({ footer, value, setValue }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		fetch(
			`${process.env.REACT_APP_API_URL}/api/presfooter/668224702867a3e6d97eca7e`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		).then((res) => {
			if (res.status === 200) {
				setValue(!value);
			} else {
				alert("something went wrong");
			}
		});
	};

	return (
		<Box padding="20px">
			<Typography variant="h4" textAlign="center" paddingBottom="20px">
				Edit Footer
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="p" fontWeight="400">
					Hospital Name:
				</Typography>
				<TextField
					fullWidth
					size="small"
					defaultValue={footer[0]?.hospitalName}
					{...register("hospitalName", {
						required: "Hospital Name is required",
					})}
					error={Boolean(errors.hospitalName)}
					helperText={errors.hospitalName?.message}
				/>
				<Typography variant="p" fontWeight="400">
					Address:
				</Typography>
				<TextField
					fullWidth
					size="small"
					defaultValue={footer[0]?.address}
					{...register("address", {
						required: "Hospital Name is required",
					})}
					error={Boolean(errors.address)}
					helperText={errors.address?.message}
				/>
				<Typography variant="p" fontWeight="400">
					Helpline:
				</Typography>
				<TextField
					fullWidth
					size="small"
					defaultValue={footer[0]?.helpline}
					{...register("helpline")}
				/>
				<Typography variant="p" fontWeight="400">
					Email:
				</Typography>
				<TextField
					fullWidth
					size="small"
					defaultValue={footer[0]?.email}
					{...register("email")}
				/>
				<Typography variant="p" fontWeight="400">
					Serial Phone Number:
				</Typography>
				<TextField
					fullWidth
					size="small"
					defaultValue={footer[0]?.serialPhoneNumber}
					{...register("serialPhoneNumber")}
				/>
				<Stack alignItems="center" padding="10px">
					<Button variant="contained" color="success" type="submit">
						Edit
					</Button>
				</Stack>
			</form>
		</Box>
	);
}

export default FooterEdit;
