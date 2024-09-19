import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function PatientInfo() {
  const patientInfo = useSelector((state) => state.Prescription.patientInfo);
  console.log(patientInfo);
  return (
    <Box
      // border="solid 1px black"
      // borderLeft="none"
      // borderRight="none"
      padding="6px 16px"
      justifyContent="center"
    >
      <Box
        display="grid"
        gridTemplateColumns="8fr 3fr 5fr 8fr 6fr"
        alignItems="center"
      >
        <Typography fontSize="1rem" fontWeight="500">
          Name :{patientInfo.name}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Age :{patientInfo.age}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Gender :{patientInfo.gender}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          Mobile :{patientInfo.phone}
        </Typography>
        <Typography fontSize="1rem" fontWeight="500">
          {/* Date :{patientInfo.date} */}
          Date : {new Date().toISOString().slice(0, 10)}
        </Typography>
      </Box>
    </Box>
  );
}

export default PatientInfo;
