import React, { useState } from "react";
import "../css/Profile.css";
import { FaUpload } from "react-icons/fa";

const Profile = () => {
    // State to store user profile information
    const [profile, setProfile] = useState({
        photo: "/img/profile.jpg", // Default profile picture
        prenom: "John",
        nom: "Doe",
        email: "john.doe@example.com",
        adresse: "123 Main St, City, Country",
        datenaissance: "1990-01-01",
    });

    // Handles text input changes and updates profile state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Handles profile picture change
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
            {/* Profile management title */}
            <h2>Profile Management</h2>

            {/* Profile picture upload section */}
            <div className="profile-picture">
                <img src={profile.photo} alt="Profile" />
                <label className="upload-label">
                    <FaUpload className="upload-icon" /> Upload a profile picture
                    <input type="file" onChange={handlePhotoChange} hidden />
                </label>
            </div>

            {/* Profile details input fields */}
            <div className="profile-details">
                <input type="text" name="nom" value={profile.nom} onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="prenom" value={profile.prenom} onChange={handleChange} placeholder="First Name" />
                <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
                <input type="text" name="adresse" value={profile.adresse} onChange={handleChange} placeholder="Address" />
                <input type="date" name="datenaissance" value={profile.datenaissance} onChange={handleChange} />
            </div>

            {/* Save button */}
            <button type="submit" className="profile-btn">
                Save
            </button>
        </div>
    );
};

export default Profile;
