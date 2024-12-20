import { useState, useEffect, useCallback, useRef } from "react";
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

  const gridRef = useRef();

  const [columnDefs] = useState([
    {
      field: "firstname",
      headerName: "First Name",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "lastname",
      headerName: "Last Name",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "streetaddress",
      headerName: "Street Address",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "postcode",
      headerName: "Post Code",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      filter: true,
      floatingFilter: true,
      flex: 1,
    },
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

  const handleExportCSVFile = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      columnKeys: [
        "firstname",
        "lastname",
        "streetaddress",
        "postcode",
        "city",
        "email",
        "phone",
      ],
      fileName: `customers`,
    });
  }, []);

  return (
    <>
      <CustomerForm handleFetchCustomers={handleFetchCustomers} />
      <Button
        variant="outlined"
        sx={{ borderRadius: "15px" }}
        onClick={handleExportCSVFile}
      >
        Export CSV file
      </Button>
      <div
        className="ag-theme-material"
        style={{ width: "100%", height: "85vh" }}
      >
        <AgGridReact
          ref={gridRef}
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
