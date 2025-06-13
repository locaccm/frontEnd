import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';

// Interface describing the shape of an event object
interface Event {
  EVEN_ID: number;
  EVEC_LIB: string;
  EVED_START: string;
  EVED_END: string;
  USEN_ID?: number;
  ACCN_ID?: number;
}

// Props interface: expects a userId
interface Props {
  userId: number;
}

const Events: React.FC<Props> = ({ userId }) => {
  // State: holds the list of events for the current user
  const [events, setEvents] = useState<Event[]>([]);
  // State: manages the new event being created
  const [newEvent, setNewEvent] = useState({ EVEC_LIB: '', EVED_START: '', EVED_END: '' });
  
  // Loads the list of events from the API based on the userId
  const loadEvents = () => {
    api.get(`/events?userId=${userId}`).then(res => setEvents(res.data));
  };

  // When the component mounts or userId changes, reload the events
   
  useEffect(loadEvents, [userId]);

  // Sends a request to create a new event, then reloads the list
  const handleCreateEvent = () => {
    api.post('/events', { ...newEvent, USEN_ID: userId })
       .then(loadEvents);
  };

  // Sends a request to delete the event by ID, then reloads the list
  const handleDeleteEvent = (id: number) => {
    api.delete(`/events/${id}`).then(loadEvents);
  };

  // Handles updating an event: prompts for new label, sends update, reloads
  const handleUpdateEvent = (event: Event) => {
    const newLib = prompt("Modifier le libellé :", event.EVEC_LIB);
    if (newLib) {
      api.put(`/events/${event.EVEN_ID}`, { EVEC_LIB: newLib }).then(loadEvents);
    }
  };

  return (
    <div>
      <h2>Événements</h2>

      {/* List of events */}
      <ul>
        {events.map(event => (
          <li key={event.EVEN_ID} className="event-item">
            <div className="event-info">
              {/* Display event label and dates */}
              <strong>{event.EVEC_LIB}</strong> du {new Date(event.EVED_START).toLocaleDateString()} au {new Date(event.EVED_END).toLocaleDateString()}
            </div>
            <div className="event-buttons">
              {/* Edit and Delete actions */}
              <button onClick={() => handleUpdateEvent(event)}>Modifier</button>
              <button onClick={() => handleDeleteEvent(event.EVEN_ID)}>Supprimé</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form to create a new event */}
      <h3>Ajouter un événement</h3>
      <input
        type="text"
        placeholder="Libellé"
        value={newEvent.EVEC_LIB}
        onChange={(e) => setNewEvent({ ...newEvent, EVEC_LIB: e.target.value })}
      />
      <input
        type="date"
        value={newEvent.EVED_START}
        onChange={(e) => setNewEvent({ ...newEvent, EVED_START: e.target.value })}
      />
      <input
        type="date"
        value={newEvent.EVED_END}
        onChange={(e) => setNewEvent({ ...newEvent, EVED_END: e.target.value })}
      />
      <button onClick={handleCreateEvent}>Créer</button>
    </div>
  );
};

export default Events;
