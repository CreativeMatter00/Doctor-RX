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

function InvestigationModal({
  showModal,
  setShowModal,
  selectedInvestigation,
  setSelectedInvestigation,
  investigationArray,
  investigationList,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (e, index) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setSelectedInvestigation([
        ...selectedInvestigation,
        { name: name, value: value, checked: checked },
      ]);
      investigationArray[index] = true;
    } else {
      let temp = selectedInvestigation;
      temp = temp.filter((item) => item.value !== value);
      setSelectedInvestigation(temp);
      investigationArray[index] = false;
    }
  };

  const combinedList = [...investigationList];
  if (
    searchTerm &&
    !investigationList.some(
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
        <span> Investigation </span>
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
            .map((investigation, index) => {
              return (
                <FormControlLabel
                  key={investigation.id}
                  control={<Checkbox />}
                  label={investigation.name}
                  name={investigation.name}
                  value={investigation.id}
                  onChange={(e) => handleSelect(e, index)}
                  checked={investigationArray[index] || false}
                  className="check"
                  style={
                    investigationArray[index]
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

export default InvestigationModal;
