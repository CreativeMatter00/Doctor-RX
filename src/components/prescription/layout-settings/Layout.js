import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";

function Layout({ selected, setSelected }) {
	const handleSelect = (e) => {
		const { name, checked } = e.target;
		setSelected({
			...selected,
			[name]: checked,
		});
	};

	useEffect(() => {
		localStorage.setItem("selectedFields", JSON.stringify(selected));
	}, [selected]);

	return (
		<form>
			<FormGroup
				sx={{
					padding: "0 20px",
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
				}}
			>
				<Box>
					<FormControlLabel
						control={<Checkbox />}
						label="Header"
						name="header"
						onClick={handleSelect}
						checked={selected.header}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Patient-Info"
						name="patientInfo"
						onClick={handleSelect}
						checked={selected.patientInfo}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Complaints"
						name="complaints"
						onClick={handleSelect}
						checked={selected.complaints}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Examinations"
						name="examination"
						onClick={handleSelect}
						checked={selected.examination}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Diagnosis"
						name="diagnosis"
						onClick={handleSelect}
						checked={selected.diagnosis}
						sx={{ width: "100%" }}
					/>
				</Box>
				<Box>
					<FormControlLabel
						control={<Checkbox />}
						label="Investigation"
						name="investigation"
						onClick={handleSelect}
						checked={selected.investigation}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Medicines"
						name="medicines"
						onClick={handleSelect}
						checked={selected.medicines}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Advices"
						name="advices"
						onClick={handleSelect}
						checked={selected.advices}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Follow-up"
						name="followUp"
						onClick={handleSelect}
						checked={selected.followUp}
						sx={{ width: "100%" }}
					/>
					<FormControlLabel
						control={<Checkbox />}
						label="Footer"
						name="footer"
						onClick={handleSelect}
						checked={selected.footer}
						sx={{ width: "100%" }}
					/>
				</Box>
			</FormGroup>
			{/* <Box display="flex" justifyContent="end" gap="10px" padding="10px 10px">
				<Button type="submit" size="small" variant="contained" color="success">
					Submit
				</Button>
				<Button
					size="small"
					variant="contained"
					color="error"
					onClick={() => {
						dispatch(handleAddClose());
					}}
				>
					Close
				</Button>
			</Box> */}
		</form>
	);
}

export default Layout;
