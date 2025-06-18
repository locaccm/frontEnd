import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accommodation } from "../../types/wealthManagement/wealthManagement.js";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";
import '../../assets/styles/styles.css';

interface AccommodationTableProps {
  onCreate: () => void;
  onEdit: (acc: Accommodation) => void;
  onDelete: (id: number) => void;
  onGenerate: (leaseId: number) => void;
}

const AccommodationTable: React.FC<AccommodationTableProps> = ({
  onCreate,
  onEdit,
  onDelete,
  onGenerate,
}) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const { fetchAccommodations } = useAccommodationActions();
  useNavigate();

  useEffect(() => {
    (async () => {
      const data = await fetchAccommodations();
      if (data) {
        setAccommodations(data);
      }
    })();
  }, [fetchAccommodations]);

  return (
    <div className="container">
      <h2>Mes Logements</h2>

      <button className="button button-primary" onClick={onCreate}>
        Ajouter un logement
      </button>

      <div className="table-responsive">
        <table className="table">
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
                  <button className="button" onClick={() => onEdit(acc)}>Modifier</button>
                  <button className="button button-secondary" onClick={() => onDelete(acc.ACCN_ID)}>Supprimer</button>
                  <button className="button button-accent" onClick={() => onGenerate(acc.ACCN_ID)}>Générer quittance</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccommodationTable;
