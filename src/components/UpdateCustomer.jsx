import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateCustomer } from "../utils/api";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerDialogContent from "./CustomerDialogContent";

export default function UpdateCustomer({ currentCustomer }) {
  const [customer, setCustomer] = useState(currentCustomer);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });

  const url = currentCustomer._links.self.href;

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
    updateMutation.mutate({ url, customer });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>EDIT</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update customer</DialogTitle>
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
