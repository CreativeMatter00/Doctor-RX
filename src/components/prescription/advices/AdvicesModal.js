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

function AdvicesModal({
  showModal,
  setShowModal,
  selectedAdvices,
  setSelectedAdvices,
  advicesArray,
  advicesList,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (e, index) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setSelectedAdvices([
        ...selectedAdvices,
        { name: name, value: value, checked: checked },
      ]);
      advicesArray[index] = true;
    } else {
      let temp = selectedAdvices;
      temp = temp.filter((item) => item.value !== value);
      setSelectedAdvices(temp);
      advicesArray[index] = false;
    }
  };

  const combinedList = [...advicesList];
  if (
    searchTerm &&
    !advicesList.some(
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
        <span> Advices </span>
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
            .map((advice, index) => {
              return (
                <FormControlLabel
                  key={advice.id}
                  control={<Checkbox />}
                  label={advice.name}
                  name={advice.name}
                  value={advice.id}
                  onChange={(e) => handleSelect(e, index)}
                  checked={advicesArray[index] || false}
                  className="check"
                  style={
                    advicesArray[index]
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

export default AdvicesModal;
