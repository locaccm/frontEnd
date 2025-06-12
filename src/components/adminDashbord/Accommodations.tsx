// src/components/Accommodations.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

interface Accommodation {
  ACCN_ID: number;
  ACCC_NAME: string;
  ACCC_TYPE: string;
  ACCC_ADDRESS: string;
  ACCC_DESC: string;
  ACCB_AVAILABLE: boolean;
  tenant?: {
    USEC_LNAME: string;
    USEC_FNAME: string;
  } | null;
  leases?: {
    user: {
      USEC_FNAME: string;
      USEC_LNAME: string;
    };
  }[];
}

const Accommodations: React.FC<{ userId: number }> = ({ userId }) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [newAccommodation, setNewAccommodation] = useState({
    ACCC_NAME: '', ACCC_TYPE: '', ACCC_ADDRESS: '', ACCC_DESC: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState({
    ACCC_NAME: '', ACCC_TYPE: '', ACCC_ADDRESS: '', ACCC_DESC: ''
  });

  const load = async () => {
    const res = await api.get(`/accommodations?userId=${userId}`);
    setAccommodations(res.data);
  };

  useEffect(() => { load(); }, [userId]);

  const handleDelete = async (id: number) => {
    await api.delete(`/accommodations/${id}`);
    load();
  };

  const handleEditToggle = (acc: Accommodation) => {
    setEditingId(acc.ACCN_ID);
    setEditedData({
      ACCC_NAME: acc.ACCC_NAME,
      ACCC_TYPE: acc.ACCC_TYPE,
      ACCC_ADDRESS: acc.ACCC_ADDRESS,
      ACCC_DESC: acc.ACCC_DESC
    });
  };

  const handleEditSave = async () => {
    if (editingId) {
      await api.put(`/accommodations/${editingId}`, {
        ACCC_NAME: editedData.ACCC_NAME,
        ACCC_TYPE: editedData.ACCC_TYPE,
        ACCC_ADDRESS: editedData.ACCC_ADDRESS,
        ACCC_DESC: editedData.ACCC_DESC
      });
      setEditingId(null);
      setEditedData({ ACCC_NAME: '', ACCC_TYPE: '', ACCC_ADDRESS: '', ACCC_DESC: '' });
      load();
    }
  };

  const handleCreate = async () => {
    if (!newAccommodation.ACCC_NAME || !newAccommodation.ACCC_TYPE || !newAccommodation.ACCC_ADDRESS || !newAccommodation.ACCC_DESC) return;
    await api.post('/accommodations', newAccommodation);
    setNewAccommodation({ ACCC_NAME: '', ACCC_TYPE: '', ACCC_ADDRESS: '', ACCC_DESC: '' });
    load();
  };

  return (
    <div className="accommodation-container">
      <h3 className="section-title">Logements 🏡</h3>
      <ul className="accommodation-list">
        {accommodations.map(acc => {
          const currentTenant = acc.leases?.[0]?.user || acc.tenant;
          return (
            <li key={acc.ACCN_ID} className="accommodation-item">
              {editingId === acc.ACCN_ID ? (
                <div className="accommodation-edit-form">
                  <input value={editedData.ACCC_NAME} onChange={(e) => setEditedData({ ...editedData, ACCC_NAME: e.target.value })} />
                  <input value={editedData.ACCC_TYPE} onChange={(e) => setEditedData({ ...editedData, ACCC_TYPE: e.target.value })} />
                  <input value={editedData.ACCC_ADDRESS} onChange={(e) => setEditedData({ ...editedData, ACCC_ADDRESS: e.target.value })} />
                  <input value={editedData.ACCC_DESC} onChange={(e) => setEditedData({ ...editedData, ACCC_DESC: e.target.value })} />
                  <button onClick={handleEditSave}>Sauvegarder</button>
                </div>
              ) : (
                <div className="accommodation-info">
                  <strong>{acc.ACCC_NAME}</strong> ({acc.ACCC_TYPE}) — {acc.ACCC_ADDRESS}<br />
                  <em>{acc.ACCC_DESC}</em><br />
                  {acc.ACCB_AVAILABLE ? (
  <span className="available">Disponible </span>
) : (
  <span className="not-available">
    Occupé par {currentTenant?.USEC_FNAME || '—'} {currentTenant?.USEC_LNAME || ''}
  </span>
)}

                </div>
              )}
              <div className="accommodation-actions">
                {editingId === acc.ACCN_ID ? null : (
                  <button onClick={() => handleEditToggle(acc)}>Modifier</button>
                )}
                <button onClick={() => handleDelete(acc.ACCN_ID)}>Supprimé</button>
              </div>
            </li>
          );
        })}
      </ul>

      <h4>Ajouter un logement</h4>
      <input
        type="text"
        placeholder="Nom"
        value={newAccommodation.ACCC_NAME}
        onChange={(e) => setNewAccommodation({ ...newAccommodation, ACCC_NAME: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type (Maison, Appartement...)"
        value={newAccommodation.ACCC_TYPE}
        onChange={(e) => setNewAccommodation({ ...newAccommodation, ACCC_TYPE: e.target.value })}
      />
      <input
        type="text"
        placeholder="Adresse"
        value={newAccommodation.ACCC_ADDRESS}
        onChange={(e) => setNewAccommodation({ ...newAccommodation, ACCC_ADDRESS: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newAccommodation.ACCC_DESC}
        onChange={(e) => setNewAccommodation({ ...newAccommodation, ACCC_DESC: e.target.value })}
      />
      <button onClick={handleCreate}>Créer</button>
    </div>
  );
};

export default Accommodations;