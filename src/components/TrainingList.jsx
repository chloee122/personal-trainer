import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import { getAllTrainings, getCustomer } from "../api";

function TrainingList() {
  const [trainings, setTrainings] = useState(null);

  const [columnDefs] = useState([
    {
      headerName: "Customer Name",
      valueGetter: (params) => {
        return params.data.firstname + " " + params.data.lastname;
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
    getAllTrainings()
      .then((res) => {
        const trainingPromises = res._embedded.trainings.map((training) => {
          return getCustomer(training._links.customer.href).then((res) => {
            const { firstname, lastname } = res;
            return {
              firstname,
              lastname,
              date: training.date,
              duration: training.duration,
              activity: training.activity,
            };
          });
        });

        return Promise.all(trainingPromises);
      })
      .then((formattedTrainings) => setTrainings(formattedTrainings))
      .catch((error) => console.error(error.message));
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
