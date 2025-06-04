import React from "react";
import AccommodationForm from "./AccommodationForm.js";
import { AccommodationInput } from "../../types/wealthManagement/wealthManagement.js";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";

interface CreateAccommodationModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateAccommodationModal: React.FC<CreateAccommodationModalProps> = ({ onClose, onSuccess }) => {
  const { createAccommodation, loading, error } = useAccommodationActions();

  const handleCreate = async (data: AccommodationInput) => {
    const success = await createAccommodation(data);
    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  return (
    <div style={modalStyle}>
      <h2>Créer un logement</h2>
      <AccommodationForm onSubmit={handleCreate} onCancel={onClose} />
    </div>
  );
};

const modalStyle: React.CSSProperties = {
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "white",
  padding: "2rem",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  zIndex: 1000,
};

export default CreateAccommodationModal;
