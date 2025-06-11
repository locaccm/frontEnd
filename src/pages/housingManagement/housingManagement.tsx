import { useEffect, useState } from "react";
import LeaseForm from "../../components/housingManagement/LeaseForm.js";
import { useLeaseActions } from "../../hooks/housingManagement/useLeaseActions.js";

export interface Lease {
  LEAN_ID: number;
  LEAD_START: string;
  LEAD_END: string;
  LEAN_RENT: string;
  LEAN_CHARGES: string;
  LEAD_PAYMENT: string;
  LEAB_ACTIVE: boolean;
  USEN_ID: number;
  ACCN_ID: number;
}

const HousingManagement = () => {
  const { fetchLeases, deleteLease } = useLeaseActions();

  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLease, setEditingLease] = useState<Lease | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchLeases();
      if (data) setLeases(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleEdit = (lease: Lease) => {
    setEditingLease(lease);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const ok = await deleteLease(id);
    if (ok) {
      const refreshed = await fetchLeases();
      if (refreshed) setLeases(refreshed);
    }
  };

  const handleCloseForm = async () => {
    setShowForm(false);
    setEditingLease(null);
    const refreshed = await fetchLeases();
    if (refreshed) setLeases(refreshed);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestion des baux</h1>

      <button onClick={() => { setEditingLease(null); setShowForm(true); }}>
        Ajouter
      </button>

      {showForm && (
        <LeaseForm
          lease={editingLease}
          onClose={handleCloseForm}
        />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? <p>Chargement...</p> : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Loyer (€)</th>
              <th>Charges (€)</th>
              <th>Date paiement</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leases.map((lease) => (
              <tr key={lease.LEAN_ID}>
                <td>{lease.LEAN_ID}</td>
                <td>{lease.LEAD_START.split("T")[0]}</td>
                <td>{lease.LEAD_END.split("T")[0]}</td>
                <td>{lease.LEAN_RENT}</td>
                <td>{lease.LEAN_CHARGES}</td>
                <td>{lease.LEAD_PAYMENT.split("T")[0]}</td>
                <td>{lease.LEAB_ACTIVE ? "Oui" : "Non"}</td>
                <td>
                  <button onClick={() => handleEdit(lease)}>Modifier</button>
                  <button onClick={() => handleDelete(lease.LEAN_ID)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HousingManagement;
