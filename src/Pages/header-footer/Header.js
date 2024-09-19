import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import HeaderCurrent from "../../components/header/HeaderCurrent";
import HeaderEdit from "../../components/header/HeaderEdit";
import useFetch from "../../hooks/useFetch";

function Header() {
  const headerData = useFetch(
    `${process.env.REACT_APP_API_URL}/api/presheader`
  );
  console.log(headerData);
  const [header, loading, error, refetch] = headerData;
  console.log(header);
  const [value, setValue] = useState(false);

  useEffect(() => {
    refetch();
  }, [value]);

  console.log(value);
  return (
    <div className="sidebar-close">
      {loading ? (
        <div className="loader-container">
          <PuffLoader size="100px" />
        </div>
      ) : (
        <Box display="grid" gridTemplateColumns="2fr 1fr" gap="20px">
          <HeaderCurrent header={header} value={value} />
          <HeaderEdit header={header} value={value} setValue={setValue} />
        </Box>
      )}
    </div>
  );
}

export default Header;
