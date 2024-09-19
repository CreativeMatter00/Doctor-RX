import React from "react";
import { GlobalFilter } from "../global-filter/GlobalFilter";
import { CSVLink } from "react-csv";
import { BiDownload } from "react-icons/bi";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function SearchOptions({
	pageSize,
	setPageSize,
	data,
	globalFilter,
	setGlobalFilter,
	setData,
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="search-container">
			<div className="csv-pdf-page">
				<div className="show-page">
					<span>Show Entries: </span>
					<select
						value={pageSize}
						onChange={(e) => setPageSize(Number(e.target.value))}
					>
						<option value={10}> 10 </option>
						<option value={20}> 20 </option>
						<option value={50}> 50 </option>
						<option value={100}> 100 </option>
						<option value={data.length}> All </option>
					</select>
				</div>
				{/* <div className="csv-pdf">
          <Button
            id="basic-button"
            size="small"
            variant="contained"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              backgroundColor: "#0b3a58",
              padding: "6px 12px",
              minWidth: "0",
            }}
          >
            {<BiDownload />}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} color="red">
              <CSVLink
                data={data}
                filename={"New Document.csv"}
                className="excel"
              >
                Excel
              </CSVLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <div onClick={() => window.print()}> Print </div>
            </MenuItem>
          </Menu>
        </div> */}
			</div>
			<div>
				<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			</div>
			<Button
				sx={{ bgColor: "#3C91DD", color: "#ffffff" }}
				size="small"
				variant="contained"
				// color="success"
				onClick={() => {
					setData({});
				}}
			>
				{" "}
				Add{" "}
			</Button>
		</div>
	);
}

export default SearchOptions;
