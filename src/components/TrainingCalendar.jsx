import "../calendarStyles.css";

import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useTrainings } from "./TrainingsContext";
import { useMemo } from "react";

export default function TrainingCalendar() {
  const { trainings, isLoading } = useTrainings();
  const localizer = dayjsLocalizer(dayjs);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const events = useMemo(() => {
    return trainings.map((training) => ({
      title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
      start: new Date(training.date),
      end: dayjs(training.date).add(training.duration, "minute").toDate(),
    }));
  }, [trainings]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000 }}
        defaultView={Views.WEEK}
      />
    </div>
  );
}
