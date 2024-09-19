import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { handleExamination } from "../../../Reducer/PrescriptionSlice";
import OnExaminationModal from "./OnExaminationModal";

function OnExamination() {
  const [examinationList] = useFetch(
    `${process.env.REACT_APP_API_URL}/api/onexam`
  );

  const preselected = useSelector((state) => state.Prescription.examination);

  const [showModal, setShowModal] = useState(false);
  const [selectedExamination, setSelectedExamination] = useState(
    preselected || []
  );
  const [examinationArray, setExaminationArray] = useState([]);

  const handleDelete = (element) => {
    // removing from the prescription
    let temp = selectedExamination;
    temp = temp.filter((item) => item.value !== element.value);
    setSelectedExamination(temp);

    // removing from the checklist
    let i = examinationList.findIndex((item) => item.id === element.value);
    examinationArray[i] = false;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleExamination(selectedExamination));
  }, [selectedExamination, dispatch]);

  useEffect(() => {
    setSelectedExamination(preselected);
    if (preselected.length > 0) {
      examinationList.filter((complaint, index) => {
        const match = preselected.find(
          (preselect) => complaint.id === preselect.value
          // (preselect) => console.log(complaint.id)
        );
        return match
          ? (examinationArray[index] = true)
          : (examinationArray[index] = false);
      });
    }
  }, [preselected, examinationArray, examinationList]);

  return (
    <Box minHeight="80px">
      <Button onClick={() => setShowModal(true)}>On - Examination</Button>
      {selectedExamination.length > 0 ? (
        <List sx={{ padding: "0" }}>
          {selectedExamination.map((examination, i) => {
            return (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(examination)}
                  >
                    <TiDeleteOutline
                      style={{ color: "#ff3333", fontSize: "1.125rem" }}
                    />
                  </IconButton>
                }
                sx={{ padding: "0" }}
              >
                <ListItemIcon>
                  <RxDotFilled style={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={examination.name} />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <></>
      )}
      <OnExaminationModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedExamination={selectedExamination}
        setSelectedExamination={setSelectedExamination}
        examinationList={examinationList}
        examinationArray={examinationArray}
      />
    </Box>
  );
}

export default OnExamination;
