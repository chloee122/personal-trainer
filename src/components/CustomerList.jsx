import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getAllCustomers } from "../api";

function CustomerList() {
  const [customers, setCustomers] = useState(null);

  const [columnDefs] = useState([
    { field: "firstname", filter: true, floatingFilter: true, flex: 1 },
    { field: "lastname", filter: true, floatingFilter: true, flex: 1 },
    { field: "streetaddress", filter: true, floatingFilter: true, flex: 1 },
    { field: "postcode", filter: true, floatingFilter: true, flex: 1 },
    { field: "city", filter: true, floatingFilter: true, flex: 1 },
    { field: "email", filter: true, floatingFilter: true, flex: 1 },
    { field: "phone", filter: true, floatingFilter: true, flex: 1 },
  ]);

  const handleFetchCustomers = () => {
    try {
      getAllCustomers().then((res) => setCustomers(res._embedded.customers));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleFetchCustomers();
  }, []);

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ width: "100%", height: "90vh" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </>
  );
}

export default CustomerList;
