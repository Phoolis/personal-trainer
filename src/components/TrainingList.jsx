import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetchTrainings } from "../utils/api";

export default function TrainingList() {
  const { data: trainings } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchTrainings,
  });

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "date",
      valueFormatter: (params) =>
        dayjs(params.value).format("DD/MM/YYYY hh:mm"),
    },
    { field: "duration" },
    { field: "activity" },
    {
      headerName: "Customer Name",
      valueGetter: (params) =>
        `${params.data.customer.firstname} ${params.data.customer.lastname}`,
    },
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
    <div className="TrainingList">
      <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoSizeStrategy={autoSizeStrategy}
        />
      </div>
    </div>
  );
}
