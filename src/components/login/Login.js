import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import bg from "../assets/bg.jpg";

function Login() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/api/auth/login`,
				data
			);
			if (response?.data?.accessToken) {
				localStorage.setItem("RxAccessToken", response?.data?.accessToken);
				localStorage.setItem("RxRole", response?.data?.userInfo?.roles);
				setLoading(false);
				// window.location("/");
				navigate("/");
			} else {
				alert("invalid login");
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<Box
			height="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{
				backgroundImage: `url(${bg})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundColor: "#ffffffD9",
					width: "fit-content",
					padding: "30px",
					borderRadius: "6px",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "info.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Log in
				</Typography>

				<Box sx={{ mt: 1 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						{" "}
						<TextField
							margin="normal"
							fullWidth
							label="Username"
							name="userName"
							autoFocus
							{...register("userName", { required: "Username is required" })}
							error={Boolean(errors.userName)}
							helperText={errors.userName?.message}
						/>
						<TextField
							margin="normal"
							fullWidth
							label="Password"
							type="password"
							{...register("password", { required: "Password is required" })}
							error={Boolean(errors.password)}
							helperText={errors.password?.message}
						/>
						{loading ? (
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								<BeatLoader color="white" size="12px" />
							</Button>
						) : (
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, bgcolor: "info.main" }}
							>
								Submit
							</Button>
						)}
					</form>
				</Box>
			</Box>
		</Box>
	);
}

export default Login;
