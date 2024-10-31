import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomer } from "../utils/api";
import { Button } from "@mui/material";

export default function DeleteCustomer({ url }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });

  return (
    <Button
      variant="text"
      color="error"
      onClick={() => deleteMutation.mutate(url)}
    >
      Delete
    </Button>
  );
}
