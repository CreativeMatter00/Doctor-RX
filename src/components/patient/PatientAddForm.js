import { AccountCircle } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Checkbox,
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
import { handleAddClose, handleEditOpen } from "../../Reducer/ModalSlice";
import styled from "@emotion/styled";

const ErrorText = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  lineHeight: "1",
  color: "red",
  margin: "6px 0",
}));

function PatientAddForm({ setOpen, prescriptionPage }) {
  const dispatch = useDispatch();
  console.log(new Date());

  // Functions of hookform

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // State and function for showing/hiding patent detail and history

  const [showComponent, setShowComponent] = useState("");

  const handlePatientDetail = () => {
    if (showComponent !== "patientDetail") setShowComponent("patientDetail");
    else setShowComponent("");
  };

  const handlePatientHistory = () => {
    if (showComponent !== "patientHistory") setShowComponent("patientHistory");
    else setShowComponent("");
  };

  // State for dyanimc medicine history fields

  const [medicineHistory, setMedicineHistory] = useState([{}]);

  // function for storing medicine history inputfields

  const handleInputChange = (index, e) => {
    let data = [...medicineHistory];
    data[index].medicine = e.target.value;
    setMedicineHistory(data);
  };

  // function for adding and deleteing medicine history inputfields

  const addMedicines = () => {
    setMedicineHistory([...medicineHistory, { medicine: "" }]);
  };

  const removeMedicines = (index) => {
    let data = [...medicineHistory];
    data.splice(index, 1);
    setMedicineHistory(data);
  };

  const [loading, setLoading] = useState(false);

  // Function for form Submission

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    // dispatch(handlePatientInfo(data));

    fetch(`${process.env.REACT_APP_API_URL}/api/patientInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
      body: JSON.stringify({
        name: data.name,
        age: Number(data.age),
        phone: data.phone,
        gender: data.gender,
        appointmentDate: data.appointmentDate,
        patientAppoinInfos: [
          {
            appointmentDate: data.appointmentDate,
          },
        ],
        email: data.email,
        bloodGroup: data.bloodGroup,
        height: data.height,
        weight: data.weight,
        bmr: data.bmr,
        activeLebel: data.activeLebel,
        tdee: data.tdee,
        bsa: data.bsa,
        bmi: data.bmi,
        nationalId: data.nationalId,
        address: data.address,
        refereedBy: data.refereedBy,
        refereedTo: data.refereedTo,
        registrationNo: data.registrationNo,
        disease: data.disease,
        presentComplaints: data.presentComplaints,
        systemicExamination: data.systemicExamination,
        patientOutcome: data.patientOutcome,
        investigationsHistory: data.investigation,
        medicinelists: medicineHistory,
        physicaExamination: data.physicaExamination?.toString(),
        comorbidity: data.comorbidity?.toString(),
      }),
    }).then((res) => {
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
    <Box
      
      padding="0 20px 20px 20px"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Patiend Basic info starts */}

        <Box
          padding="20px 0"
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
            gap: "1.5rem",
          }}
        >
          <Box marginBottom="10px">
            <Typography variant="p">Name</Typography>
            <TextField
              fullWidth
              size="small"
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              {...register("name", { required: "Name is required" })}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Box>

          <Box>
            <Typography variant="p">Age</Typography>
            <OutlinedInput
              type="number"
              size="small"
              fullWidth
              endAdornment={
                <InputAdornment position="end">Year</InputAdornment>
              }
              {...register("age", { required: "Age is required" })}
              error={Boolean(errors.age)}
              // helperText={errors.age?.message}
            />
            {errors?.age?.type === "required" && (
              <p style={errorStyle}>Age is required </p>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
            gap: "1.5rem",
          }}
        >
          <Box marginBottom="10px">
            <Typography variant="p">Mobile</Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
              {...register("phone", {
                required: true,
                // minLength: 10,

                minLength: 11,
                maxLength: 11,
              })}
              error={Boolean(errors.phone)}
            />
            {errors?.phone?.type === "required" ? (
              <ErrorText>Mobile Number is required </ErrorText>
            ) : errors?.phone?.type === "minLength" ? (
              <ErrorText>Mobile Number is required </ErrorText>
            ) : errors?.phone?.type === "maxLength" ? (
              <ErrorText>Please insert a valid phone number </ErrorText>
            ) : (
              ""
            )}
          </Box>
          {/* updated by miraz, user shouldnt be able to select previous dates  */}
          <Box marginBottom="10px">
            <Typography variant="p">Appointment Date</Typography>
            <TextField
              fullWidth
              size="small"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              inputProps={{ min: new Date().toISOString().slice(0, 10) }}
              {...register("appointmentDate")}
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="end" marginBottom="10px" gap="10px">
          <Button
            size="small"
            variant="outlined"
            onClick={() => handlePatientDetail()}
          >
            {showComponent === "patientDetail" ? "Hide" : "Show more"}
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handlePatientHistory()}
          >
            {showComponent === "patientHistory"
              ? "Hide History"
              : "Show History"}
          </Button>
        </Box>

        {/* Patiend Basic info ends */}

        {/* Patiend additional info starts */}

        {showComponent === "patientDetail" && (
          <>
            <Box
              padding="0"
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">Gender</Typography>
                <TextField
                  select
                  defaultValue={0}
                  fullWidth
                  size="small"
                  {...register("gender", {})}
                >
                  <MenuItem
                    style={{ display: "none" }}
                    value={0}
                    selected
                    disabled
                  >
                    --select--
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Box>
              <Box>
                <Typography variant="p">Email</Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  {...register("email", { pattern: /^\S+@\S+$/i })}
                />
              </Box>
              <Box>
                <Typography variant="p">Generate serial number</Typography>
                <TextField
                  fullWidth
                  size="small"
                  // {...register("serialNumber", {})}
                />
              </Box>
            </Box>
            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">Blood group</Typography>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-select-currency"
                  select
                  defaultValue={0}
                  {...register("bloodGroup", {})}
                >
                  <MenuItem
                    style={{ display: "none" }}
                    value={0}
                    selected
                    disabled
                  >
                    --select--
                  </MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="Unknown">Unknown</MenuItem>
                </TextField>
              </Box>
              <Box size="small">
                <Typography variant="p">Height</Typography>
                <OutlinedInput
                  size="small"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">Ft</InputAdornment>
                  }
                  {...register("height", {})}
                />
              </Box>
              <Box>
                <Typography variant="p">Weight</Typography>
                <OutlinedInput
                  size="small"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                  {...register("weight", {})}
                />
              </Box>
            </Box>
            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">BMR</Typography>
                <TextField fullWidth size="small" {...register("bmr", {})} />
              </Box>
              <Box>
                <Typography variant="p">Activity Level</Typography>
                <TextField
                  fullWidth
                  size="small"
                  select
                  defaultValue={0}
                  {...register("activeLebel", {})}
                >
                  <MenuItem
                    style={{ display: "none" }}
                    value={0}
                    selected
                    disabled
                  >
                    --select--
                  </MenuItem>
                  <MenuItem value="Sedentary">Sedentary</MenuItem>
                  <MenuItem value="Light active">Light active</MenuItem>
                  <MenuItem value="Moderately active">
                    Moderately active
                  </MenuItem>
                  <MenuItem value="Very active">Very active</MenuItem>
                  <MenuItem value="Extra active">Extra active</MenuItem>
                </TextField>
              </Box>
              <Box>
                <Typography variant="p">TDEE</Typography>
                <TextField fullWidth size="small" {...register("tdee", {})} />
              </Box>
            </Box>
            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">BSA</Typography>
                <TextField fullWidth size="small" {...register("bsa", {})} />
              </Box>
              <Box>
                <Typography variant="p">BMI</Typography>
                <TextField fullWidth size="small" {...register("bmi", {})} />
              </Box>
              <Box>
                <Typography variant="p">National Id</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("nationalId", {})}
                />
              </Box>
            </Box>
            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">Address</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("address", {})}
                />
              </Box>
              <Box>
                <Typography variant="p">Referred By</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("refereedBy", {})}
                />
              </Box>
              <Box>
                <Typography variant="p">Referred To</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("refereedTo", {})}
                />
              </Box>
            </Box>
            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">Registration No</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("registrationNo", {})}
                />
              </Box>
              <Box>
                <Typography variant="p">Disease</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("disease", {})}
                />
              </Box>
              <Box>
                <Typography variant="p">Presenting Complaints</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("presentComplaints", {})}
                />
              </Box>
            </Box>

            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">Systemic Examination</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("systemicExamination", {})}
                />
              </Box>
              <Box>
                <Typography variant="p">Patient Outcome</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("patientOutcome", {})}
                />
              </Box>
            </Box>
            <Box
              padding="0"
              sx={{
                marginTop: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              <Box>
                <Typography variant="p">Physical Examination</Typography>
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Anaemie"
                    value="anaemie"
                    {...register("physicaExamination")}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Jaundice"
                    value="jaundice"
                    {...register("physicaExamination")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Odema"
                    value="odema"
                    {...register("physicaExamination")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Purpura"
                    value="purpura"
                    {...register("physicaExamination")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Lymph Nodes"
                    value="lymphNodes"
                    {...register("physicaExamination")}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Palpable"
                    value="palpable"
                    {...register("physicaExamination")}
                  />
                </Box>
              </Box>

              <Box>
                <Typography variant="p">Comorbidity</Typography>
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Hypertension"
                    value="hypertension"
                    {...register("comorbidity")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Diabetes"
                    value="diabetes"
                    {...register("comorbidity")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="CKD"
                    value="CKD"
                    {...register("comorbidity")}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="ISD"
                    value="ISD"
                    {...register("comorbidity")}
                  />
                </Box>
              </Box>
            </Box>
          </>
        )}

        {/* Patiend additional info ends */}

        {/* Patien history starts */}

        {showComponent === "patientHistory" && (
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="20px">
            <Box>
              <Typography variant="h5" marginBottom="23px">
                Investigation History
              </Typography>

              <Box marginBottom="10px">
                <Typography variant="p">Investigation History</Typography>
                <TextField
                  fullWidth
                  size="small"
                  {...register("investigation", {})}
                />
              </Box>
            </Box>

            <Box>
              <Typography variant="h5" marginBottom="10px">
                Medicine History
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="end"
                marginBottom="6px"
              >
                <Typography variant="p">Medcine Names and Dosages</Typography>
                <Button variant="contained" size="small" onClick={addMedicines}>
                  Add More
                </Button>
              </Box>
              {medicineHistory.map((input, index) => {
                return (
                  <Box
                    key={index}
                    marginBottom="10px"
                    display="flex"
                    gap="20px"
                  >
                    <TextField
                      fullWidth
                      placeholder="Medicine Name - Dosage - Duration"
                      size="small"
                      onChange={(e) => handleInputChange(index, e)}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => removeMedicines(index)}
                      disabled={medicineHistory.length === 1 ? true : false}
                    >
                      Delete
                    </Button>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Patien history starts */}

        <Box
          marginTop="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {loading ? (
            <SyncLoader color="#1565C0" />
          ) : (
            <Button fullWidth type="submit" size="small" variant="contained">
              ADD
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

export default PatientAddForm;
