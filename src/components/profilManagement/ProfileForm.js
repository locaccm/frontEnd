import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { setUserProfileData } from "../../core/session/SessionsManager.js";
const ProfileForm = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        address: "",
        birthDate: "",
        tel: "",
        photoUrl: "",
        bio: "",
    });
    //const userId = 1; In DEV MODE
    const userId = sessionStorage.getItem("userId");
    useEffect(() => {
        if (!userId)
            return;
        const token = sessionStorage.getItem("token");
        fetch(`${import.meta.env.VITE_PROFILE_URL}profiles/${userId}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
            .then((res) => res.json())
            .then((data) => {
            const formattedBirthDate = data.birthDate
                ? new Date(data.birthDate).toISOString().split("T")[0]
                : "";
            setProfile({
                ...data,
                birthDate: formattedBirthDate,
            });
        });
    }, [userId]);
    if (!userId) {
        return _jsx("div", { children: "Utilisateur non connect\u00E9" });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };
    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch(`${import.meta.env.VITE_BUCKET_UPLOAD_URL}/upload/images`, {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                throw new Error("Upload échoué");
            }
            const data = await res.json();
            setProfile((prev) => ({ ...prev, photoUrl: data.path }));
        }
        catch (err) {
            console.error(err);
            alert("Erreur lors de l'upload de l'image");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("Vous devez être connecté pour mettre à jour votre profil.");
            return;
        }
        const res = await fetch(`${import.meta.env.VITE_PROFILE_URL}profiles/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify(profile),
        });
        if (res.ok) {
            alert("Profil mis à jour !");
            setUserProfileData(profile);
        }
        else {
            alert("Erreur lors de la mise à jour");
        }
    };
    return (_jsxs("form", { className: styles.form_container, onSubmit: handleSubmit, children: [_jsx("h1", { children: "Mon Profil" }), _jsx("input", { type: "text", name: "firstName", placeholder: "Pr\u00E9nom", value: profile.firstName, onChange: handleChange, className: styles.input }), _jsx("input", { type: "text", name: "lastName", placeholder: "Nom", value: profile.lastName, onChange: handleChange, className: styles.input }), _jsx("input", { type: "date", name: "birthDate", value: profile.birthDate, onChange: handleChange, className: styles.input }), _jsx("input", { type: "text", name: "tel", placeholder: "T\u00E9l\u00E9phone", value: profile.tel, onChange: handleChange, className: styles.input }), _jsx("input", { type: "text", name: "address", placeholder: "Adresse", value: profile.address, onChange: handleChange, className: styles.input }), _jsx("textarea", { name: "bio", placeholder: "Bio", value: profile.bio, onChange: handleChange, className: styles.input }), _jsxs("div", { className: `${styles.image_upload}`, children: [profile.photoUrl && (_jsx("img", { src: `${import.meta.env.VITE_BUCKET_UPLOAD_URL}/files/${profile.photoUrl}`, alt: "Profile", className: styles.profile_image })), _jsx("input", { id: "profile-upload", type: "file", accept: "image/*", onChange: handlePhotoChange, "aria-label": "photo de profil" })] }), _jsx("button", { type: "submit", className: styles.green_btn, children: "Enregistrer" })] }));
};
export default ProfileForm;
