import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useTrainings } from "./TrainingsContext";

export default function TrainingCalendar() {
  const trainings = useTrainings();
  const localizer = dayjsLocalizer(dayjs);

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000 }}
      />
    </div>
  );
}
