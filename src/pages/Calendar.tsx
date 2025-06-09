import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../styles/Calendar.css";
import "../styles/CalendarHarmony.css";
import TimeGrid from "../components/TimeGrid";
import { 
  fetchDayEvents, 
  fetchWeekEvents, 
  fetchMonthEvents,
  fetchFilteredEvents,
  createEvent,
  updateEvent as updateEventApi,
  deleteEvent as deleteEventApi,
  fetchUsers,
  fetchAccommodations,
  EventData,
  User,
  Accommodation
} from "../services/api.service";

// Simplified interface for events
interface SimpleEvent {
  id: number;
  title: string;
  date: string;           // Start date
  endDate?: string;       // Optional end date
  startTime?: string;     // Start time (format HH:MM)
  endTime?: string;       // End time (format HH:MM)
  color?: string;         // Optional color for the event
  usagerId?: number;
  logementId?: number;
}

// Type for storing events by date
type EventsMap = {
  [date: string]: SimpleEvent[];
};

// Types for available calendar views
type CalendarView = 'day' | 'week' | 'month' | 'year';

// Add RawEvent for raw API typing
interface RawEvent {
  EVEN_ID: number;
  EVEC_LIB: string;
  EVED_START: string;
  EVED_END?: string;
  USEN_ID?: number;
  ACCN_ID?: number;
}

