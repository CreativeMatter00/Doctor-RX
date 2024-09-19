import "../Navbar/navbar.scss";
import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import Admin from "../../Images/Admin.jpg";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { handleAddOpen } from "../../Reducer/ModalSlice";
import { Box } from "@mui/system";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Navbar = () => {
	const open = useSelector((state) => state.NavSidebar.open);

	const [anchorEl, setAnchorEl] = useState(null);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.removeItem("RxAccessToken");
		localStorage.removeItem("RxRole");
		// window.location.href = `/${process.env.REACT_APP_BASENAME}/login`;
		window.location.href = "/login";
	};

	return (
		<AppBar
			className="navbar"
			position="fixed"
			open={open}
			sx={{ backgroundColor: "#2a334e" }}
		>
			<Toolbar>
				{/* <IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={() => {
						dispatch(handleDrawerOpen());
					}}
					edge="start"
					sx={{
						marginRight: 5,
						...(open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton> */}
				{/* <Typography variant="h7" noWrap component="div" sx={{ flexGrow: 1 }}>
					ATI Limited
				</Typography> */}
				<Box sx={{ flexGrow: 1, alignItems: "center" }}>
					<img
						src={`${process.env.PUBLIC_URL}/assets/images/ati-logo.png`}
						alt="ATI"
						style={{ maxHeight: "50px" }}
					/>
				</Box>
				<div>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<Avatar src={Admin} alt="Admin" />
					</IconButton>
					<Menu
						className="avatar-list-div"
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={logout}>
							<ExitToAppIcon sx={{ mr: 1 }} />
							Logout
						</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
