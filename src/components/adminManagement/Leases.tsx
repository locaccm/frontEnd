import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';

// Lease interface: describes the shape of a lease/rental contract
interface Lease {
  LEAN_ID: number;
  LEAD_START: string;
  LEAD_END: string;
  LEAN_RENT: number;
  LEAN_CHARGES: number;
  LEAB_ACTIVE: boolean;
}

// Props: expects a userId to filter leases for a user
const Leases: React.FC<{ userId: number }> = ({ userId }) => {
  // State for the list of leases to display
  const [leases, setLeases] = useState<Lease[]>([]);

  // Loads the leases from the API for the given userId
  const load = async () => {
    const res = await api.get(`/leases?userId=${userId}`);
    setLeases(res.data);
  };

  // Loads leases every time userId changes (or at mount)
  useEffect(() => { load(); }, [userId]);

  // Handles deleting a lease, then reloads the list
  const handleDelete = async (id: number) => {
    await api.delete(`/leases/${id}`);
    load();
  };

  return (
    <div>
      <h3>Baux 📑</h3>
      <ul>
        {/* Render each lease with its info and delete button */}
        {leases.map(lease => (
          <li key={lease.LEAN_ID}>
            Du {new Date(lease.LEAD_START).toLocaleDateString()} au {new Date(lease.LEAD_END).toLocaleDateString()} - {lease.LEAN_RENT}€
            {/* Display status as "Actif" or "Inactif" */}
            {lease.LEAB_ACTIVE ? " 🟢 Actif" : " 🔴 Inactif"}
            {/* Delete button */}
            <button onClick={() => handleDelete(lease.LEAN_ID)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leases;
