import React, { useState } from "react";
import "../css/Profile.css";
import { FaUpload, FaFileAlt, FaTrash } from "react-icons/fa";

const Profile = () => {
    const [profile, setProfile] = useState({
        photo: "/img/profile.jpg",
        prenom: "John",
        nom: "Doe",
        email: "john.doe@example.com",
        adresse: "123 Main St, City, Country",
        datenaissance: "1990-01-01",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile({ ...profile, photo: reader.result });
        };
        reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile Management</h2>
            <div className="profile-picture">
                <img src={profile.photo} alt="Profile" />
                <label className="upload-label">
                    <FaUpload className="upload-icon" /> Importer un fichier image
                    <input type="file" onChange={handlePhotoChange} hidden />
                </label>
            </div>
            <div className="profile-details">
                <input type="text" name="Nom" value={profile.nom} onChange={handleChange} placeholder="Nom" />
                <input type="text" name="Prenom" value={profile.prenom} onChange={handleChange} placeholder="Prénom" />
                <input type="email" name="Email" value={profile.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="Adresse" value={profile.adresse} onChange={handleChange} placeholder="Adresse" />
                <input type="date" name="Date de naissance" value={profile.datenaissance} onChange={handleChange} />
            </div>
            <button type="submit" className="profile-btn">
                Enregistrer
            </button>
        </div>
    );
};

export default Profile;
