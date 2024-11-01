import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTraining } from "../utils/api";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import TrainingDialogContent from "./TrainingDialogContent";
import dayjs from "dayjs";

export default function AddTraining({ url }) {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTraining,
    onSuccess: () => queryClient.invalidateQueries(["trainings"]),
  });

  const [training, setTraining] = useState(
    {
      date: "",
      activity: "",
      duration: "",
      customer: url,
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

  const handleChange = (eventOrDate, fieldName) => {
    if (fieldName == "date") {
      setTraining({
        ...training,
        date: dayjs(eventOrDate).toISOString(),
      });
    } else {
      setTraining({
        ...training,
        [eventOrDate.target.name]: eventOrDate.target.value,
      });
    }
  };

  const handleSave = () => {
    addMutation.mutate(training);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Add training</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New training</DialogTitle>
        <TrainingDialogContent
          training={training}
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
