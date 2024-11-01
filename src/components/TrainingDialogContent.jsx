import { DialogContent, TextField } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";

export default function TrainingDialogContent({ training, handleChange }) {
  return (
    <DialogContent>
      <StaticDateTimePicker
        required
        margin="dense"
        name="date"
        label="Date and time"
        fullWidth
        defaultValue={dayjs()}
        onChange={(date) => handleChange(date, "date")}
        value={dayjs(training.date)}
      />
      <TextField
        required
        margin="dense"
        name="activity"
        label="Activity"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={training.activity}
      />
      <TextField
        required
        margin="dense"
        name="duration"
        label="Duration"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={training.duration}
      />
    </DialogContent>
  );
}
