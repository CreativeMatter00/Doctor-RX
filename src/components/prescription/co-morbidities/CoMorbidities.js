import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleComplaints } from "../../../Reducer/PrescriptionSlice";
import CoMorbiditiesModal from "./CoMorbiditiesModal";

function CoMorbidities() {
  const [showModal, setShowModal] = useState(false);
  const preselected = useSelector((state) => state.Prescription.complaints);

  const [selectedComplaints, setSelectedComplaints] = useState(
    preselected || []
  );

  const [complaintArray, setComplaintArray] = useState([]);

  const [complaintList] = useFetch(
    `${process.env.REACT_APP_API_URL}/api/complain`
  );

  const handleDelete = (element) => {
    // removing from the prescription
    let temp = selectedComplaints;
    temp = temp.filter((item) => item.value !== element.value);
    setSelectedComplaints(temp);

    // removing from the checklist
    let i = complaintList.findIndex((item) => item.id === element.value);
    complaintArray[i] = false;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleComplaints(selectedComplaints));
  }, [selectedComplaints]);

  useEffect(() => {
    setSelectedComplaints(preselected);
    if (preselected.length > 0) {
      complaintList.filter((complaint, index) => {
        const match = preselected.find(
          (preselect) => complaint.id === preselect.value
        );
        return match
          ? (complaintArray[index] = true)
          : (complaintArray[index] = false);
      });
    }
  }, [preselected, complaintArray, complaintList]);

  return (
    <Box minHeight="80px">
      <Button onClick={() => setShowModal(true)}> Co-morbidities</Button>
      {selectedComplaints.length > 0 ? (
        <List sx={{ padding: "0" }}>
          {selectedComplaints.map((complaint, i) => {
            return (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(complaint)}
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
                <ListItemText primary={complaint.name} />
              </ListItem>
            );
          })}
        </List>
      ) : (
        <></>
      )}
      <CoMorbiditiesModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedComplaints={selectedComplaints}
        setSelectedComplaints={setSelectedComplaints}
        complaintArray={complaintArray}
        complaintList={complaintList}
      />
    </Box>
  );
}

export default CoMorbidities;
