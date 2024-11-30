import { useState, useEffect } from "react";
import { getTrainings } from "../api";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

function TrainingCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    handleFetchTrainings();
  }, []);

  const handleFetchTrainings = () => {
    try {
      getTrainings().then((res) => setTrainings(res));
    } catch (error) {
      console.error(error.message);
    }
  };

  const calendarEvents = trainings.map((training) => {
    if (training.customer) {
      const {
        activity,
        date,
        duration,
        customer: { firstname, lastname },
      } = training;

      const endDate = new Date(date);
      endDate.setMinutes(endDate.getMinutes() + duration);

      return {
        title: `${activity} / ${firstname} ${lastname}`,
        start: new Date(date),
        end: endDate,
      };
    }
  });

  const localizer = momentLocalizer(moment);

  return (
    <div style={{ height: "85vh" }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default TrainingCalendar;
