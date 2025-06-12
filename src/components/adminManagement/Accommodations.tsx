import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';

// Defines the structure of an accommodation
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

// Component expects a userId as a prop
const Accommodations: React.FC<{ userId: number }> = ({ userId }) => {
  // Holds the list of accommodations
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  // For new accommodation creation
  const [newAccommodation, setNewAccommodation] = useState({
    ACCC_NAME: '', ACCC_TYPE: '', ACCC_ADDRESS: '', ACCC_DESC: ''
  });
  // For editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState({
    ACCC_NAME: '', ACCC_TYPE: '', ACCC_ADDRESS: '', ACCC_DESC: ''
  });

  // Loads the accommodations from the API for the given user
  const load = async () => {
    const res = await api.get(`/accommodations?userId=${userId}`);
    setAccommodations(res.data);
  };

  // Whenever userId changes, reload the list
  useEffect(() => { load(); }, [userId]);

  // Deletes an accommodation by ID
  const handleDelete = async (id: number) => {
    await api.delete(`/accommodations/${id}`);
    load();
  };

  // Puts the selected accommodation into edit mode and pre-fills the fields
  const handleEditToggle = (acc: Accommodation) => {
    setEditingId(acc.ACCN_ID);
    setEditedData({
      ACCC_NAME: acc.ACCC_NAME,
      ACCC_TYPE: acc.ACCC_TYPE,
      ACCC_ADDRESS: acc.ACCC_ADDRESS,
      ACCC_DESC: acc.ACCC_DESC
    });
  };

  // Saves the modifications of the edited accommodation
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

  // Handles the creation of a new accommodation
  const handleCreate = async () => {
    // Prevent if any field is empty
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
          // Finds the current tenant, either from leases or directly
          const currentTenant = acc.leases?.[0]?.user || acc.tenant;
          return (
            <li key={acc.ACCN_ID} className="accommodation-item">
              {/* If in edit mode for this item, show input fields */}
              {editingId === acc.ACCN_ID ? (
                <div className="accommodation-edit-form">
                  <input value={editedData.ACCC_NAME} onChange={(e) => setEditedData({ ...editedData, ACCC_NAME: e.target.value })} />
                  <input value={editedData.ACCC_TYPE} onChange={(e) => setEditedData({ ...editedData, ACCC_TYPE: e.target.value })} />
                  <input value={editedData.ACCC_ADDRESS} onChange={(e) => setEditedData({ ...editedData, ACCC_ADDRESS: e.target.value })} />
                  <input value={editedData.ACCC_DESC} onChange={(e) => setEditedData({ ...editedData, ACCC_DESC: e.target.value })} />
                  <button onClick={handleEditSave}>Sauvegarder</button>
                </div>
              ) : (
                // Otherwise, just display info
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
              {/* Edit and Delete buttons */}
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

      {/* New accommodation creation form */}
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
