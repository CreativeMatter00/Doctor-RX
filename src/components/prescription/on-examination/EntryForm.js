import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SyncLoader } from "react-spinners";
import { handleAddClose, handleEditOpen } from "../../../Reducer/ModalSlice";
import styled from "@emotion/styled";

const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  lineHeight: "1",
  color: "red",
  margin: "6px 0",
}));

function EntryForm({ setOpen, prescriptionPage }) {
  const dispatch = useDispatch();
  console.log(new Date());

  // Functions of hookform

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      anaemia: "Anaemia",
      oedema: "Oedema",
      testicularVolume: "Testicular volume",
      tremor: "Tremor",
      temperature: 98,
      heightFt: 5,
      heightIn: 7,
      acne: "Acne",
      spl: "SPL",
    },
  });

  const [medicineHistory, setMedicineHistory] = useState([{}]);

  const [loading, setLoading] = useState(false);

  // Function for form Submission

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);

    const formattedData = {
      anaemia: data.anaemia,
      oedema: data.oedema,
      testicularVolume: data.testicularVolume,
      tremor: data.tremor,
      temperature: Number(data.temperature),
      heightFt: Number(data.heightFt),
      heightIn: Number(data.heightIn),
      acne: data.acne,
      spl: data.spl,
      pulse: Number(data.pulse),
      systolic: Number(data.systolic),
      diastolic: Number(data.diastolic),
      o2Saturation: Number(data.o2Saturation),
      jaundice: data.jaundice,
      striae: data.striae,
      acanthosis: data.acanthosis,
      thyroid: data.thyroid,
      clubbing: data.clubbing,
      cyanosis: data.cyanosis,
      leukonychia: data.leukonychia,
      height: data.height,
      trannerStage: data.trannerStage,
      hirsutism: data.hirsutism,
      upperSegment: data.upperSegment,
      lowerSegment: data.lowerSegment,
      koilonychia: data.koilonychia,
      eye: data.eye,
    };

    // dispatch(handlePatientInfo(data));

    // fetch(`${process.env.REACT_APP_API_URL}/api/patientInfo`, {
    fetch(`${process.env.REACT_APP_API_URL}/api/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
      body: JSON.stringify(formattedData),
    }).then((res) => {
      console.log(formattedData);
      console.log(res);
      if (res.status === 200) {
        dispatch(handleAddClose());
        setLoading(false);
        prescriptionPage && dispatch(handleEditOpen(true));
      } else {
        setLoading(false);
        console.log(res);
      }
    });
  };

  const errorStyle = {
    color: " rgb(233, 69, 96)",
    fontWeight: "400",
    fontSize: "0.75rem",
    textAlign: "left",
    margin: "2px 14px 0px",
  };

  return (
    <Box padding="0 20px 20px 20px">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Additional Fields */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 2fr",
            gap: "1.5rem",
          }}
        >
          <Box marginBottom="10px">
            <Typography variant="p">Taken Time</Typography>
            <TextField
              fullWidth
              size="small"
              type="datetime-local"
              {...register("takenTime", { required: "Taken time is required" })}
              error={Boolean(errors.takenTime)}
              helperText={errors.takenTime?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Taken By</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("takenBy", { required: "Taken by is required" })}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Pulse (b/min)</Typography>
            <OutlinedInput
              size="small"
              type="number"
              {...register("pulse", { required: "Pulse is required" })}
              endAdornment={
                <InputAdornment position="end">b/min</InputAdornment>
              }
              error={Boolean(errors.pulse)}
            />
            {errors.pulse && <p style={errorStyle}>{errors.pulse.message}</p>}
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Blood Pressure (Syst/Diast)</Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <OutlinedInput
                size="small"
                type="number"
                {...register("systolic", { required: "Systolic is required" })}
                placeholder="Systolic"
                endAdornment={
                  <InputAdornment position="end">mm/hg</InputAdornment>
                }
                error={Boolean(errors.systolic)}
              />
              <OutlinedInput
                size="small"
                type="number"
                {...register("diastolic", {
                  required: "Diastolic is required",
                })}
                placeholder="Diastolic"
                endAdornment={
                  <InputAdornment position="end">mm/hg</InputAdornment>
                }
                error={Boolean(errors.diastolic)}
              />
            </Box>
            {errors.systolic && (
              <p style={errorStyle}>{errors.systolic.message}</p>
            )}
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Oedema</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("oedema")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Testicular volume</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("testicularVolume")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Anaemia</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("anaemia")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Tremor</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("tremor")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">U:S Ratio</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("usRatio")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Lymph Node</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("lymphNode")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Lymph Node</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("lymphNode")}
              error={Boolean(errors.takenBy)}
              helperText={errors.takenBy?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Temperature</Typography>
            <OutlinedInput
              size="small"
              type="number"
              {...register("temperature", {
                required: "O2 Saturation is required",
              })}
              endAdornment={<InputAdornment position="end">°F</InputAdornment>}
              error={Boolean(errors.o2Saturation)}
            />
            {errors.o2Saturation && (
              <p style={errorStyle}>{errors.o2Saturation.message}</p>
            )}
          </Box>
          <Box marginBottom="10px">
            <Typography variant="p">Acne</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("acne")}
              error={Boolean(errors.acne)}
              helperText={errors.acne?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Jaundice</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("jaundice")}
              error={Boolean(errors.jaundice)}
              helperText={errors.jaundice?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Striae</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("striae")}
              error={Boolean(errors.striae)}
              helperText={errors.striae?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Acanthosis</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("acanthosis")}
              error={Boolean(errors.acanthosis)}
              helperText={errors.acanthosis?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Thyroid</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("thyroid")}
              error={Boolean(errors.thyroid)}
              helperText={errors.thyroid?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Clubbing</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("clubbing")}
              error={Boolean(errors.clubbing)}
              helperText={errors.clubbing?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Cyanosis</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("cyanosis")}
              error={Boolean(errors.cyanosis)}
              helperText={errors.cyanosis?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Leukonychia</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("leukonychia")}
              error={Boolean(errors.leukonychia)}
              helperText={errors.leukonychia?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Height</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("height")}
              error={Boolean(errors.height)}
              helperText={errors.height?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Tranner Stage</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("trannerStage")}
              error={Boolean(errors.trannerStage)}
              helperText={errors.trannerStage?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Hirsutism</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("hirsutism")}
              error={Boolean(errors.hirsutism)}
              helperText={errors.hirsutism?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">SPL</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("spl")}
              error={Boolean(errors.spl)}
              helperText={errors.spl?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Upper Segment</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("upperSegment")}
              error={Boolean(errors.upperSegment)}
              helperText={errors.upperSegment?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Lower Segment</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("lowerSegment")}
              error={Boolean(errors.lowerSegment)}
              helperText={errors.lowerSegment?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Koilonychia</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("koilonychia")}
              error={Boolean(errors.koilonychia)}
              helperText={errors.koilonychia?.message}
            />
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Eye</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              {...register("eye")}
              error={Boolean(errors.eye)}
              helperText={errors.eye?.message}
            />
          </Box>

          {/* Add all other fields in a similar manner */}
          <Box marginBottom="10px">
            <Typography variant="p">O2 Saturation (%)</Typography>
            <OutlinedInput
              size="small"
              type="number"
              {...register("o2Saturation", {})}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              error={Boolean(errors.o2Saturation)}
            />
            {errors.o2Saturation && (
              <p style={errorStyle}>{errors.o2Saturation.message}</p>
            )}
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Height</Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <OutlinedInput
                size="small"
                type="number"
                {...register("heightFt", {})}
                endAdornment={
                  <InputAdornment position="end">Ft</InputAdornment>
                }
                placeholder="Ft"
              />
              <OutlinedInput
                size="small"
                type="number"
                {...register("heightIn", {})}
                endAdornment={
                  <InputAdornment position="end">Inch</InputAdornment>
                }
                placeholder="Inches"
              />
            </Box>
          </Box>

          <Box marginBottom="10px">
            <Typography variant="p">Weight (Kg)</Typography>
            <OutlinedInput
              size="small"
              type="number"
              {...register("weight")}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              error={Boolean(errors.weight)}
            />
            {errors.weight && <p style={errorStyle}>{errors.weight.message}</p>}
          </Box>

          {/* More fields here */}
        </Box>

        <Divider sx={{ marginY: "12px" }} />

        <Button type="submit" variant="contained" color="primary">
          {loading ? <SyncLoader size={8} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
}

export default EntryForm;
