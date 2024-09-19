import { Box, Paper } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';

function HeaderFooterNavbar() {
  return (
    <Paper
      className="setup-navbar"
      elevation={6}
      style={{
        backgroundColor: "#0d2f9489",
        display: "flex",
        justifyContent: "space-around",
        margin: "70px 10px 10px 76px",
      }}
    >
      <NavLink to="/doctor-info/header">
        <Box> Header </Box>
      </NavLink>
      <NavLink to="/doctor-info/footer">
        <Box> Footer </Box>
      </NavLink>
    </Paper>
  );
}

export default HeaderFooterNavbar