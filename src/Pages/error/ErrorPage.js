import React from "react";
import { Box, Button } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "10%" }}>
      <ReportGmailerrorredIcon sx={{ fontSize: "100px" }} />

      <h1 style={{ marginBottom: "15px", color: "red" }}>404 Error</h1>
      <h2 style={{ marginBottom: "15px" }}>Page Not Found</h2>
      <Link to="/">
        <Button variant="outlined">Back To Home</Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
