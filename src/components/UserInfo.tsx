// src/components/UserInfo.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

interface UserDetail {
  USEC_LNAME: string;
  USEC_FNAME: string;
  USEC_ADDRESS: string;
  USEC_TEL: string;
  USEC_BIO: string;
}

interface Props {
  userId: number;
}

const UserInfo: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    api.get<UserDetail>(`/users/${userId}`).then((res) => setUser(res.data));
  }, [userId]);
  

  const handleSave = () => {
    api.put(`/users/${userId}`, user).then(() => alert('Utilisateur mis à jour !'));
  };

  return user ? (
    <div>
      <input
        type="text"
        value={user.USEC_FNAME}
        onChange={(e) => setUser({ ...user, USEC_FNAME: e.target.value })}
      />
      <input
        type="text"
        value={user.USEC_LNAME}
        onChange={(e) => setUser({ ...user, USEC_LNAME: e.target.value })}
      />
      <button onClick={handleSave}>Enregistrer</button>
    </div>
  ) : (
    <p>Chargement...</p>
  );
};

export default UserInfo;
