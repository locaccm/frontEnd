import React from "react";
import "../styles/TimeGrid.css";

interface TimeGridEvent {
  id: number;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  color?: string;
}

interface TimeGridProps {
  events: TimeGridEvent[];
  dayDates: string[]; // List of dates (YYYY-MM-DD) to display as columns (1 for day, 7 for week)
  startHour?: number; // Start hour for the grid (e.g., 8)
  endHour?: number;   // End hour for the grid (e.g., 20)
  onEventClick?: (event: TimeGridEvent) => void;
  highlightDate?: string; // To highlight the current day
}

const TimeGrid: React.FC<TimeGridProps> = ({
  events,
  dayDates,
  startHour = 8,
  endHour = 20,
  onEventClick,
  highlightDate
}) => {
  // Generate hours
  const hours = [];
  for (let h = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  // Group events by date
  const eventsByDate: { [date: string]: TimeGridEvent[] } = {};
  dayDates.forEach(date => {
    eventsByDate[date] = events.filter(ev => ev.date === date);
  });

  return (
    <div className="time-grid">
      <div className="time-grid-header">
        <div className="time-grid-hour-col" />
        {dayDates.map(date => (
          <div
            key={date}
            className={
              "time-grid-day-col" +
              (highlightDate === date ? " highlight" : "")
            }
          >
            {date}
          </div>
        ))}
      </div>
      <div className="time-grid-body">
        {hours.map(hour => (
          <div key={hour} className="time-grid-row">
            <div className="time-grid-hour-col">
              {hour}:00
            </div>
            {dayDates.map(date => (
              <div key={date} className="time-grid-cell">
                {eventsByDate[date]
                  .filter(ev =>
                    ev.startTime &&
                    parseInt(ev.startTime.split(":")[0], 10) === hour
                  )
                  .map(ev => (
                    <div
                      key={ev.id}
                      className="time-grid-event"
                      style={{ backgroundColor: ev.color || "#4285f4" }}
                      onClick={() => onEventClick && onEventClick(ev)}
                      title={ev.title}
                    >
                      <strong>{ev.title}</strong>
                      <div>
                        {ev.startTime} - {ev.endTime}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeGrid;
