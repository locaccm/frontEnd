import React from "react";
import AccommodationForm from "./AccommodationForm.js";
import { AccommodationInput } from "../../types/wealthManagement/wealthManagement.js";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";

interface UpdateAccommodationModalProps {
  onClose: () => void;
  accommodationId: number;
  initialData: AccommodationInput;
  onSuccess?: () => void;
}

const UpdateAccommodationModal: React.FC<UpdateAccommodationModalProps> = ({
  onClose,
  accommodationId,
  initialData,
  onSuccess,
}) => {
  const { updateAccommodation } = useAccommodationActions();

  const handleUpdate = async (data: AccommodationInput) => {
    const success = await updateAccommodation(accommodationId, data);
    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  return (
    <div style={modalStyle}>
      <h2>Modifier le logement</h2>
      <AccommodationForm
        initialData={initialData}
        onSubmit={handleUpdate}
        onCancel={onClose}
      />
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

export default UpdateAccommodationModal;
