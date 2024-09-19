import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { handleDrawerClose } from '../Reducer/NavSidebarSlice';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Box } from "@mui/material";

export default function NavSidebar() {

    const dispatch = useDispatch();

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    useEffect(() => {
        if (vw < 800) {
            dispatch(handleDrawerClose())
        }
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar />
            <Sidebar />
        </Box >
    );
}
