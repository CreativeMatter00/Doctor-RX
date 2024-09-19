import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function DoctorRoute({ children, ...rest }) {
	const token = localStorage.getItem("RxAccessToken");
	let location = useLocation();
	if (token) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} />;
}

export default DoctorRoute;
