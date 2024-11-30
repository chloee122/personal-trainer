import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { addCustomer } from "../api";

function CustomerForm({ handleFetchCustomers }) {
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleCloseForm = () => {
    setShowAddCustomerForm(false);
    setCustomer({
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    });
  };

  const handleCreateCustomer = () => {
    try {
      addCustomer(customer).then(() => {
        handleFetchCustomers();
        handleCloseForm();
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ borderRadius: "15px", margin: "10px" }}
        onClick={() => setShowAddCustomerForm(true)}
      >
        new customer
      </Button>
      <Dialog open={showAddCustomerForm} onClose={handleCloseForm}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            autoFocus
            required
            margin="dense"
            name="firstname"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            label="Last Name"
            required
            margin="dense"
            name="lastname"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            label="Street Address"
            required
            margin="dense"
            name="streetaddress"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            label="Post Code"
            required
            margin="dense"
            name="postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            label="City"
            required
            margin="dense"
            name="city"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            label="Email"
            required
            margin="dense"
            name="email"
            fullWidth
            variant="standard"
            type="email"
            value={customer.email}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
          <TextField
            label="Phone"
            required
            margin="dense"
            name="phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={(e) => {
              setCustomer({ ...customer, [e.target.name]: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCustomer}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomerForm;
