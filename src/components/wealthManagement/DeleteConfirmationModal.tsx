import React from "react";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodationId: number;
  onSuccess?: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  accommodationId,
  onSuccess,
}) => {
  const { deleteAccommodation } = useAccommodationActions();

  const handleDelete = async () => {
    const success = await deleteAccommodation(accommodationId);
    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Confirmer la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer ce logement ?</p>
        <div style={styles.buttons}>
          <button onClick={handleDelete}>Oui, supprimer</button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
};

export default DeleteConfirmationModal;
