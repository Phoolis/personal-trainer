import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetchTrainings } from "../utils/api";
import DeleteTraining from "./DeleteTraining";

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
    {
      field: "",
      sortable: false,
      filter: false,
      headerName: "",
      cellRenderer: (params) => <DeleteTraining id={params.data.id} />,
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
    <div className="TrainingList">
      <div
        className="ag-theme-material"
        style={{ width: "100%", height: 1000 }}
      >
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
