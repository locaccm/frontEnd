import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import LeaseForm from "../../components/housingManagement/LeaseForm.js";
import { useLeaseActions } from "../../hooks/housingManagement/useLeaseActions.js";
const HousingManagement = () => {
    const { fetchLeases, deleteLease } = useLeaseActions();
    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingLease, setEditingLease] = useState(null);
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchLeases();
            if (data)
                setLeases(data);
            setLoading(false);
        };
        load();
    }, []);
    const handleEdit = (lease) => {
        setEditingLease(lease);
        setShowForm(true);
    };
    const handleDelete = async (id) => {
        const ok = await deleteLease(id);
        if (ok) {
            const refreshed = await fetchLeases();
            if (refreshed)
                setLeases(refreshed);
        }
    };
    const handleCloseForm = async () => {
        setShowForm(false);
        setEditingLease(null);
        const refreshed = await fetchLeases();
        if (refreshed)
            setLeases(refreshed);
    };
    return (_jsxs("div", { style: { padding: "2rem" }, children: [_jsx("h1", { children: "Gestion des baux" }), _jsx("button", { onClick: () => { setEditingLease(null); setShowForm(true); }, children: "Ajouter" }), showForm && (_jsx(LeaseForm, { lease: editingLease, onClose: handleCloseForm })), error && _jsx("p", { style: { color: "red" }, children: error }), loading ? _jsx("p", { children: "Chargement..." }) : (_jsxs("table", { border: 1, cellPadding: 8, cellSpacing: 0, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Date d\u00E9but" }), _jsx("th", { children: "Date fin" }), _jsx("th", { children: "Loyer (\u20AC)" }), _jsx("th", { children: "Charges (\u20AC)" }), _jsx("th", { children: "Date paiement" }), _jsx("th", { children: "Actif" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: leases.map((lease) => (_jsxs("tr", { children: [_jsx("td", { children: lease.LEAN_ID }), _jsx("td", { children: lease.LEAD_START.split("T")[0] }), _jsx("td", { children: lease.LEAD_END.split("T")[0] }), _jsx("td", { children: lease.LEAN_RENT }), _jsx("td", { children: lease.LEAN_CHARGES }), _jsx("td", { children: lease.LEAD_PAYMENT.split("T")[0] }), _jsx("td", { children: lease.LEAB_ACTIVE ? "Oui" : "Non" }), _jsxs("td", { children: [_jsx("button", { onClick: () => handleEdit(lease), children: "Modifier" }), _jsx("button", { onClick: () => handleDelete(lease.LEAN_ID), children: "Supprimer" })] })] }, lease.LEAN_ID))) })] }))] }));
};
export default HousingManagement;
