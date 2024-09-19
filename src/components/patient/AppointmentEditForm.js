import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { handleAppointmentClose } from "../../Reducer/ModalSlice";

function AppointmentEditForm() {
	const patientInfo = useSelector((state) => state.Modal.val);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const onSubmit = (data, e) => {
		setLoading(true);
		fetch(
			`${process.env.REACT_APP_API_URL}/api/patientInfo/editWithAppointment/${patientInfo.id}`,
			{
				method: "PATCH",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					appointmentDate: data.appointmentDate,
					patientAppoinInfos: [
						{
							appointmentDate: data.appointmentDate,
						},
					],
				}),
			}
		).then((res) => {
			if (res.status === 200) {
				dispatch(handleAppointmentClose());
				setLoading(false);
			} else {
				setLoading(false);
				console.log(res);
			}
		});
	};

	const { register, handleSubmit } = useForm();

	return (
		<Box padding="0 20px 20px 20px">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="p">Appointment Date</Typography>
				<TextField
					fullWidth
					size="small"
					type="date"
					defaultValue={patientInfo.appointmentDate?.slice(0, 10)}
					{...register("appointmentDate")}
				/>
				<Box marginTop="20px" display="flex" justifyContent="center">
					{loading ? (
						<SyncLoader color="#1565C0" />
					) : (
						<Button fullWidth type="submit" size="small" variant="contained">
							Edit
						</Button>
					)}
				</Box>
			</form>
		</Box>
	);
}

export default AppointmentEditForm;
