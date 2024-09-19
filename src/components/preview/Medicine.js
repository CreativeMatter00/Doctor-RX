import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for print
const TableWrapper = styled(Box)(({ theme }) => ({
  "@media print": {
    display: "block",
    overflow: "hidden",
    pageBreakInside: "auto",
    "@page": {
      size: "A4",
      margin: "10mm",
    },
  },
}));

const Table = styled("table")(({ theme }) => ({
  textAlign: "left",
  width: "100%",
  borderCollapse: "collapse",
  "@media print": {
    width: "100%",
    borderCollapse: "collapse",
    pageBreakInside: "auto",
  },
}));

const TableHeader = styled("thead")(({ theme }) => ({
  display: "table-header-group",
  backgroundColor: "#f0f0f0",
  borderBottom: "1px solid black",
}));

const TableHeaderCell = styled("th")(({ theme }) => ({
  padding: "8px 4px",
  borderRight: "1px solid black",
  textAlign: "left",
  fontWeight: "bold",
  "@media print": {
    fontSize: "0.75rem",
  },
}));

const TableRow = styled("tr")(({ theme }) => ({
  textAlign: "left",
  borderBottom: "1px solid black",
  "@media print": {
    pageBreakInside: "avoid",
  },
}));

const TableCell = styled("td")(({ theme }) => ({
  padding: "8px 4px",
  borderRight: "1px solid black",
  textAlign: "left",
  overflow: "hidden",
  whiteSpace: "normal",  // Allow text to wrap
  wordBreak: "break-word",  // Break long words
  "@media print": {
    fontSize: "0.75rem",
  },
}));

const TableBody = styled("tbody")(({ theme }) => ({
  textAlign: "left",
  width: "100%",
  "@media print": {
    display: "table-row-group",
  },
}));

// Hide last column using the :last-child selector
const LastColumnHiddenHeaderCell = styled("th")({
  '&:last-child': {
    display: 'none',
  },
});

const LastColumnHiddenBodyCell = styled("td")({
  '&:last-child': {
    display: 'none',
  },
});

// Main component
function Medicine({ selectedMedicines }) {
  return (
    <TableWrapper>
      <Typography variant="h6">Rx</Typography>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell style={{ width: "30%" }}>
              Medicine Name
            </TableHeaderCell>
            <TableHeaderCell style={{ width: "20%" }}>Dosage</TableHeaderCell>
            <TableHeaderCell style={{ width: "20%" }}>Duration</TableHeaderCell>
            <TableHeaderCell style={{ width: "30%" }}>Remarks</TableHeaderCell>
            <LastColumnHiddenHeaderCell style={{ width: "30%" }}>Remarks</LastColumnHiddenHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {selectedMedicines?.map((medicine, i) => (
            <TableRow key={i}>
              <TableCell>
                {medicine?.medicine?.medicineName} {medicine?.medicine?.strength}
              </TableCell>
              <TableCell>
                {medicine.morning} + {medicine.noon} + {medicine.evening} + {medicine.night}
              </TableCell>
              <TableCell>
                {medicine?.continue === "yes"
                  ? "Continue"
                  : `${medicine?.duration} days`}
              </TableCell>
              <TableCell>{medicine?.remarks}</TableCell>
              <LastColumnHiddenBodyCell>{medicine?.remarks}</LastColumnHiddenBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}

export default Medicine;
