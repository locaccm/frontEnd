import React, { useState } from "react";
import "../styles/Calendar.css";
import {Events} from "../interfaces/Calendar.interface.js"

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [events, setEvents] = useState<Events>({});
  const [newEvent, setNewEvent] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Handle user clicking on a calendar day
  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  // Add a new event to a selected date
  const handleAddEvent = () => {
    if (newEvent.trim() === "" || selectedDate === null) return;
    const key = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
    setEvents((prevEvents) => ({
      ...prevEvents,
      [key]: [...(prevEvents[key] || []), newEvent],
    }));
    setNewEvent("");
  };

  // Navigate to the previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="calendar-container">
      {/* Calendar header with month navigation */}
      <h2>Appointment Calendar</h2>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>❮</button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </span>
        <button onClick={handleNextMonth}>❯</button>
      </div>

      {/* Calendar days rendering */}
      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const key = `${currentYear}-${currentMonth + 1}-${day}`;
          return (
            <div
              key={day}
              className={`calendar-day ${
                selectedDate === day ? "selected" : ""
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day}
              {events[key] && <span className="event-indicator">🔵</span>}
            </div>
          );
        })}
      </div>

      {/* Form to display and add events for a selected date */}
      {selectedDate !== null && (
        <div className="event-form">
          <h3>
            Events on {selectedDate}{" "}
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}{" "}
            {currentYear}
          </h3>
          <ul>
            {(events[`${currentYear}-${currentMonth + 1}-${selectedDate}`] ||
              []).map((event, idx) => (
              <li key={idx}>{event}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Add an event"
          />
          <button onClick={handleAddEvent}>Add</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
