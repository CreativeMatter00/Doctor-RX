import React from "react";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Beatloader from "react-spinners/BeatLoader";
import { useState } from "react";

function ExaminationAddForm({ reload, setReload }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/onexam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slNo: parseInt(data.slNo),
        name: data.name,
        description: data.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReload(!reload);
          setLoading(false);
          reset();
        } else {
          alert("Something went wrong, Try again");
          setLoading(false);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box padding="10px">
        <Typography variant="h4" textAlign="center">
          <Tooltip
            title={<span>User Defined Serial Number</span>}
            arrow
            placement="top"
            sx={{ fontSize: "0.875rem" }} // You can add more styles here
          >
             Add Examinations
          </Tooltip>
        </Typography>
        <Box padding="20px 0">
          <Box marginBottom="10px">
            <Typography variant="p">UD: Serial No</Typography>
            <TextField
              {...register("slNo", { required: true })}
              fullWidth
              size="small"
              type="number"
              error={errors.slNo ? true : false}
            />
            {errors.slNo?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Serial No is required*
              </p>
            )}
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Examination Name</Typography>
            <TextField
              {...register("name", { required: true })}
              fullWidth
              size="small"
              error={errors.name ? true : false}
            />
            {errors.name?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Examination Name is required*
              </p>
            )}
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Description</Typography>
            <TextField
              {...register("description", { required: true })}
              fullWidth
              size="small"
              error={errors.description ? true : false}
            />
            {errors.description?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Description is required*
              </p>
            )}
          </Box>

          <Box display="flex" justifyContent="end">
            {loading ? (
              <Button size="small" variant="contained" color="success">
                <Beatloader size="13px" color="#fff" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="success"
              >
                ADD
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
}

export default ExaminationAddForm;
