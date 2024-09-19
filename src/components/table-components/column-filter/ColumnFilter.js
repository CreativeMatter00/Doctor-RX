import React from "react";
import "./columnFilter.scss";

export const ColumnFilter = ({ column }) => {
	const { filterValue, setFilter } = column;

	return (
		<span className="column-search">
			<input
				value={filterValue || ""}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</span>
	);
};