const Calendar: React.FC = () => {
  // Component state
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [events, setEvents] = useState<EventsMap>({});
  const [newEvent, setNewEvent] = useState<string>("");
  const [newStartDate, setNewStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newEndDate, setNewEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newStartTime, setNewStartTime] = useState<string>("09:00");
  const [newEndTime, setNewEndTime] = useState<string>("10:00");
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth()); // 0-11 for JavaScript
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<SimpleEvent | null>(null);
  const [currentView, setCurrentView] = useState<CalendarView>('month'); // Default view: month
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date()); // Selected day for day/week views
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);
  // Dynamic IDs for user and accommodation
  const [usagerId, setUsagerId] = useState<number | null>(null);
  const [logementId, setLogementId] = useState<number | null>(null);
  // Lists of users and accommodations
  const [users, setUsers] = useState<User[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  // NOTE: using native <input type="time"> for time selection; removed custom hour/minute selectors

  // Colors for events (optimized with useMemo to avoid unnecessary re-renders)
  const eventColors = useMemo(() => [
    "#4285f4", "#ea4335", "#fbbc05", "#34a853", "#8f44ad", "#e67e22"
  ], []);
  
  // Compute number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Determine the first day of the month (0=Sunday, 1=Monday, etc.)
  // This comment replaces the unused firstDayOfMonth declaration removed earlier
  
  // Month names in English
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Weekday names in English
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Month navigation functions (restored after refactor)
  const goToPrevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(new Date(newYear, newMonth, 1));
  };

  const goToNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(new Date(newYear, newMonth, 1));
  };
  
  // Function to format a date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // Load events based on the selected view
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const newEvents: EventsMap = {};
        
        switch(currentView) {
          case 'day': {
            const dayDate = formatDate(selectedDay);
            try {
              const response = await fetchDayEvents(dayDate);
              const dayData = response.data;
              
              // Format events to our structure (API returns EVED_START/EVED_END)
              dayData.events.forEach((event: RawEvent) => {
                const startIso = event.EVED_START;
                const endIso = event.EVED_END || startIso;
                const dateStr = startIso.slice(0, 10);
                const startTime = startIso.slice(11, 16);
                const endTime = endIso.slice(11, 16);
                if (!newEvents[dateStr]) newEvents[dateStr] = [];
                newEvents[dateStr].push({
                  id: event.EVEN_ID,
                  title: event.EVEC_LIB,
                  date: dateStr,
                  endDate: endIso.slice(0, 10),
                  startTime,
                  endTime,
                  color: eventColors[Math.floor(Math.random() * eventColors.length)],
                  usagerId: event.USEN_ID,
                  logementId: event.ACCN_ID
                });
              });
            } catch (err) {
              console.error('Error loading day events:', err);
              setError("Failed to load day events. Demo mode enabled.");
              // Demo mode: add some mock events
              const dayStr = formatDate(selectedDay);
              newEvents[dayStr] = [
                {
                  id: 1,
                  title: "Team Meeting",
                  date: dayStr,
                  startTime: "09:00",
                  endTime: "10:30",
                  color: eventColors[0]
                },
                {
                  id: 2,
                  title: "Client Lunch",
                  date: dayStr,
                  startTime: "12:30",
                  endTime: "14:00",
                  color: eventColors[1]
                }
              ];
            }
            break;
          }
          
          case 'week': {
            // Calculate the first day of the week (Monday) from the selected day
            const weekStart = new Date(selectedDay);
            const dayOfWeek = selectedDay.getDay();
            weekStart.setDate(selectedDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
            
            try {
              const weekDate = formatDate(weekStart);
              const response = await fetchWeekEvents(weekDate);
              const weekData = response.data;
              
              // Format events to our structure (parse EVED_START/EVED_END)
              weekData.events.forEach((event: RawEvent) => {
                const startIso = event.EVED_START;
                const endIso = event.EVED_END || startIso;
                const dateStr = startIso.slice(0, 10);
                const startTime = startIso.slice(11, 16);
                const endTime = endIso.slice(11, 16);
                if (!newEvents[dateStr]) newEvents[dateStr] = [];
                newEvents[dateStr].push({
                  id: event.EVEN_ID,
                  title: event.EVEC_LIB,
                  date: dateStr,
                  endDate: endIso.slice(0, 10),
                  startTime,
                  endTime,
                  color: eventColors[Math.floor(Math.random() * eventColors.length)],
                  usagerId: event.USEN_ID,
                  logementId: event.ACCN_ID
                });
              });
            } catch (err) {
              console.error('Error loading week events:', err);
              setError("Failed to load week events. Demo mode enabled.");
              
              // Demo mode: add some mock events for multiple days of the week
              for (let i = 0; i < 7; i++) {
                const day = new Date(weekStart);
                day.setDate(weekStart.getDate() + i);
                const dayStr = formatDate(day);
                
                if (i % 2 === 0) { // Add events for certain days only
                  newEvents[dayStr] = [
                    {
                      id: i * 10 + 1,
                      title: `Event ${i + 1}`,
                      date: dayStr,
                      startTime: "10:00",
                      endTime: "11:30",
                      color: eventColors[i % eventColors.length]
                    }
                  ];
                }
              }
            }
            break;
          }
          
          case 'month':
          default: {
            try {
              const response = await fetchMonthEvents(currentMonth + 1, currentYear);
              const monthData = response.data;
              
              // Format events to our structure (parse EVED_START/EVED_END)
              monthData.events.forEach((event: RawEvent) => {
                const startIso = event.EVED_START;
                const endIso = event.EVED_END || startIso;
                const dateStr = startIso.slice(0, 10);
                const startTime = startIso.slice(11, 16);
                const endTime = endIso.slice(11, 16);
                if (!newEvents[dateStr]) newEvents[dateStr] = [];
                newEvents[dateStr].push({
                  id: event.EVEN_ID,
                  title: event.EVEC_LIB,
                  date: dateStr,
                  endDate: endIso.slice(0, 10),
                  startTime,
                  endTime,
                  color: eventColors[Math.floor(Math.random() * eventColors.length)],
                  usagerId: event.USEN_ID,
                  logementId: event.ACCN_ID
                });
              });
            } catch (err) {
              console.error('Error loading month events:', err);
              setError("Failed to load month events. Demo mode enabled.");
              
              // Demo mode: add some mock events
              for (let i = 1; i <= daysInMonth; i++) {
                if (i % 5 === 0) { 
                  const dateStr = formatDate(new Date(currentYear, currentMonth, i));
                  newEvents[dateStr] = [
                    {
                      id: i,
                      title: `Event ${i}`,
                      date: dateStr,
                      startTime: "14:00",
                      endTime: "15:30",
                      color: eventColors[i % eventColors.length]
                    }
                  ];
                }
              }
            }
            break;
          }
          case 'year': {
            // Load all events for the year via the filter API
            try {
              const start = `${currentYear.toString().padStart(4,'0')}-01-01`;
              const end = `${currentYear.toString().padStart(4,'0')}-12-31`;
              const response = await fetchFilteredEvents({ dateStart: start, dateEnd: end });
              const yearEvents: RawEvent[] = response.data;
              yearEvents.forEach((event: RawEvent) => {
                const startIso = event.EVED_START;
                const endIso = event.EVED_END || startIso;
                const dateStr = startIso.slice(0, 10);
                const startTime = startIso.slice(11, 16);
                const endTime = endIso.slice(11, 16);
                if (!newEvents[dateStr]) newEvents[dateStr] = [];
                newEvents[dateStr].push({
                  id: event.EVEN_ID,
                  title: event.EVEC_LIB,
                  date: dateStr,
                  endDate: endIso.slice(0, 10),
                  startTime,
                  endTime,
                  color: eventColors[Math.floor(Math.random() * eventColors.length)],
                  usagerId: event.USEN_ID,
                  logementId: event.ACCN_ID
                });
              });
            } catch (err) {
              console.error("Error loading year events:", err);
            }
            break;
          }
        }
        
        setEvents(newEvents);
      } catch (error) {
        console.error("Error loading events:", error);
        setError("An error occurred while loading events.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
    
    // If in day or week view, update the selected date
    if (currentView === 'day' || currentView === 'week') {
      const day = selectedDay.getDate();
      setSelectedDate(day);
    }
  }, [currentView, currentMonth, currentYear, selectedDay, eventColors, daysInMonth, reloadFlag]);

  // Load users and accommodations dynamically
  useEffect(() => {
    const loadRefs = async () => {
      try {
        const usersRes = await fetchUsers();
        setUsers(usersRes.data);
        const accRes = await fetchAccommodations();
        setAccommodations(accRes.data);
      } catch (err) {
        console.error("Error loading users/accommodations:", err);
        setError("Failed to load users/accommodations.");
      }
    };
    loadRefs();
  }, []);

