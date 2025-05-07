// src/components/Events.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

interface Event {
  EVEN_ID: number;
  EVEC_LIB: string;
  EVED_START: string;
  EVED_END: string;
}

interface Props {
  userId: number;
}

const Events: React.FC<Props> = ({ userId }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api.get<Event[]>(`/events?userId=${userId}`).then((res) => setEvents(res.data));
  }, [userId]);

  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event.EVEN_ID}>
            {event.EVEC_LIB} ({event.EVED_START} - {event.EVED_END})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
