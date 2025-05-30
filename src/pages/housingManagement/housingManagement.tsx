import { useEffect, useState } from "react";
import LeaseForm from "../../components/housingManagement/LeaseForm.js";

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
    const [leases, setLeases] = useState<Lease[]>([]);
    const [editingLease, setEditingLease] = useState<Lease | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLeases = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_HOUSING_URL}/lease`);
            if (!res.ok) throw new Error("Erreur lors du chargement des baux");
            const data = await res.json();
            setLeases(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Une erreur inconnue est survenue");
            }
        }
    };

    useEffect(() => {
        fetchLeases();
    }, []);

    const handleEdit = (lease: Lease) => {
        setEditingLease(lease);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        try {
        await fetch(`${import.meta.env.VITE_HOUSING_URL}/lease/${id}`, {
            method: "DELETE",
        });
        fetchLeases(); 
        } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        }
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
            onClose={() => {
            setShowForm(false);
            setEditingLease(null);
            fetchLeases(); 
            }}
        />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

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
        </div>
    );
};

export default HousingManagement;
