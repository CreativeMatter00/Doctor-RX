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
import EntryForm from "./EntryForm";

function OnExaminationModal({
  showModal,
  setShowModal,
  selectedExamination,
  setSelectedExamination,
  examinationArray,
  examinationList,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (e, index) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setSelectedExamination([
        ...selectedExamination,
        { name: name, value: value, checked: checked },
      ]);
      examinationArray[index] = true;
    } else {
      let temp = selectedExamination;
      temp = temp.filter((item) => item.value !== value);
      setSelectedExamination(temp);
      examinationArray[index] = false;
    }
  };

  const combinedList = [...examinationList];
  if (
    searchTerm &&
    !examinationList.some(
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
      maxWidth="md"
      style={{ margin: "0px 0px 25px 0px" }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <span> On - Examination Entry</span>
        <IconButton onClick={() => setShowModal(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ padding: "16px 16px" }}>
        <EntryForm />
      </DialogContent>
    </Dialog>
  );
}

export default OnExaminationModal;
