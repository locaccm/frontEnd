import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./styles.module.css";
const SignupForm = () => {
    const [data, setData] = useState({
        USEC_FNAME: "",
        USEC_LNAME: "",
        USEC_MAIL: "",
        USEC_PASSWORD: "",
        USED_BIRTH: "",
    });
    const checkAllFieldsIsCompleted = () => {
        return Object.values(data).every((value) => value !== "");
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkAllFieldsIsCompleted()) {
            alert("Il faut remplir tous les champs");
            return;
        }
        const dataToSend = {
            ...data,
        };
        dataToSend.USED_BIRTH = new Date(dataToSend.USED_BIRTH).toISOString();
        fetch(`${import.meta.env.VITE_AUTH_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
            if (response.ok) {
                alert("Inscription réussie, veuillez vous connecter");
                window.location.href = "/signin";
            }
            else {
                alert("Erreur lors de l'inscription");
            }
        })
            .catch((error) => {
            console.error("Error:", error);
            alert(error);
        });
    };
    return (_jsxs("form", { className: styles.form_container, onSubmit: handleSubmit, children: [_jsx("h1", { children: "Cr\u00E9er un compte" }), _jsx("input", { type: "text", placeholder: "Pr\u00E9nom", name: "USEC_FNAME", onChange: handleChange, value: data.USEC_FNAME, required: true, className: styles.input }), _jsx("input", { type: "text", placeholder: "Nom", name: "USEC_LNAME", onChange: handleChange, value: data.USEC_LNAME, required: true, className: styles.input }), _jsx("input", { type: "date", placeholder: "Date de naissance", name: "USED_BIRTH", onChange: handleChange, value: data.USED_BIRTH, required: true, className: styles.input }), _jsx("input", { type: "email", placeholder: "Email", name: "USEC_MAIL", onChange: handleChange, value: data.USEC_MAIL, required: true, className: styles.input }), _jsx("input", { type: "password", placeholder: "Mot de passe", name: "USEC_PASSWORD", onChange: handleChange, value: data.USEC_PASSWORD, required: true, className: styles.input }), _jsx("button", { type: "submit", className: styles.green_btn, children: "S'inscrire" })] }));
};
export default SignupForm;