// Section 2 - Navigation and event functions

  // Function to select a date
  const selectDate = (day: number) => {
    setSelectedDate(day);
    setSelectedDay(new Date(currentYear, currentMonth, day));
  };
  
  // Function to add an event (server sync)
  const addEvent = async () => {
    if (newEvent.trim() === "") return;
    setError(null);
    // Client-side validations
    if (!usagerId || !logementId) {
      setError("User and accommodation are required.");
      return;
    }
    const start = newStartDate;
    const end = newEndDate;
    if (start > end) {
      setError("End date must be after or equal to start date.");
      return;
    }
    if (start === end && newStartTime >= newEndTime) {
      setError("End time must be after start time.");
      return;
    }
    const payload: EventData = {
      title: newEvent,
      startTime: newStartTime,
      endTime: newEndTime,
      usagerId: usagerId,
      logementId: logementId,
    };
    // Choose format based on single- or multi-day
    if (start === end) {
      payload.date = start;
    } else {
      payload.dateStart = start;
      payload.dateEnd = end;
    }
    try {
      await createEvent(payload);
      setReloadFlag(prev => !prev);
      setNewEvent("");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event.");
    }
  };
  
  // Function to update an event (server sync)
  const updateEvent = async () => {
    if (!editingEvent || !selectedDate) return;
    setError(null);
    // Client-side validations
    if (!usagerId || !logementId) {
      setError("User and accommodation are required.");
      return;
    }
    const start = editingEvent.date;
    const end = editingEvent.endDate || newEndDate;
    if (start > end) {
      setError("End date must be after or equal to start date.");
      return;
    }
    if (start === end && newStartTime >= newEndTime) {
      setError("End time must be after start time.");
      return;
    }
    const payload: EventData = {
      title: editingEvent.title,
      startTime: newStartTime,
      endTime: newEndTime,
      usagerId: usagerId,
      logementId: logementId,
    };
    // Choose format based on single- or multi-day
    if (start === end) {
      payload.date = start!;
    } else {
      payload.dateStart = start!;
      payload.dateEnd = end!;
    }
    try {
      await updateEventApi(editingEvent.id, payload);
      setReloadFlag(prev => !prev);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event.");
    }
  };

  // Function to delete the edited event (server sync)
  const deleteCurrentEvent = async () => {
    if (!editingEvent) return;
    if (!window.confirm("Confirm deletion of this event?")) return;
    try {
      await deleteEventApi(editingEvent.id);
      setReloadFlag(prev => !prev);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  // Function to change view
  const changeView = (view: CalendarView) => {
    setCurrentView(view);
    
    // If switching to day view, ensure the selected date is set
    if (view === 'day' && !selectedDate) {
      setSelectedDate(new Date().getDate());
    }
  };
  
  // Function to navigate to a specific date (used for date navigation)
  const navigateToDate = useCallback((date: Date) => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setSelectedDay(date);
    setSelectedDate(date.getDate());
  }, []);
  
  // Use navigateToDate in useEffect to avoid lint error
  useEffect(() => {
    // Go to the current date on initial load
    if (currentView === 'day') {
      navigateToDate(new Date());
    }
  }, [currentView, navigateToDate]);
  
  // Get events based on the current view
  const getSelectedDateEvents = () => {
    // Month view - return events for the selected date
    if (currentView === 'month' && selectedDate) {
      const dateStr = formatDate(new Date(currentYear, currentMonth, selectedDate));
      return events[dateStr] || [];
    }
    
    // Day view - return events for the displayed day
    if (currentView === 'day') {
      const dateStr = formatDate(selectedDay);
      return events[dateStr] || [];
    }
    
    // Week view - return all events for the current week
    if (currentView === 'week') {
      // Determine the start and end dates of the week
      const firstDayOfWeek = new Date(selectedDay);
      const dayOfWeek = selectedDay.getDay();
      firstDayOfWeek.setDate(selectedDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      
      // Collect all events for the week
      const weekEvents: SimpleEvent[] = [];
      
      // Iterate through all days of the week
      for (let d = new Date(firstDayOfWeek); d <= lastDayOfWeek; d.setDate(d.getDate() + 1)) {
        const dateStr = formatDate(d);
        if (events[dateStr]) {
          weekEvents.push(...events[dateStr]);
        }
      }
      
      // Sort by date then by time
      return weekEvents.sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        return a.startTime ? a.startTime.localeCompare(b.startTime || '') : -1;
      });
    }
    
    return [];
  };
  
  // Generate calendar cells
  const renderCalendarCells = () => {
    const cells = [];
    // flatten all events for multi-day support
    const allEvents = Object.values(events).flat();
    const monthStartDate = new Date(currentYear, currentMonth, 1);
    const monthStartDay = monthStartDate.getDay(); // 0 (Sunday) to 6 (Saturday)

    // empty cells before month start
    for (let i = 0; i < monthStartDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(new Date(currentYear, currentMonth, day));
      // include events spanning this date
      const cellEvents = allEvents.filter(ev => {
        const start = ev.date;
        const end = ev.endDate || ev.date;
        return start <= dateStr && dateStr <= end;
      });
      const hasEvents = cellEvents.length > 0;
      const isCurrentDay = day === new Date().getDate() && 
                          currentMonth === new Date().getMonth() && 
                          currentYear === new Date().getFullYear();
      const isSelected = day === selectedDate;
      
      cells.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isCurrentDay ? 'current-day' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => selectDate(day)}
        >
          <div className="day-number">{day}</div>
          {hasEvents && (
            <div className="event-indicators">
              {cellEvents.map(ev => {
                const isMulti = !!ev.endDate && ev.endDate !== ev.date;
                const isStart = ev.date === dateStr;
                const isEnd = ev.endDate === dateStr;
                let cls = 'event-indicator';
                if (isMulti) cls += ' multi-day';
                if (isMulti && isStart) cls += ' event-start';
                else if (isMulti && isEnd) cls += ' event-end';
                else if (isMulti) cls += ' event-middle';
                return (
                  <div key={`indicator-${ev.id}`} className={cls} style={{ backgroundColor: ev.color }} title={ev.title} />
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return cells;
  };


// Section 3 - JSX for the calendar

  // Main render of the component
  return (
    <div className="calendar-container">
      {/* Loading indicator */}
      {isLoading && <div className="loading-indicator">Loading events...</div>}
      
      {/* Header with navigation and view selector */}
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={goToPrevMonth}>❮</button>
          <span className="calendar-header-title" onClick={() => changeView('year')}>
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button onClick={goToNextMonth}>❯</button>
          <div className="month-year-selector">
            <input
              type="month"
              value={`${currentYear.toString().padStart(4,'0')}-${String(currentMonth + 1).padStart(2, '0')}`}
              onChange={e => {
                const [year, month] = e.target.value.split('-').map(Number);
                setCurrentMonth(month - 1);
                setCurrentYear(year);
                const d = new Date(year, month - 1, 1);
                setSelectedDay(d);
              }}
            />
          </div>
        </div>
      </div>
      
      {/* View selector */}
      <div className="view-selector">
        <button 
          className={`view-button ${currentView === 'day' ? 'active' : ''}`} 
          onClick={() => changeView('day')}
        >
          Day
        </button>
        <button 
          className={`view-button ${currentView === 'week' ? 'active' : ''}`} 
          onClick={() => changeView('week')}
        >
          Week
        </button>
        <button 
          className={`view-button ${currentView === 'month' ? 'active' : ''}`} 
          onClick={() => changeView('month')}
        >
          Month
        </button>
        <button 
          className={`view-button ${currentView === 'year' ? 'active' : ''}`} 
          onClick={() => changeView('year')}
        >
          Year
        </button>
      </div>
      
      {/* Display calendar based on the selected view */}
      {currentView === 'month' && (
        <div className="calendar-days">
          {dayNames.map(day => (
            <div key={day} className="calendar-day-name">{day}</div>
          ))}
          
          <div className="calendar-grid">
            {renderCalendarCells()}
          </div>
        </div>
      )}
      
      {currentView === 'day' && (
        <div className="day-view">
          <div className="day-view-header">
            <h3 className="day-view-title">Agenda for {selectedDay.getDate()} {monthNames[selectedDay.getMonth()]} {selectedDay.getFullYear()}</h3>
            <div className="day-nav">
              <button
                className="nav-button"
                onClick={() => {
                  const prev = new Date(selectedDay);
                  prev.setDate(prev.getDate() - 1);
                  setSelectedDay(prev);
                }}
              >❮</button>
              <button
                className="nav-button today-button"
                onClick={() => setSelectedDay(new Date())}
              >Today</button>
              <button
                className="nav-button"
                onClick={() => {
                  const next = new Date(selectedDay);
                  next.setDate(next.getDate() + 1);
                  setSelectedDay(next);
                }}
              >❯</button>
              <input
                className="date-picker"
                type="date"
                value={formatDate(selectedDay)}
                onChange={e => {
                  const d = new Date(e.target.value);
                  setSelectedDay(d);
                  setCurrentMonth(d.getMonth());
                  setCurrentYear(d.getFullYear());
                }}
              />
            </div>
          </div>
          <TimeGrid
            events={getSelectedDateEvents()}
            dayDates={[formatDate(selectedDay)]}
            highlightDate={formatDate(new Date())}
            onEventClick={setEditingEvent}
          />
        </div>
      )}
      
      {currentView === 'week' && (
        <div className="week-view">
          <div className="week-view-header">
            <h3 className="week-view-title">
              Agenda for the week of {(() => {
                const weekStart = new Date(selectedDay);
                const dayOfWeek = weekStart.getDay();
                weekStart.setDate(weekStart.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
                return `${weekStart.getDate()} ${monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
              })()}
            </h3>
            <div className="week-nav">
              <button
                className="nav-button"
                onClick={() => {
                  const prev = new Date(selectedDay);
                  prev.setDate(prev.getDate() - 7);
                  setSelectedDay(prev);
                }}
              >❮</button>
              <button
                className="today-button"
                onClick={() => setSelectedDay(new Date())}
              >This week</button>
              <button
                className="nav-button"
                onClick={() => {
                  const next = new Date(selectedDay);
                  next.setDate(next.getDate() + 7);
                  setSelectedDay(next);
                }}
              >❯</button>
              <input
                className="date-picker"
                type="date"
                value={formatDate(selectedDay)}
                onChange={e => {
                  const d = new Date(e.target.value);
                  const dow = d.getDay();
                  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
                  setSelectedDay(d);
                  setCurrentMonth(d.getMonth());
                  setCurrentYear(d.getFullYear());
                }}
              />
            </div>
          </div>
          <TimeGrid
            events={getSelectedDateEvents()}
            dayDates={(() => {
              // Week: calculate the 7 days
              const days: string[] = [];
              const weekStart = new Date(selectedDay);
              const dayOfWeek = weekStart.getDay();
              weekStart.setDate(weekStart.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
              for (let i = 0; i < 7; i++) {
                const d = new Date(weekStart);
                d.setDate(weekStart.getDate() + i);
                days.push(formatDate(d));
              }
              return days;
            })()}
            highlightDate={formatDate(new Date())}
            onEventClick={setEditingEvent}
          />
        </div>
      )}
      
      {currentView === 'year' && (
        <div className="year-view">
          <div className="year-view-header">
            <h3>Year View</h3>
            <input
              className="year-input"
              type="number"
              min={1900}
              max={2100}
              value={currentYear}
              onChange={e => {
                const year = Number(e.target.value);
                setCurrentYear(year);
                setCurrentMonth(0);
                setSelectedDay(new Date(year, 0, 1));
              }}
            />
          </div>
          <div className="year-months">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className={`year-month ${i === currentMonth ? 'current' : ''}`} onClick={() => {
                setCurrentMonth(i);
                setSelectedDay(new Date(currentYear, i, 1));
                changeView('month');
              }}>
                <div className="year-month-header">{monthNames[i]}</div>
                <div className="year-month-dots">
                  {Object.keys(events).some(date => {
                    const eventDate = new Date(date);
                    return eventDate.getMonth() === i && eventDate.getFullYear() === currentYear;
                  }) && (
                    <div className="has-events"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Event form */}
      {(selectedDate || currentView === 'day' || currentView === 'week') && currentView !== 'year' && (
        <div className="event-container">
          <div className="event-form">
            <h3>{editingEvent ? "Edit Event" : "Add Event"}</h3>
            {/* Placeholder to reserve space for error without shifting layout */}
            <div className="error-placeholder">
              {error && <div className="error-message">{error}</div>}
            </div>
            <div className="form-fields">
              {/* User/Accommodation selection */}
              <div className="form-group">
                <label htmlFor="usagerId">Users :</label>
                <select
                  id="usagerId"
                  value={editingEvent ? editingEvent.usagerId ?? "" : usagerId ?? ""}
                  onChange={e => {
                    setError(null);
                    const id = Number(e.target.value);
                    if (editingEvent) {
                      setEditingEvent({ ...editingEvent, usagerId: id });
                    } else {
                      setUsagerId(id);
                    }
                  }}
                  required
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.USEN_ID} value={user.USEN_ID}>
                      {user.USEC_FNAME} {user.USEC_LNAME.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="logementId">Accommodations :</label>
                <select
                  id="logementId"
                  value={editingEvent ? editingEvent.logementId ?? "" : logementId ?? ""}
                  onChange={e => {
                    setError(null);
                    const id = Number(e.target.value);
                    if (editingEvent) {
                      setEditingEvent({ ...editingEvent, logementId: id });
                    } else {
                      setLogementId(id);
                    }
                  }}
                  required
                >
                  <option value="">Select an accommodation</option>
                  {accommodations.map(acc => (
                    <option key={acc.ACCN_ID} value={acc.ACCN_ID}>
                      {acc.ACCC_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group full-width">
                 <label htmlFor="eventTitle">Title :</label>
                 <input
                   type="text"
                   id="eventTitle"
                   className="event-title-input"
                   value={editingEvent ? editingEvent.title : newEvent}
                   onChange={e => editingEvent
                     ? setEditingEvent({ ...editingEvent, title: e.target.value })
                     : setNewEvent(e.target.value)
                   }
                   placeholder="Event title"
                 />
               </div>
              {/* Date and Time */}
              <div className="datetime-grid">
                <div>
                  <label htmlFor="startDate">Start Date :</label>
                  <input
                    type="date"
                    id="startDate"
                    className="date-picker"
                    value={editingEvent ? editingEvent.date : newStartDate}
                    onChange={e => {
                      setNewStartDate(e.target.value);
                      const d = new Date(e.target.value);
                      setSelectedDay(d);
                      if (editingEvent) setEditingEvent({ ...editingEvent, date: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="endDate">End Date :</label>
                  <input
                    type="date"
                    id="endDate"
                    className="date-picker"
                    value={editingEvent?.endDate || newEndDate}
                    onChange={e => {
                      setNewEndDate(e.target.value);
                      if (editingEvent) setEditingEvent({ ...editingEvent, endDate: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="startTime">Start Time :</label>
                  <input
                    type="time"
                    id="startTime"
                    className="time-picker"
                    value={editingEvent?.startTime || newStartTime}
                    onChange={e => {
                      const t = e.target.value;
                      if (editingEvent) setEditingEvent({ ...editingEvent, startTime: t });
                      else setNewStartTime(t);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="endTime">End Time :</label>
                  <input
                    type="time"
                    id="endTime"
                    className="time-picker"
                    value={editingEvent?.endTime || newEndTime}
                    onChange={e => {
                      const t = e.target.value;
                      if (editingEvent) setEditingEvent({ ...editingEvent, endTime: t });
                      else setNewEndTime(t);
                    }}
                  />
                </div>
              </div>
              <div className="form-actions">
                {editingEvent ? (
                  <>
                    <button className="save-button" onClick={updateEvent}>Save</button>
                    <button className="delete-button" onClick={deleteCurrentEvent}>Delete</button>
                    <button className="cancel-button" onClick={() => setEditingEvent(null)}>Cancel</button>
                  </>
                ) : (
                  <button 
                    className="save-button" 
                    onClick={addEvent}
                    disabled={!newEvent.trim()}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
            
            {/* List of events based on the current view */}
            {(currentView === 'month' || currentView === 'day' || currentView === 'week') && (
              <div className="events-list">
                <h3>
                  {currentView === 'month' && selectedDate && `Events for ${selectedDate} ${monthNames[currentMonth]} ${currentYear}`}
                  {currentView === 'day' && `Events for ${selectedDay.getDate()} ${monthNames[selectedDay.getMonth()]} ${selectedDay.getFullYear()}`}
                  {currentView === 'week' && `Events for the week`}
                </h3>
                {getSelectedDateEvents().length > 0 ? (
                  <ul>
                    {getSelectedDateEvents().map(event => (
                      <li key={event.id} style={{ borderLeft: `4px solid ${event.color}` }}>
                        <div className="event-time">{event.startTime} - {event.endTime}</div>
                        <div className="event-title">{event.title}</div>
                        <div className="event-actions">
                          <button onClick={() => setEditingEvent(event)}>Edit</button>
                          <button onClick={deleteCurrentEvent}>Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No events for this date</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
