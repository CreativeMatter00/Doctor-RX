import { Box } from "@mui/material";
import React from "react";
import Advices from "./Advices";
import Diagnosis from "./Diagnosis";
import Footer from "./Footer";
import Header from "./Header";
import Medicine from "./Medicine";
import PatientInfo from "./PatientInfo";

function Preview({ selectedMedicines }) {
  return (
    // according to a4 size
    <div
      className="preview"
      style={{
        width: "210mm",
        height: "297mm",
        margin: "0 auto",
        padding: "4mm",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }}
    >
      <Box
        margin="0"
        // border="1px solid black"
        borderRadius="10px"
        minHeight="calc(100vh - 100px)"
        position="relative"
        padding="0"
        boxSizing="border-box"
      >
        <Box>
          <Header />
        </Box>
        <Box border="1px solid black" borderLeft="none" borderRight="none">
          <PatientInfo />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="1fr 2fr"
          gap="10px"
          marginBottom="20px"
        >
          <Box>
            <Diagnosis />
          </Box>
          <Box>
            <Medicine selectedMedicines={selectedMedicines} />
            <Advices />
          </Box>
        </Box>
        <Box   borderBottom="1px solid black" width="100%">
          <Footer />
        </Box>
      </Box>
    </div>
  );
}

export default Preview;
