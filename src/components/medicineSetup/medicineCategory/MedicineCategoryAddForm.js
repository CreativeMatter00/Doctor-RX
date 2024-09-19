import React, { useState } from "react";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

function MedicineCategoryAddForm({ reload, setReload }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slNo: parseInt(data.slNo),
        categoryName: data.categoryName,
        shortName: data.shortName,
        description: data.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReload(!reload);
          setLoading(false);
        } else {
          console.log(data);
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
            Add Category
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
            <Typography variant="p">Category Name</Typography>
            <TextField
              {...register("categoryName", { required: true })}
              fullWidth
              size="small"
              error={errors.categoryName ? true : false}
            />
            {errors.categoryName?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Category Name is required*
              </p>
            )}
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Category Short Name</Typography>
            <TextField
              {...register("shortName", { required: true })}
              fullWidth
              size="small"
              error={errors.shortName ? true : false}
            />
            {errors.shortName?.type === "required" && (
              <p style={{ color: "red", fontSize: "12px" }}>
                Category Name is required*
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
                <BeatLoader size="13px" color="#fff" />
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

export default MedicineCategoryAddForm;
