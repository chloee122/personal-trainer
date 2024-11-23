import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { deleteCustomer, getAllCustomers } from "../api";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import CustomerForm from "./AddCustomerForm";
import EditCustomerForm from "./EditCustomerForm";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const [columnDefs] = useState([
    { field: "firstname", filter: true, floatingFilter: true, flex: 1 },
    { field: "lastname", filter: true, floatingFilter: true, flex: 1 },
    { field: "streetaddress", filter: true, floatingFilter: true, flex: 1 },
    { field: "postcode", filter: true, floatingFilter: true, flex: 1 },
    { field: "city", filter: true, floatingFilter: true, flex: 1 },
    { field: "email", filter: true, floatingFilter: true, flex: 1 },
    { field: "phone", filter: true, floatingFilter: true, flex: 1 },
    {
      cellRenderer: (params) => {
        return (
          <EditCustomerForm
            data={params.data}
            handleFetchCustomers={handleFetchCustomers}
          />
        );
      },
      width: 120,
    },
    {
      cellRenderer: (params) => {
        return (
          <Button
            color="error"
            size="small"
            onClick={() => handleDeleteCustomer(params.data._links.self.href)}
          >
            <DeleteIcon />
          </Button>
        );
      },
      width: 120,
    },
  ]);

  const handleFetchCustomers = () => {
    try {
      getAllCustomers().then((res) => setCustomers(res._embedded.customers));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      try {
        deleteCustomer(url).then(() => {
          handleFetchCustomers();
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    handleFetchCustomers();
  }, []);

  return (
    <>
      <CustomerForm handleFetchCustomers={handleFetchCustomers} />
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
