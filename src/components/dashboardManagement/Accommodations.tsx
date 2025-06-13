// src/components/dashboardManagement/Accommodations.tsx
import { useEffect, useState } from "react";
import api from "../../core/apiExample.js";
import { useAuth } from "../../core/AuthContext.js";

type Accommodation = {
  ACCN_ID: number;
  ACCC_NAME: string;
  ACCC_TYPE: string;
  ACCC_ADDRESS: string;
  ACCC_DESC: string;
};

const Accommodations = ({ userId }: { userId: number }) => {
  const { hasPermission } = useAuth();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasPermission("getHouse")) {
      api.get(`/accommodations?userId=${userId}`)
        .then(res => setAccommodations(res.data))
        .catch(() => setError("Impossible de charger les logements"));
    }
  }, [userId, hasPermission]);

  return (
    <div>
      <h2 className="font-semibold mb-2">Mes logements</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {accommodations.map(acc => (
          <li key={acc.ACCN_ID} className="py-2">
            <span className="font-bold">{acc.ACCC_NAME}</span>
            <span className="ml-2 text-gray-500">{acc.ACCC_TYPE}</span>
            <div className="text-sm">{acc.ACCC_ADDRESS} - {acc.ACCC_DESC}</div>
          </li>
        ))}
        {accommodations.length === 0 && <li className="py-2 text-gray-400">Aucun logement</li>}
      </ul>
    </div>
  );
};
export default Accommodations;
