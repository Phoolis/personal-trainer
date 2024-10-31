import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomer } from "../utils/api";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerDialogContent from "./CustomerDialogContent";

export default function AddCar() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });

  const [customer, setCustomer] = useState(
    {
      firstname: "",
      lastname: "",
      streetaddress: "",
      postcode: "",
      city: "",
      email: "",
      phone: "",
    },
    []
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    addMutation.mutate(customer);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Add customer</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
        <CustomerDialogContent
          customer={customer}
          handleChange={handleChange}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
