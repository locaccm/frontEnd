import React, { useEffect, useState } from "react";
import { Accommodation } from "../../types/wealthManagement/wealthManagement.js";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";

interface AccommodationTableProps {
  onEdit: (acc: Accommodation) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

const AccommodationTable: React.FC<AccommodationTableProps> = ({ onEdit, onDelete, onCreate }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  const { fetchAccommodations } = useAccommodationActions();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAccommodations();
      if (data) setAccommodations(data);
    };

    loadData();
  }, [fetchAccommodations]);

  return (
    <div>
      <h2>Mes Logements</h2>
      <button onClick={onCreate}>Ajouter un logement</button>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Adresse</th>
            <th>Disponible</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((acc) => (
            <tr key={acc.ACCN_ID}>
              <td>{acc.ACCC_NAME}</td>
              <td>{acc.ACCC_TYPE}</td>
              <td>{acc.ACCC_ADDRESS}</td>
              <td>{acc.ACCB_AVAILABLE ? "Oui" : "Non"}</td>
              <td>{acc.ACCC_DESC}</td>
              <td>
                <button onClick={() => onEdit(acc)}>Modifier</button>
                <button onClick={() => onDelete(acc.ACCN_ID)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccommodationTable;