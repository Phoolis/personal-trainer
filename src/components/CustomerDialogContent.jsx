import { DialogContent, TextField } from "@mui/material";

export default function CustomerDialogContent({ customer, handleChange }) {
  return (
    <DialogContent>
      <TextField
        required
        margin="dense"
        name="firstname"
        label="First Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.firstname}
      />
      <TextField
        required
        margin="dense"
        name="lastname"
        label="Last Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.lastname}
      />
      <TextField
        required
        margin="dense"
        name="streetaddress"
        label="Street Address"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.streetaddress}
      />
      <TextField
        required
        margin="dense"
        name="postcode"
        label="Postcode"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.postcode}
      />
      <TextField
        required
        margin="dense"
        name="city"
        label="City"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.city}
      />
      <TextField
        required
        margin="dense"
        name="email"
        label="Email"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.email}
      />
      <TextField
        required
        margin="dense"
        name="phone"
        label="Phone"
        type="text"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={customer.phone}
      />
    </DialogContent>
  );
}
