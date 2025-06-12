// src/components/UserInfo.tsx
import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';

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
  
interface Props {
  userId: number;
}

const UserInfo: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (userId > 0) {
      api.get<UserDetail>(`/users/${userId}`).then((res) => {
        setUser(res.data);
      });
    }
  }, [userId]);

  const handleSave = () => {
    api.put(`/users/${userId}`, user).then(() => alert('Utilisateur mis à jour !'));
  };

  return user ? (
    <div>
  <h2>Informations de l'utilisateur</h2>
  <div>
    <label>Prénom :</label>
    <input
      type="text"
      value={user.USEC_FNAME}
      onChange={(e) => setUser({ ...user, USEC_FNAME: e.target.value })}
    />
  </div>

  <div>
    <label>Nom :</label>
    <input
      type="text"
      value={user.USEC_LNAME}
      onChange={(e) => setUser({ ...user, USEC_LNAME: e.target.value })}
    />
  </div>

  <div>
    <label>Type :</label>
    <input
      type="text"
      value={user.USEC_TYPE}
      disabled
    />
  </div>

  <div>
    <label>Date de naissance :</label>
    <input
      type="date"
      value={user.USED_BIRTH.split('T')[0]}
      onChange={(e) => setUser({ ...user, USED_BIRTH: e.target.value })}
    />
  </div>

  <div>
    <label>Téléphone :</label>
    <input
      type="text"
      value={user.USEC_TEL}
      onChange={(e) => setUser({ ...user, USEC_TEL: e.target.value })}
    />
  </div>

  <div>
    <label>Adresse :</label>
    <input
      type="text"
      value={user.USEC_ADDRESS}
      onChange={(e) => setUser({ ...user, USEC_ADDRESS: e.target.value })}
    />
  </div>

  <div>
    <label>Email :</label>
    <input
      type="email"
      value={user.USEC_MAIL}
      disabled
    />
  </div>

  <div>
    <label>Biographie :</label>
    <textarea
      value={user.USEC_BIO}
      onChange={(e) => setUser({ ...user, USEC_BIO: e.target.value })}
    />
  </div>

  <button onClick={handleSave}>Enregistrer</button>
</div>

  ) : (
    <p>Chargement...</p>
  );
};

export default UserInfo;
