import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { handleMedicine } from "../../../Reducer/PrescriptionSlice";
import RxModal from "./RxModal";

function Rx({ selectedMedicines, setSelectedMedicines, preselected }) {
  const [medicineList] = useFetch(
    `${process.env.REACT_APP_API_URL}/api/medicine`
  );

  const [showModal, setShowModal] = useState(false);
  const [medcinesArray, setMedcinesArray] = useState([]);

  const dispatch = useDispatch();

  // Initialize selected medicines and check array on component mount
  useEffect(() => {
    setSelectedMedicines(preselected);
    if (preselected.length > 0) {
      const matches = medicineList.map((medicine, index) =>
        preselected.some((preselect) => medicine?.id === preselect?.medicine?.id)
          ? (medcinesArray[index] = true)
          : (medcinesArray[index] = false)
      );
      setMedcinesArray([...medcinesArray]); // Force update state to reflect immediate UI change
    }
  }, [preselected, medicineList]);

  // Update Redux state with selected medicines on change
  useEffect(() => {
    dispatch(handleMedicine(selectedMedicines));
  }, [selectedMedicines, dispatch]);

  const handleDelete = (element) => {
    const updatedSelectedMedicines = selectedMedicines.filter(
      (item) => item?.medicine?.id !== element?.medicine?.id
    );
    setSelectedMedicines(updatedSelectedMedicines);

    // Update medcinesArray to reflect deselection
    const index = medicineList.findIndex(
      (item) => item?.id === element?.medicine?.id
    );
    if (index !== -1) {
      medcinesArray[index] = false;
      setMedcinesArray([...medcinesArray]); // Force update state to reflect immediate UI change
    }
  };

  return (
    <Box minHeight="80px">
      <Button
        size="large"
        sx={{ paddingLeft: "0" }}
        onClick={() => setShowModal(true)}
      >
        Rx
      </Button>
      <Box>
        {selectedMedicines.map((element, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#EFFDFF",
              padding: "10px",
              margin: "10px 0",
            }}
          >
             <Typography fontWeight="500">
              {element?.medicine?.category?.shortName
                ? `${element.medicine.category.shortName}. `
                : ""}
              {element?.medicine?.medicineName} - {element?.medicine?.strength}{" "}
              ({element?.medicine?.medicineGeneric?.genericName})
            </Typography>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography>
                {element?.morning} + {element?.noon} + {element.evening} +{" "}
                {element?.night}
                {element?.medicine?.medicineType === "Tab" ? (
                  <span> piece </span>
                ) : element?.medicine?.medicineType === "Syp" ? (
                  <span> spoon </span>
                ) : (
                  <></>
                )}
              </Typography>
              {element.continue === "yes" ? (
                <Typography>Continue</Typography>
              ) : (
                <Typography>{element.duration} days</Typography>
              )}
              <Typography>{element.remarks}</Typography>
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDelete(element)}
              >
                <TiDeleteOutline
                  style={{ color: "#f33", fontSize: "1.125rem" }}
                />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <RxModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedMedicines={selectedMedicines}
        setSelectedMedicines={setSelectedMedicines}
        medcinesArray={medcinesArray}
        medicineList={medicineList}
      />
    </Box>
  );
}

export default Rx;
