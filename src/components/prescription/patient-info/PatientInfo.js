import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PatientModal from "./PatientModal";

function PatientInfo() {
  const patientInfo = useSelector((state) => state.Prescription.patientInfo);

  const [open, setOpen] = useState(false);

  return (
    <Box
      border="solid 1px black"
      borderLeft="none"
      borderRight="none"
      padding="6px 16px"
      justifyContent="center"
    >
      <Box
        display="grid"
        gridTemplateColumns="8fr 3fr 5fr 8fr 6fr 1fr"
        alignItems="center"
      >
        <Typography fontSize="1rem" fontWeight="500">
          Name : {patientInfo.name}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Age : {patientInfo.age}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Gender : {patientInfo.gender}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Mobile : {patientInfo.phone}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Date : {new Date().toISOString().slice(0, 10)}
        </Typography>
        <Button
          size="small"
          sx={{ fontSize: "1.25rem", padding: "0" }}
          onClick={() => setOpen(true)}
        >
          +
        </Button>
      </Box>
      <PatientModal open={open} setOpen={setOpen} />
    </Box>
  );
}

export default PatientInfo;
