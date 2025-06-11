import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const AccommodationForm = ({ initialData = {
    ACCC_NAME: "",
    ACCC_TYPE: "",
    ACCC_ADDRESS: "",
    ACCC_DESC: "",
    ACCB_AVAILABLE: true,
}, onSubmit, onCancel, }) => {
    const [form, setForm] = useState(initialData);
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? e.target.checked : undefined;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "0.75rem" }, children: [_jsx("input", { name: "ACCC_NAME", value: form.ACCC_NAME, onChange: handleChange, placeholder: "Nom", required: true }), _jsx("input", { name: "ACCC_TYPE", value: form.ACCC_TYPE, onChange: handleChange, placeholder: "Type", required: true }), _jsx("input", { name: "ACCC_ADDRESS", value: form.ACCC_ADDRESS, onChange: handleChange, placeholder: "Adresse", required: true }), _jsx("textarea", { name: "ACCC_DESC", value: form.ACCC_DESC, onChange: handleChange, placeholder: "Description" }), _jsxs("label", { children: ["Disponible :", _jsx("input", { type: "checkbox", name: "ACCB_AVAILABLE", checked: form.ACCB_AVAILABLE, onChange: handleChange })] }), _jsxs("div", { style: { display: "flex", justifyContent: "flex-end", gap: "0.5rem" }, children: [_jsx("button", { type: "submit", children: "Valider" }), _jsx("button", { type: "button", onClick: onCancel, children: "Annuler" })] })] }));
};
export default AccommodationForm;
