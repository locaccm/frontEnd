// src/components/dashboardManagement/Accommodations.tsx

import { useEffect, useState } from "react";
import api from "../../core/api/dashbordManagement/api.js";
import { useAuth } from "../../core/api/dashbordManagement/AuthContext.js";

// Accommodation type definition
type Accommodation = {
  ACCN_ID: number;
  ACCC_NAME: string;
  ACCC_TYPE: string;
  ACCC_ADDRESS: string;
  ACCC_DESC: string;
};

/**
 * Displays a list of accommodations (logements) for a given user.
 * - Fetches accommodations from the API if the user has the "getHouse" permission.
 * - Handles loading, error states, and renders the accommodation list.
 */
const Accommodations = ({ userId }: { userId: number }) => {
  // Get permission function from auth context
  const { hasPermission } = useAuth();
  // State for accommodations list and error message
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [error, setError] = useState("");

  // Fetch accommodations whenever userId or permission changes
  useEffect(() => {
    if (hasPermission("getHouse")) {
      api
        .get(`/accommodations?userId=${userId}`)
        .then((res) => setAccommodations(res.data))
        .catch(() => setError("Impossible de charger les logements"));
    }
  }, [userId, hasPermission]);

  return (
    <div>
      <h2 className="font-semibold mb-2">Mes logements</h2>
      {/* Display error if API call fails */}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {/* Render the list of accommodations */}
        {accommodations.map((acc) => (
          <li key={acc.ACCN_ID} className="py-2">
            <span className="font-bold">{acc.ACCC_NAME}</span>
            <span className="ml-2 text-gray-500">{acc.ACCC_TYPE}</span>
            <div className="text-sm">
              {acc.ACCC_ADDRESS} - {acc.ACCC_DESC}
            </div>
          </li>
        ))}
        {/* If empty, show placeholder */}
        {accommodations.length === 0 && (
          <li className="py-2 text-gray-400">Aucun logement</li>
        )}
      </ul>
    </div>
  );
};
export default Accommodations;
