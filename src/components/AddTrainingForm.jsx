import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { addTraining, getAllCustomers } from "../api";

function AddTrainingForm({ handleFetchTrainings }) {
  const [showAddTrainingForm, setShowAddTrainingForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [training, setTraining] = useState({
    date: null,
    duration: "",
    activity: "",
    customer: "",
  });
  const [customerName, setCustomerName] = useState("");

  const handleCloseForm = () => {
    setShowAddTrainingForm(false);
    setCustomerName("");
    setTraining({ date: null, duration: "", activity: "", customer: "" });
  };

  const handleSelect = (e) => {
    setCustomerName(e.target.value);
  };

  const handleChangeInput = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleCreateTraining = () => {
    try {
      addTraining(training).then(() => {
        handleFetchTrainings();
        handleCloseForm();
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    try {
      getAllCustomers().then((res) => {
        setCustomers(res._embedded.customers);
      });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        style={{ borderRadius: "15px", margin: "10px" }}
        onClick={() => setShowAddTrainingForm(true)}
      >
        new training
      </Button>
      <Dialog open={showAddTrainingForm} onClose={handleCloseForm}>
        <DialogTitle>New Training</DialogTitle>

        <DialogContent>
          <Box sx={{ minWidth: 500, m: "5px 0" }}>
            <FormControl fullWidth>
              <InputLabel id="customer-name">Customer Name</InputLabel>
              <Select
                labelId="customer-name"
                value={customerName}
                label="Customer Name"
                onChange={handleSelect}
              >
                {customers.map((customer, index) => (
                  <MenuItem
                    onClick={() =>
                      setTraining({
                        ...training,
                        customer: customer._links.self.href,
                      })
                    }
                    key={index}
                    value={index}
                  >{`${customer.firstname} ${customer.lastname}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 500, mt: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ width: "100%" }}
                label="Date"
                value={training.date ? dayjs(training.date) : null}
                onChange={(newDate) =>
                  setTraining({
                    ...training,
                    date: newDate.toISOString(),
                  })
                }
              />
            </LocalizationProvider>
          </Box>
          <TextField
            label="Activity"
            autoFocus
            required
            margin="dense"
            name="activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={(e) => handleChangeInput(e)}
          />
          <TextField
            label="Duration"
            required
            margin="dense"
            name="duration"
            fullWidth
            type="number"
            variant="standard"
            value={training.duration}
            onChange={(e) => handleChangeInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseForm}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTraining}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTrainingForm;
