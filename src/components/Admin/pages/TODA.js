import React, { useEffect, useState } from "react";
import DataTable, { COL_TYPES } from "react-native-datatable-component";
import axios from "../../../config/axios";

const TODA = (props) => {
  const [rows, setRows] = useState([]);
  console.log("🚀 ~ file: Users.js ~ line 7 ~ Users ~ rows", rows);
  const columns = ["Name", "Email", "Role", "Status"];

  useEffect(() => {
    axios.get("admin/user").then((response) => {
      setRows(response.data);
    });
  }, []);
  return (
    <DataTable
      rows={rows} // list of objects
      colNames={columns} //List of Strings
      noOfPages={2} //number
      headerLabelStyle={{
        color: "#132875",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12,
      }} //Text Style Works
    />
  );
};

export default TODA;
