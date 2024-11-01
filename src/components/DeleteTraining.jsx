import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTraining } from "../utils/api";
import { Button } from "@mui/material";

export default function DeleteTraining({ id }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTraining,
    onSuccess: () => queryClient.invalidateQueries(["trainings"]),
  });

  return (
    <Button
      variant="text"
      color="error"
      onClick={() => deleteMutation.mutate(id)}
    >
      Delete
    </Button>
  );
}
