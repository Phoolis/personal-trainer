import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../utils/api";

export default function CustomerList() {
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const [columnDefs, setColumnDefs] = useState([
    { field: "firstname" },
    { field: "lastname" },
    { field: "streetaddress" },
    { field: "postcode" },
    { field: "city" },
    { field: "email" },
    { field: "phone" },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  const autoSizeStrategy = {
    type: "fitCellContents",
    defaultMinWidth: 120,
  };

  return (
    <>
      <div className="CustomerList">
        <div
          className="ag-theme-material"
          style={{ width: "100%", height: 600 }}
        >
          <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoSizeStrategy={autoSizeStrategy}
          />
        </div>
      </div>
    </>
  );
}
