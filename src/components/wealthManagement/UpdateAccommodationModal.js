import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AccommodationForm from "./AccommodationForm.js";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";
const UpdateAccommodationModal = ({ onClose, accommodationId, initialData, onSuccess }) => {
    const { updateAccommodation } = useAccommodationActions();
    const handleUpdate = async (data) => {
        const success = await updateAccommodation(accommodationId, data);
        if (success) {
            onSuccess?.();
            onClose();
        }
    };
    return (_jsxs("div", { style: modalStyle, children: [_jsx("h2", { children: "Modifier le logement" }), _jsx(AccommodationForm, { initialData: initialData, onSubmit: handleUpdate, onCancel: onClose })] }));
};
const modalStyle = {
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
