import { useTrainings } from "./TrainingsContext";
import { useMemo } from "react";
import { groupBy, map, sumBy } from "lodash";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TrainingStats() {
  const { trainings, isLoading } = useTrainings();

  // empty array if trainings is undefined or still loading
  const safeTrainings = isLoading ? [] : trainings || [];

  const data = useMemo(() => {
    const groupedByActivity = groupBy(safeTrainings, "activity");

    return map(groupedByActivity, (items, activity) => ({
      activity,
      totalDuration: sumBy(items, "duration"),
    }));
  }, [safeTrainings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={800}>
      <BarChart
        data={data}
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis
          label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar dataKey="totalDuration" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
