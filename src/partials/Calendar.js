import React, { useState } from "react";
import "../css/Calendar.css";

const Calendar = () => {
    // States to manage the selected date, events, and current date
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [newEvent, setNewEvent] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Calculate the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Function to handle clicking on a calendar date
    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    // Function to add an event to the selected date
    const handleAddEvent = () => {
        if (newEvent.trim() === "") return;
        const key = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
        setEvents({
            ...events,
            [key]: [...(events[key] || []), newEvent],
        });
        setNewEvent(""); // Reset the input field
    };

    // Function to navigate to the previous month
    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Function to navigate to the next month
    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="calendar-container">
            {/* Calendar header with navigation buttons */}
            <h2>Appointment Calendar</h2>
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>❮</button>
                <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
                <button onClick={handleNextMonth}>❯</button>
            </div>

            {/* Calendar grid displaying all days of the month */}
            <div className="calendar-grid">
                {[...Array(daysInMonth)].map((_, index) => {
                    const day = index + 1;
                    const key = `${currentYear}-${currentMonth + 1}-${day}`;
                    return (
                        <div 
                            key={day} 
                            className={`calendar-day ${selectedDate === day ? "selected" : ""}`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                            {events[key] && <span className="event-indicator">🔵</span>}
                        </div>
                    );
                })}
            </div>

            {/* Event form to add events when a date is selected */}
            {selectedDate && (
                <div className="event-form">
                    <h3>Events on {selectedDate} {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h3>
                    <ul>
                        {(events[`${currentYear}-${currentMonth + 1}-${selectedDate}`] || []).map((event, idx) => (
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
