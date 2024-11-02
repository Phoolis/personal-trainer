import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTrainings } from "../utils/api";

const TrainingsContext = createContext();

export const useTrainings = () => {
  return useContext(TrainingsContext);
};

export const TrainingsProvider = ({ children }) => {
  const { data: trainings = [], isLoading } = useQuery({
    queryKey: ["trainings"],
    queryFn: fetchTrainings,
  });

  return (
    <TrainingsContext.Provider value={{ trainings, isLoading }}>
      {children}
    </TrainingsContext.Provider>
  );
};
