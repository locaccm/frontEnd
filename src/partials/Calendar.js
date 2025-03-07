import React, { useState } from "react";
import "../css/Calendar.css";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [newEvent, setNewEvent] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const handleAddEvent = () => {
        if (newEvent.trim() === "") return;
        const key = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
        setEvents({
            ...events,
            [key]: [...(events[key] || []), newEvent],
        });
        setNewEvent("");
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

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
            <h2>Calendrier des Rendez-vous</h2>
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>❮</button>
                <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
                <button onClick={handleNextMonth}>❯</button>
            </div>
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
            {selectedDate && (
                <div className="event-form">
                    <h3>Événements du {selectedDate} {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h3>
                    <ul>
                        {(events[`${currentYear}-${currentMonth + 1}-${selectedDate}`] || []).map((event, idx) => (
                            <li key={idx}>{event}</li>
                        ))}
                    </ul>
                    <input 
                        type="text" 
                        value={newEvent} 
                        onChange={(e) => setNewEvent(e.target.value)}
                        placeholder="Ajouter un événement"
                    />
                    <button onClick={handleAddEvent}>Ajouter</button>
                </div>
            )}
        </div>
    );
};

export default Calendar;
