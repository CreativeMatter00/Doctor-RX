import "../Sidebar/sidebar.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItem } from "@mui/material";
import {
	RiDashboardLine,
	RiMedicineBottleFill,
	RiUserHeartFill,
} from "react-icons/ri";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import logo from "../../Images/drug-logo.png";
import { FaUserInjured, FaFilePrescription, FaUserMd } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { AiFillMedicineBox } from "react-icons/ai";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const Sidebar = () => {
	const role = localStorage.getItem("RxRole");

	return (
		<Drawer className="sidebar" variant="permanent" open={false}>
			<DrawerHeader className="sidebar">
				<img
					src={logo}
					style={{
						height: "30px",
						width: "150px",
						marginTop: "10px",
						marginRight: "15px",
					}}
					alt="logo"
				/>
			</DrawerHeader>

			<List className="sidebar-list-container">
				<NavLink to="/">
					<Tooltip title="Dashboard" placement="right-end">
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<RiDashboardLine className="icon" />
								</ListItemIcon>
								<ListItemText primary="Dashboard" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</NavLink>

				<NavLink to="/setup/complaints">
					<Tooltip title="Setup" placement="right-end">
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<SettingsApplicationsIcon className="icon" />
								</ListItemIcon>
								<ListItemText primary="Setup" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</NavLink>

				{/* {role === "admin" && (
					<NavLink to="/medicine-setup/medicine-category">
						<Tooltip title="Medicine Setup" placement="right-end">
							<ListItem>
								<ListItemButton>
									<ListItemIcon>
										<RiMedicineBottleFill className="icon" />
									</ListItemIcon>
									<ListItemText primary="Medicine Setup" />
								</ListItemButton>
							</ListItem>
						</Tooltip>
					</NavLink>
				)} */}

				<NavLink to="/doctor-info/header">
					<Tooltip title="Doctor Info" placement="right-end">
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<FaUserMd className="icon" />
								</ListItemIcon>
								<ListItemText primary="Doctor Info" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</NavLink>

				{/* <NavLink to="/patient-info">
					<Tooltip title="Patient Information" placement="right-end">
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<RiUserHeartFill className="icon" />
								</ListItemIcon>
								<ListItemText primary="Patient Information" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</NavLink> */}

				<NavLink to="/appointed-patients">
					<Tooltip title="Appointed Patients" placement="right-end">
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<FaUserInjured className="icon" />
								</ListItemIcon>
								<ListItemText primary="Appointed Patients" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</NavLink>

				<NavLink to="/prescription">
					<Tooltip title="Prescription" placement="right-end">
						<ListItem>
							<ListItemButton>
								<ListItemIcon>
									<FaFilePrescription className="icon" />
								</ListItemIcon>
								<ListItemText primary="Prescription" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</NavLink>
			</List>
		</Drawer>
	);
};

export default Sidebar;
