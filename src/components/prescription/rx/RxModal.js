import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BiSearch } from "react-icons/bi";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { handleMedicine } from "../../../Reducer/PrescriptionSlice";

function RxModal({
  showModal,
  setShowModal,
  selectedMedicines,
  setSelectedMedicines,
  medcinesArray,
  medicineList,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [storedMedicineList, setStoredMedicineList] = useState([]); // State to hold fetched medicine list
  const [filteredMedicineList, setFilteredMedicineList] = useState([]); // State for filtered medicine list
  const dispatch = useDispatch();

  // Save medicineList to localStorage when it is initially fetched
  useEffect(() => {
    if (medicineList && medicineList.length > 0) {
      localStorage.setItem("medicineList", JSON.stringify(medicineList));
      setStoredMedicineList(medicineList);
      setFilteredMedicineList(medicineList); // Initialize filtered list with fetched data
    }
  }, [medicineList]);

  // Retrieve medicineList from localStorage on component mount
  useEffect(() => {
    const storedMedicineList =
      JSON.parse(localStorage.getItem("medicineList")) || [];
    setStoredMedicineList(storedMedicineList);
    setFilteredMedicineList(storedMedicineList); // Initialize filtered list from localStorage
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredList = storedMedicineList.filter(
      (medicine) =>
        medicine?.medicineName?.toLowerCase().includes(searchTerm) ||
        (medicine?.genericName &&
          medicine?.genericName?.toLowerCase().includes(searchTerm))
    );
    setFilteredMedicineList(filteredList);
  };

  const handleSelect = (e, index) => {
    const { value } = e.target;

    const selectedMedicine = combinedList.find(
      (medicine) => medicine.id === value
    );

    const isAlreadySelected = selectedMedicines.some(
      (item) => item.medicine.id === value
    );

    if (isAlreadySelected) {
      const temp = selectedMedicines.filter(
        (item) => item.medicine.id !== value
      );
      setSelectedMedicines(temp);
      medcinesArray[index] = false;
    } else {
      setSelectedMedicines([
        ...selectedMedicines,
        {
          medicine: selectedMedicine,
          morning: 0,
          noon: 0,
          evening: 0,
          night: 0,
          continue: "no",
          duration: 0,
          remarks: "after eating",
        },
      ]);
      medcinesArray[index] = true;
    }
  };

  const handleDosageChange = (e, index, timeOfDay) => {
    const { value } = e.target;
    //#Miraz - Validation doctor cannot add more than 100 dosages
    if (value >= 0 && value <= 100) {
      const updatedMedicines = selectedMedicines?.map((medicine, i) =>
        i === index ? { ...medicine, [timeOfDay]: value } : medicine
      );
      setSelectedMedicines(updatedMedicines);
    }
  };

  const handleContinueChange = (e, index) => {
    const { value } = e.target;
    const updatedMedicines = selectedMedicines?.map((medicine, i) =>
      i === index ? { ...medicine, continue: value } : medicine
    );
    setSelectedMedicines(updatedMedicines);
  };

  const handleDurationChange = (e, index) => {
    const { value } = e.target;
    if (value >= 0 && value <= 30) {
      const updatedMedicines = selectedMedicines?.map((medicine, i) =>
        i === index ? { ...medicine, duration: value } : medicine
      );
      setSelectedMedicines(updatedMedicines);
    }
  };

  const handleRemarksChange = (e, index) => {
    const { value } = e.target;
    const updatedMedicines = selectedMedicines?.map((medicine, i) =>
      i === index ? { ...medicine, remarks: value } : medicine
    );
    setSelectedMedicines(updatedMedicines);
  };

  const handleClose = () => {
    dispatch(handleMedicine(selectedMedicines));
    setShowModal(false);
  };

  const combinedList = [...filteredMedicineList];
  if (
    searchTerm &&
    !filteredMedicineList.some(
      (medicine) =>
        medicine?.medicineName?.toLowerCase() === searchTerm.toLowerCase()
    )
  ) {
    combinedList.push({
      id: `searchTerm-${searchTerm}`, // Use unique ID for search term
      medicineName: searchTerm,
      medicineType: "Tab",
    }); 
  }

  return (
    <Dialog open={showModal} fullWidth maxWidth="lg">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Prescription</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers style={{ padding: "16px 0px" }}>
        <Box padding="0px 20px 10px">
          <TextField
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BiSearch />
                </InputAdornment>
              ),
            }}
            fullWidth
            autoFocus
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search medicine name or generic name"
          />
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          gap="10px"
          paddingLeft="40px"
          maxHeight="30vh"
          overflow="auto"
        >
          {combinedList.map((medicine, index) => (
            <FormControlLabel
              key={medicine.id}
              control={<Checkbox checked={medcinesArray[index] || false} />}
              label={`${
                medicine?.category?.shortName
                  ? `${medicine?.category?.shortName}. `
                  : ""
              }${medicine?.medicineName ? medicine.medicineName : ""} `}
              value={medicine.id}
              onChange={(e) => handleSelect(e, index)}
              className="check"
              style={
                medcinesArray[index]
                  ? {
                      backgroundColor: "#D4EDDA",
                      color: "#155724",
                      border: "solid 1px #155724",
                    }
                  : {}
              }
            />
          ))}
        </Box>

        <Box padding="0 20px">
          {selectedMedicines.map((element, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#EFFDFF",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "6px",
              }}
            >
              <Typography variant="h6">
                {element?.medicine?.category?.shortName || ""
                  ? ` ${element?.medicine?.category?.shortName}. `
                  : searchTerm}
                {element?.medicine?.medicineName} -{" "}
                {element?.medicine?.strength} (
                {element?.medicine?.medicineGeneric?.genericName})
              </Typography>

              <Typography variant="body2">
                {element?.medicine?.medicineManufacturer?.manufacturerName}
              </Typography>

              <Box
                display="grid"
                gridTemplateColumns="4fr 1fr 1fr 2fr"
                gap="20px"
              >
                <Box>
                  <Typography fontWeight="500">Dosage:</Typography>
                  <Box display="flex" alignItems="center" gap="6px">
                    {["morning", "noon", "evening", "night"].map(
                      (timeOfDay) => (
                        <TextField
                          key={timeOfDay}
                          size="small"
                          type="number"
                          value={element[timeOfDay]}
                          placeholder={timeOfDay}
                          onChange={(e) =>
                            handleDosageChange(e, index, timeOfDay)
                          }
                          inputProps={{ min: 0, max: 4 }}
                        />
                      )
                    )}
                  </Box>
                </Box>

                <Box>
                  <Typography fontWeight="500">Continue:</Typography>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      value={element.continue}
                      onChange={(e) => handleContinueChange(e, index)}
                    >
                      <MenuItem value={"no"}>No</MenuItem>
                      <MenuItem value={"yes"}>Yes</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography fontWeight="500">Duration:</Typography>
                  <TextField
                    size="small"
                    type="number"
                    value={element.duration}
                    disabled={element.continue === "yes"}
                    onChange={(e) => handleDurationChange(e, index)}
                    InputProps={{
                      inputProps: { min: 0, max: 30 },
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ fontSize: "10px" }}
                        >
                          days
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box>
                  <Typography fontWeight="500">Remarks:</Typography>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      value={element.remarks}
                      onChange={(e) => handleRemarksChange(e, index)}
                    >
                      <MenuItem value={"before eating"}>Before Eating</MenuItem>
                      <MenuItem value={"after eating"}>After Eating</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default RxModal;
