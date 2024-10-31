import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../utils/api";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";

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
    {
      field: "_links.self.href",
      sortable: false,
      filter: false,
      headerName: "",
      cellRenderer: (params) => (
        <DeleteCustomer url={params.data._links.self.href} />
      ),
    },
    {
      field: "_links.self.href",
      sortable: false,
      filter: false,
      headerName: "",
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
        <AddCustomer />
        <div
          className="ag-theme-material"
          style={{ width: "100%", height: 1000 }}
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
