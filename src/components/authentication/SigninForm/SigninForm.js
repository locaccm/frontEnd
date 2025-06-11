import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./styles.module.css";
import { initUserProfileSession } from "../../../core/session/SessionsManager.js";
const SigninForm = () => {
    const [data, setData] = useState({ USEC_MAIL: "", USEC_PASSWORD: "" });
    const checkAllFieldsIsCompleted = () => {
        return Object.values(data).every((value) => value !== "");
    };
    const handleChange = ({ currentTarget: input, }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkAllFieldsIsCompleted()) {
            alert("Il faut remplir tous les champs");
            return;
        }
        fetch(`${import.meta.env.VITE_AUTH_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
            const body = await response.json();
            if (response.ok && response.body !== null) {
                alert("Connexion réussie");
                sessionStorage.setItem("token", body.token);
                sessionStorage.setItem("userId", body.user.USEN_ID.toString());
                //sessionStorage.setItem("userFirstName", body.user.USEC_FNAME);
                //sessionStorage.setItem("userLastName", body.user.USEC_LNAME);
                sessionStorage.setItem("userEmail", body.user.USEC_MAIL);
                //sessionStorage.setItem("userBirthDate", body.user.USED_BIRTH);
                await initUserProfileSession();
            }
            else {
                alert("Erreur lors de la connexion");
            }
        })
            .catch((error) => {
            console.error("Error:", error);
            alert(error);
        });
    };
    return (_jsxs("form", { className: styles.form_container, onSubmit: handleSubmit, children: [_jsx("h1", { children: "Connectez-vous" }), _jsx("input", { type: "email", placeholder: "Email", name: "USEC_MAIL", onChange: handleChange, value: data.USEC_MAIL, required: true, className: styles.input }), _jsx("input", { type: "password", placeholder: "Mot de passe", name: "USEC_PASSWORD", onChange: handleChange, value: data.USEC_PASSWORD, required: true, className: styles.input }), _jsx("button", { type: "submit", className: styles.green_btn, children: "Se Connecter" })] }));
};
export default SigninForm;
