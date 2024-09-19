import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function HeaderEdit({ header, value, setValue }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/presheader/6681205ef7e3991913e8a409`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((res) => {
      if (res.status === 200) {
        setValue(!value);
      } else {
        console.log("Couldn't fetch header data from DB");
        alert("something went wrong");
      }
    });
  };

  return (
    <Box padding="20px">
      <Typography variant="h4" textAlign="center" paddingBottom="20px">
        Edit Header
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="p" fontWeight="400">
          Doctor Name:
        </Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue={header[0]?.doctorName}
          {...register("doctorName", {
            required: "Doctor Name is required",
          })}
          error={Boolean(errors.doctorName)}
          helperText={errors.doctorName?.message}
        />
        <Typography variant="p" fontWeight="400">
          Doctor Major Degree:
        </Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue={header[0]?.doctorMajorDegree}
          {...register("doctorMajorDegree", {
            required: "Doctor Major Degree is required",
          })}
          error={Boolean(errors.doctorMajorDegree)}
          helperText={errors.doctorMajorDegree?.message}
        />
        <Typography variant="p" fontWeight="400">
          Doctor Minor Degree:
        </Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue={header[0]?.doctorMinorDegree}
          {...register("doctorMinorDegree")}
        />
        <Typography variant="p" fontWeight="400">
          Training:
        </Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue={header[0]?.training}
          {...register("training")}
        />
        <Typography variant="p" fontWeight="400">
          Speciality:
        </Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue={header[0]?.specialist}
          {...register("specialist")}
        />
        <Typography variant="p" fontWeight="400">
          Hospital name:
        </Typography>
        <TextField
          fullWidth
          size="small"
          defaultValue={header[0]?.hospitalName}
          {...register("hospitalName", {
            required: "Hospital Name is required",
          })}
          error={Boolean(errors.hospitalName)}
          helperText={errors.hospitalName?.message}
        />
        <Stack alignItems="center" padding="10px">
          <Button variant="contained" color="info" type="submit">
            Edit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default HeaderEdit;
