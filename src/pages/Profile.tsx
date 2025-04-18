import React, { useState } from "react";
import "../styles/Profile.css";
import { FaUpload } from "react-icons/fa";
import { UserProfile } from "../interfaces/UserProfile.js";
import { defaultProfile } from "../data/defaultProfile.js";

const Profile: React.FC = () => {
  // Initialize profile state with default values
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  // Handle changes in the input fields for profile information
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle the change of the profile picture
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Check if the uploaded file is a valid image type (JPG, PNG, GIF, SVG)
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
      if (validImageTypes.includes(file.type)) {
        // If valid, read the file and set the profile picture
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile({ ...profile, photo: reader.result });
        };
        reader.readAsDataURL(file); // Convert image to Data URL
      } else {
        // Alert the user if the uploaded file is not a valid image
        alert("Please upload a valid image file (JPG, PNG, GIF, SVG).");
      }
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Management</h2>

      {/* Profile Picture Upload Section */}
      <div className="profile-picture">
        {/* Display the current profile picture */}
        <img src={profile.photo?.toString()} alt="Profile" />
        
        {/* Label for file input that triggers the upload */}
        <label className="upload-label">
          <FaUpload className="upload-icon" /> Upload a profile picture (JPG, PNG, GIF, SVG)
          {/* Accept only image files */}
          <input
            type="file"
            accept="image/*"  // This restricts the input to only image files
            onChange={handlePhotoChange}
            hidden
          />
        </label>
      </div>

      {/* Profile Details Section */}
      <div className="profile-details">
        <input type="text" name="nom" value={profile.nom} onChange={handleChange} placeholder="Last Name" />
        <input type="text" name="prenom" value={profile.prenom} onChange={handleChange} placeholder="First Name" />
        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="adresse" value={profile.adresse} onChange={handleChange} placeholder="Address" />
        <input type="date" name="datenaissance" value={profile.datenaissance} onChange={handleChange} />
      </div>

      {/* Save button to submit the profile changes */}
      <button type="submit" className="profile-btn">
        Save
      </button>
    </div>
  );
};

export default Profile;
