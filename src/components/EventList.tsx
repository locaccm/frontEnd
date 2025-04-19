import React, { useEffect, useState } from 'react';
import {Event} from '../interfaces/Event.interface.js'
import {fakeData} from '../data/fakedataListEvent.js';

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulating an API call with a timeout to mimic fetching events
    useEffect(() => {
        setTimeout(() => {
            try {
                setEvents(fakeData);
            } catch (e) {
                console.error(e);
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        }, 1000);
    }, []);

    // Render loading message while fetching events
    if (loading) return <div className="event-list-container">Chargement des événements...</div>;
    
    // Render error message if something goes wrong
    if (error) return <div className="event-list-container">{error}</div>;

    {/* List of events */}
    return (
        <div className="event-list-container">
            <h2 className="event-list-title">📅 Événements à venir</h2>
            <ul className="event-list">
                {events.map((event) => (
                    <li key={event.id} className="event-item">
                        <div className="event-title">{event.title}</div>
                        <div className="event-date">{new Date(event.date).toLocaleDateString()}</div>
                        {event.description && <p className="event-description">{event.description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
