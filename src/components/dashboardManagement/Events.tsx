// src/components/dashboardManagement/Events.tsx
import { useEffect, useState } from "react";
import api from "../../core/apiExample.js";
import { useAuth } from "../../core/AuthContext.js";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const Events = ({ userId }: { userId: number }) => {
  const { hasPermission } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasPermission("getAllEvents")) {
      api.get(`/events?userId=${userId}`)
        .then(res => setEvents(res.data))
        .catch(() => setError("Impossible de charger les événements"));
    }
  }, [userId, hasPermission]);

  return (
    <div>
      <h2 className="font-semibold mb-2">Mes événements</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {events.map(ev => (
          <li key={ev.id} className="py-2">
            <b>{ev.title}</b> — {new Date(ev.date).toLocaleDateString()}<br />
            <span className="text-sm">{ev.description}</span>
          </li>
        ))}
        {events.length === 0 && <li className="py-2 text-gray-400">Aucun événement</li>}
      </ul>
    </div>
  );
};
export default Events;
