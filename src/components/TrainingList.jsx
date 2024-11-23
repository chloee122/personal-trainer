import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { getTrainings } from "../api";

function TrainingList() {
  const [trainings, setTrainings] = useState(null);

  const [columnDefs] = useState([
    {
      headerName: "Customer Name",
      valueGetter: (params) => {
        return (
          params.data.customer.firstname + " " + params.data.customer.lastname
        );
      },
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "date",
      filter: true,
      floatingFilter: true,
      flex: 1,
      valueGetter: (params) => {
        return dayjs(params.data.date).format("DD.MM.YYYY HH:mm");
      },
    },
    { field: "duration", filter: true, floatingFilter: true, flex: 1 },
    { field: "activity", filter: true, floatingFilter: true, flex: 1 },
  ]);

  const handleFetchTrainings = () => {
    try {
      getTrainings().then((res) => setTrainings(res));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleFetchTrainings();
  }, []);

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ width: "100%", height: "90vh" }}
      >
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
}

export default TrainingList;
