// src/components/Events.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

interface Event {
  EVEN_ID: number;
  EVEC_LIB: string;
  EVED_START: string;
  EVED_END: string;
  USEN_ID?: number;
  ACCN_ID?: number;
}

interface Props {
  userId: number;
}

const Events: React.FC<Props> = ({ userId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ EVEC_LIB: '', EVED_START: '', EVED_END: '' });
  
  const loadEvents = () => {
    api.get(`/events?userId=${userId}`).then(res => setEvents(res.data));
  };

  useEffect(loadEvents, [userId]);

  const handleCreateEvent = () => {
    api.post('/events', { ...newEvent, USEN_ID: userId })
       .then(loadEvents);
  };

  const handleDeleteEvent = (id: number) => {
    api.delete(`/events/${id}`).then(loadEvents);
  };

  const handleUpdateEvent = (event: Event) => {
    const newLib = prompt("Modifier le libellé :", event.EVEC_LIB);
    if (newLib) {
      api.put(`/events/${event.EVEN_ID}`, { EVEC_LIB: newLib }).then(loadEvents);
    }
  };

  return (
    <div>
      <h2>Événements</h2>

      <ul>
  {events.map(event => (
    <li key={event.EVEN_ID} className="event-item">
      <div className="event-info">
        <strong>{event.EVEC_LIB}</strong> du {new Date(event.EVED_START).toLocaleDateString()} au {new Date(event.EVED_END).toLocaleDateString()}
      </div>
      <div className="event-buttons">
        <button onClick={() => handleUpdateEvent(event)}>Modifier</button>
        <button onClick={() => handleDeleteEvent(event.EVEN_ID)}>Supprimé</button>
      </div>
    </li>
  ))}
</ul>


      <h3>Ajouter un événement</h3>
      <input type="text" placeholder="Libellé" value={newEvent.EVEC_LIB} onChange={(e) => setNewEvent({...newEvent, EVEC_LIB: e.target.value})}/>
      <input type="date" value={newEvent.EVED_START} onChange={(e) => setNewEvent({...newEvent, EVED_START: e.target.value})}/>
      <input type="date" value={newEvent.EVED_END} onChange={(e) => setNewEvent({...newEvent, EVED_END: e.target.value})}/>
      <button onClick={handleCreateEvent}>Créer</button>
    </div>
  );
};

export default Events;
