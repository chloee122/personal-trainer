import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { editCustomer } from "../api";
import EditIcon from "@mui/icons-material/Edit";

function EditCustomerForm({ data, handleFetchCustomers }) {
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

  const handleOpenForm = () => {
    setShowAddCustomerForm(true);
    setCustomer(data);
  };

  const handleCloseForm = () => {
    setShowAddCustomerForm(false);
  };

  const handleEditCustomer = () => {
    try {
      editCustomer(data._links.self.href, customer).then(() => {
        handleFetchCustomers();
        handleCloseForm();
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button onClick={handleOpenForm}>
        <EditIcon />
      </Button>
      <Dialog open={showAddCustomerForm} onClose={handleCloseForm}>
        <DialogTitle>Edit Customer</DialogTitle>
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
            onClick={handleEditCustomer}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCustomerForm;
