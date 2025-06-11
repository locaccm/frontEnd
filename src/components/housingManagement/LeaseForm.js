import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLeaseActions } from "../../hooks/housingManagement/useLeaseActions.js";
const LeaseForm = ({ lease, onClose }) => {
    const { createLease, updateLease } = useLeaseActions();
    const [formData, setFormData] = useState({
        LEAN_ID: 0,
        LEAD_START: "",
        LEAD_END: "",
        LEAN_RENT: "0",
        LEAN_CHARGES: "0",
        LEAD_PAYMENT: "",
        LEAB_ACTIVE: true,
        USEN_ID: 1,
        ACCN_ID: 1,
    });
    useEffect(() => {
        if (lease) {
            setFormData({
                ...lease,
                LEAD_START: lease.LEAD_START ? lease.LEAD_START.split("T")[0] : "",
                LEAD_END: lease.LEAD_END ? lease.LEAD_END.split("T")[0] : "",
                LEAD_PAYMENT: lease.LEAD_PAYMENT ? lease.LEAD_PAYMENT.split("T")[0] : "",
                LEAN_RENT: lease.LEAN_RENT.toString(),
                LEAN_CHARGES: lease.LEAN_CHARGES.toString(),
            });
        }
    }, [lease]);
    const handleChange = (e) => {
        const target = e.target;
        const { name, value, type } = target;
        const newValue = type === "checkbox" ? target.checked
            : value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cleanData = {
                LEAD_START: formData.LEAD_START ?? "",
                LEAD_END: formData.LEAD_END ?? "",
                LEAN_RENT: Number(formData.LEAN_RENT),
                LEAN_CHARGES: Number(formData.LEAN_CHARGES),
                LEAD_PAYMENT: formData.LEAD_PAYMENT ?? "",
                LEAB_ACTIVE: formData.LEAB_ACTIVE,
                ACCN_ID: formData.ACCN_ID ?? 0,
            };
            const success = lease
                ? await updateLease(lease.LEAN_ID, { ...cleanData, USEN_ID: formData.USEN_ID ?? 0 })
                : await createLease(cleanData);
            if (success)
                onClose();
        }
        catch (error) {
            console.error(error);
        }
    };
    return (_jsxs("form", { "aria-label": "lease form", onSubmit: handleSubmit, style: { marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }, children: [_jsxs("p", { children: ["Votre ID utilisateur est : ", sessionStorage.getItem("userId")] }), _jsx("h2", { children: lease ? "Modifier un bail" : "Ajouter un nouveau bail" }), _jsxs("label", { children: ["Date de d\u00E9but :", _jsx("input", { type: "date", name: "LEAD_START", value: formData.LEAD_START, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsxs("label", { children: ["Date de fin :", _jsx("input", { type: "date", name: "LEAD_END", value: formData.LEAD_END, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsxs("label", { children: ["Loyer (\u20AC) :", _jsx("input", { type: "number", step: "0.01", name: "LEAN_RENT", value: formData.LEAN_RENT, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsxs("label", { children: ["Charges (\u20AC) :", _jsx("input", { type: "number", step: "0.01", name: "LEAN_CHARGES", value: formData.LEAN_CHARGES, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsxs("label", { children: ["Date de paiement :", _jsx("input", { type: "date", name: "LEAD_PAYMENT", value: formData.LEAD_PAYMENT, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsxs("label", { children: ["Actif :", _jsx("input", { type: "checkbox", name: "LEAB_ACTIVE", checked: formData.LEAB_ACTIVE, onChange: handleChange })] }), _jsx("br", {}), _jsxs("label", { children: ["ID Utilisateur :", _jsx("input", { type: "number", name: "USEN_ID", value: formData.USEN_ID, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsxs("label", { children: ["ID Logement :", _jsx("input", { type: "number", name: "ACCN_ID", value: formData.ACCN_ID, onChange: handleChange, required: true })] }), _jsx("br", {}), _jsx("button", { type: "submit", children: lease ? "Enregistrer les modifications" : "Créer" }), _jsx("button", { type: "button", onClick: onClose, style: { marginLeft: "1rem" }, children: "Annuler" })] }));
};
export default LeaseForm;
