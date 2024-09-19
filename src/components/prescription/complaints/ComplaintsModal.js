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

function ComplaintsModal({
  showModal,
  setShowModal,
  selectedComplaints,
  setSelectedComplaints,
  complaintArray,
  complaintList,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (e, index) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSelectedComplaints([
        ...selectedComplaints,
        { name: name, value: value, checked: checked },
      ]);
      complaintArray[index] = true;
    } else {
      let temp = selectedComplaints;
      temp = temp.filter((item) => item.value !== value);
      setSelectedComplaints(temp);
      complaintArray[index] = false;
    }
  };

  const combinedList = [...complaintList];
  if (
    searchTerm &&
    !complaintList.some(
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
        <span> Complaints </span>
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
            .map((complaint, index) => {
              return (
                <FormControlLabel
                  key={complaint.id}
                  control={<Checkbox />}
                  label={complaint.name}
                  name={complaint.name}
                  value={complaint.id}
                  onChange={(e) => handleSelect(e, index)}
                  checked={complaintArray[index] || false}
                  className="check"
                  style={
                    complaintArray[index]
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

export default ComplaintsModal;
