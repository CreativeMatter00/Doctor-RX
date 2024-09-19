import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
	const [database, setDatabase] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				setDatabase(response.data.result);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	const refetch = () => {
		axios
			.get(url)
			.then((response) => {
				setDatabase(response.data.result);
			})
			.catch((err) => {
				setError(err);
			});
		console.log("refetched");
	};

	return [database, loading, error, refetch];
};

export default useFetch;
