import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button } from "@mui/material";
import { fetchCustomers } from "../utils/api";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";
import AddTraining from "./AddTraining";

export default function CustomerList() {
  const gridRef = useRef(null); // references the ag-grid instance
  const exportOptions = {
    fileName: "customers.csv",
    suppressQuotes: true,
    columnKeys: [
      "firstname",
      "lastname",
      "streetaddress",
      "postcode",
      "city",
      "email",
      "phone",
    ],
  };

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
    {
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <AddTraining url={params.data._links.self.href} />
      ),
    },
    {
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <DeleteCustomer url={params.data._links.self.href} />
      ),
    },
    {
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <UpdateCustomer currentCustomer={params.data} />
      ),
    },
  ]);

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  const autoSizeStrategy = {
    type: "fitGridWidth",
    defaultMinWidth: 80,
  };

  return (
    <>
      <div className="CustomerList">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AddCustomer />
          <Button
            onClick={() => gridRef.current.api.exportDataAsCsv(exportOptions)}
          >
            Export to CSV
          </Button>
        </Box>

        <div
          className="ag-theme-material"
          style={{ width: "100%", height: 1000 }}
        >
          <AgGridReact
            ref={gridRef}
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
