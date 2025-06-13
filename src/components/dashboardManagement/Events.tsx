// src/components/dashboardManagement/Events.tsx

import { useEffect, useState } from "react";
import api from "../../core/api/dashbordManagement/api.js";
import { useAuth } from "../../core/api/dashbordManagement/AuthContext.js";

// Event type definition
type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

/**
 * Displays a list of events for a specific user.
 * - Fetches data from the API if the user has the "getAllEvents" permission.
 * - Shows a loading state, errors, and formatted event list.
 */
const Events = ({ userId }: { userId: number }) => {
  // Permission/context hook
  const { hasPermission } = useAuth();
  // State for events and error
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");

  // Fetch events when userId or permissions change
  useEffect(() => {
    if (hasPermission("getAllEvents")) {
      api
        .get(`/events?userId=${userId}`)
        .then((res) => setEvents(res.data))
        .catch(() => setError("Impossible de charger les événements"));
    }
  }, [userId, hasPermission]);

  return (
    <div>
      <h2 className="font-semibold mb-2">Mes événements</h2>
      {/* Show error if API call fails */}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {/* Render events */}
        {events.map((ev) => (
          <li key={ev.id} className="py-2">
            <b>{ev.title}</b> — {new Date(ev.date).toLocaleDateString()}
            <br />
            <span className="text-sm">{ev.description}</span>
          </li>
        ))}
        {/* If no events, show a placeholder */}
        {events.length === 0 && (
          <li className="py-2 text-gray-400">Aucun événement</li>
        )}
      </ul>
    </div>
  );
};
export default Events;
