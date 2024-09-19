import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import FooterCurrent from "../../components/footer/FooterCurrent";
import FooterEdit from "../../components/footer/FooterEdit";
import useFetch from "../../hooks/useFetch";

function Footer() {
	const [footer, loading, error, refetch] = useFetch(
		`${process.env.REACT_APP_API_URL}/api/presfooter`
	);

	const [value, setValue] = useState(false);

	useEffect(() => {
		refetch();
	}, [value]);

	return (
		<div className="sidebar-close">
			{loading ? (
				<div className="loader-container">
					<PuffLoader size="100px" />
				</div>
			) : (
				<Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
					<FooterCurrent footer={footer} value={value} />
					<FooterEdit footer={footer} value={value} setValue={setValue} />
				</Box>
			)}
		</div>
	);
}

export default Footer;
