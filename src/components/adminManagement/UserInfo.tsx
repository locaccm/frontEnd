// UserInfo component: displays and edits details for a specific user.
import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';

// TypeScript interface for user details fetched from the API
interface UserDetail {
  USEC_LNAME: string;
  USEC_FNAME: string;
  USEC_TYPE: string;
  USEC_BIO: string;
  USED_BIRTH: string;
  USEC_TEL: string;
  USEC_ADDRESS: string;
  USEC_MAIL: string;
  USEC_PASSWORD: string;
}

// Props interface expects a userId (number)
interface Props {
  userId: number;
}

const UserInfo: React.FC<Props> = ({ userId }) => {
  // State to hold the user object
  const [user, setUser] = useState<UserDetail | null>(null);

  // Effect to fetch user data when component mounts or userId changes
  useEffect(() => {
    if (userId > 0) {
      // Fetch user details from the API
      api.get<UserDetail>(`/users/${userId}`).then((res) => {
        setUser(res.data);
      });
    }
  }, [userId]);

  // Handler for saving updates (PUT request)
  const handleSave = () => {
    api.put(`/users/${userId}`, user).then(() => alert('Utilisateur mis à jour !'));
  };

  // If user data is loaded, display the form, else show loading
  return user ? (
    <div>
      <h2>Informations de l'utilisateur</h2>
      
      {/* First Name Field */}
      <div>
        <label>Prénom :</label>
        <input
          type="text"
          value={user.USEC_FNAME}
          onChange={(e) => setUser({ ...user, USEC_FNAME: e.target.value })}
        />
      </div>

      {/* Last Name Field */}
      <div>
        <label>Nom :</label>
        <input
          type="text"
          value={user.USEC_LNAME}
          onChange={(e) => setUser({ ...user, USEC_LNAME: e.target.value })}
        />
      </div>

      {/* User Type (readonly) */}
      <div>
        <label>Type :</label>
        <input
          type="text"
          value={user.USEC_TYPE}
          disabled
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label>Date de naissance :</label>
        <input
          type="date"
          value={user.USED_BIRTH.split('T')[0]}
          onChange={(e) => setUser({ ...user, USED_BIRTH: e.target.value })}
        />
      </div>

      {/* Phone Number */}
      <div>
        <label>Téléphone :</label>
        <input
          type="text"
          value={user.USEC_TEL}
          onChange={(e) => setUser({ ...user, USEC_TEL: e.target.value })}
        />
      </div>

      {/* Address */}
      <div>
        <label>Adresse :</label>
        <input
          type="text"
          value={user.USEC_ADDRESS}
          onChange={(e) => setUser({ ...user, USEC_ADDRESS: e.target.value })}
        />
      </div>

      {/* Email (readonly) */}
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={user.USEC_MAIL}
          disabled
        />
      </div>

      {/* Bio/Description */}
      <div>
        <label>Biographie :</label>
        <textarea
          value={user.USEC_BIO}
          onChange={(e) => setUser({ ...user, USEC_BIO: e.target.value })}
        />
      </div>

      {/* Save Button */}
      <button onClick={handleSave}>Enregistrer</button>
    </div>
  ) : (
    // Loading state while fetching user data
    <p>Chargement...</p>
  );
};

export default UserInfo;
