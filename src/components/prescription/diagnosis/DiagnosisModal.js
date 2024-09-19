import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { BiSearch } from "react-icons/bi";

function DiagnosisModal({
  showModal,
  setShowModal,
  selectedDiagnosis,
  setSelectedDiagnosis,
  diagnosisArray,
  diagnosisList,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (e, index) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setSelectedDiagnosis([
        ...selectedDiagnosis,
        { name: name, value: value, checked: checked },
      ]);
      diagnosisArray[index] = true;
    } else {
      let temp = selectedDiagnosis;
      temp = temp.filter((item) => item.value !== value);
      setSelectedDiagnosis(temp);
      diagnosisArray[index] = false;
    }
  };

  const combinedList = [...diagnosisList];
  if (
    searchTerm &&
    !diagnosisList.some(
      (complaint) => complaint.name.toLowerCase() === searchTerm.toLowerCase()
    )
  ) {
    combinedList.push({ id: "searchTerm", name: searchTerm });
  }

  return (
    <Dialog
      onClose={() => setShowModal(false)}
      open={showModal}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <span> Diagnosis </span>
        <IconButton onClick={() => setShowModal(false)}>
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
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search..."
          />
        </Box>
        <Box
          display="flex"
          maxWidth="90vw"
          flexWrap="wrap"
          gap="6px"
          margin="0 0 20px 30px"
        >
          {combinedList
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((diagnosis, index) => {
              return (
                <FormControlLabel
                  key={diagnosis.id}
                  control={<Checkbox />}
                  label={diagnosis.name}
                  name={diagnosis.name}
                  value={diagnosis.id}
                  onChange={(e) => handleSelect(e, index)}
                  checked={diagnosisArray[index] || false}
                  className="check"
                  style={
                    diagnosisArray[index]
                      ? {
                          backgroundColor: "#D4EDDA",
                          color: "#155724",
                          border: "solid 1px #155724",
                        }
                      : {}
                  }
                />
              );
            })}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DiagnosisModal;
