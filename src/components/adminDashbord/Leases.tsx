import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

interface Lease {
  LEAN_ID: number;
  LEAD_START: string;
  LEAD_END: string;
  LEAN_RENT: number;
  LEAN_CHARGES: number;
  LEAB_ACTIVE: boolean;
}

const Leases: React.FC<{ userId: number }> = ({ userId }) => {
  const [leases, setLeases] = useState<Lease[]>([]);

  const load = async () => {
    const res = await api.get(`/leases?userId=${userId}`);
    setLeases(res.data);
  };

  useEffect(() => { load(); }, [userId]);

  const handleDelete = async (id: number) => {
    await api.delete(`/leases/${id}`);
    load();
  };

  return (
    <div>
      <h3>Baux 📑</h3>
      <ul>
        {leases.map(lease => (
          <li key={lease.LEAN_ID}>
            Du {new Date(lease.LEAD_START).toLocaleDateString()} au {new Date(lease.LEAD_END).toLocaleDateString()} - {lease.LEAN_RENT}€
            {lease.LEAB_ACTIVE ? " 🟢 Actif" : " 🔴 Inactif"}
            <button onClick={() => handleDelete(lease.LEAN_ID)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leases;
