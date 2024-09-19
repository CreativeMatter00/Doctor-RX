import React from "react";
import "./globalFilter.scss";
import SearchIcon from "@mui/icons-material/Search";

export const GlobalFilter = ({ filter, setFilter }) => {
	return (
		<div className="global-Filter">
			<input
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
				placeholder="Search"
			/>
			<SearchIcon />
		</div>
	);
};
