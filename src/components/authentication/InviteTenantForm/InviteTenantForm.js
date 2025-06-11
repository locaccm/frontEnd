import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./styles.module.css";
const InviteTenantForm = () => {
    const [data, setData] = useState({ USEC_MAIL: "", ADDRESS: "" });
    const handleChange = ({ currentTarget: input, }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const checkAllFieldsIsCompleted = () => {
        return Object.values(data).every((value) => value !== "");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkAllFieldsIsCompleted()) {
            alert("Il faut remplir tous les champs");
            return;
        }
        if (sessionStorage.getItem("userFirstName") == null ||
            sessionStorage.getItem("userLastName") == null) {
            window.location.href = "/signin";
            return;
        }
        const ownerName = sessionStorage.getItem("userFirstName") +
            " " +
            sessionStorage.getItem("userLastName");
        const dataToSend = {
            ...data,
            OWNER_NAME: ownerName,
        };
        fetch(`${import.meta.env.VITE_AUTH_URL}/auth/invitetenant`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then(async (response) => {
            if (response.ok && response.body !== null) {
                alert("Invitation réussie");
            }
            else {
                alert("Erreur lors de l'invitation");
            }
        })
            .catch((error) => {
            console.error("Error:", error);
            alert(error);
        });
    };
    return (_jsxs("form", { className: styles.form_container, onSubmit: handleSubmit, children: [_jsx("h1", { children: "Inviter un locataire" }), _jsx("input", { type: "email", placeholder: "Email du futur locataire", name: "USEC_MAIL", onChange: handleChange, value: data.USEC_MAIL, required: true, className: styles.input }), _jsx("input", { type: "text", placeholder: "Adresse", name: "ADDRESS", onChange: handleChange, value: data.ADDRESS, required: true, className: styles.input }), _jsx("button", { type: "submit", className: styles.green_btn, children: "Inviter" })] }));
};
export default InviteTenantForm;
