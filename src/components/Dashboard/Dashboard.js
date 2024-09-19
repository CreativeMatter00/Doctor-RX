import { Typography, Box } from "@mui/material";
import React from "react";
import { FaUserInjured } from "react-icons/fa";
import { RiUserHeartFill, RiUserReceivedFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handletabValue } from "../../Reducer/ModalSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectTodayPatient = () => {
    dispatch(handletabValue(0));
    // navigate("/appointed-patients");
  };

  const redirectUpcomingAppointment = () => {
    dispatch(handletabValue(1));
    // navigate("/appointed-patients");
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        padding: "20px",
        color: "#141D48",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FFE2E6",
          borderRadius: "10px",
          minHeight: "150px",
          padding: "20px",
          cursor: "pointer",
        }}
        onClick={redirectTodayPatient}
      >
        <Box
          sx={{
            width: "fit-content",
            backgroundColor: "#FA5A7E",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <FaUserInjured size="24px" color="white" />
        </Box>
        <Typography variant="h6" sx={{ marginTop: "14px" }}>
          Today Patients:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          40
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#FFF4DE",
          borderRadius: "10px",
          minHeight: "150px",
          padding: "20px",
          cursor: "pointer",
        }}
        onClick={redirectUpcomingAppointment}
      >
        <Box
          sx={{
            width: "fit-content",
            backgroundColor: "#FF947A",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <RiUserHeartFill size="24px" color="white" />
        </Box>
        <Typography variant="h6" sx={{ marginTop: "14px" }}>
          Upcoming Appointments:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          60
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#DCFCE7",
          borderRadius: "10px",
          minHeight: "150px",
          padding: "20px",
          cursor: "pointer",
        }}
        // onClick={() => navigate("/patient-info")}
      >
        <Box
          sx={{
            width: "fit-content",
            backgroundColor: "#3CD856",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <RiUserReceivedFill size="24px" color="white" />
        </Box>
        <Typography
          variant="h6"
          sx={{ marginTop: "14px" }}
        >
          Total Patients:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          120
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
