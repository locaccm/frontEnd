import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";
const DeleteConfirmationModal = ({ isOpen, onClose, accommodationId, onSuccess, }) => {
    const { deleteAccommodation } = useAccommodationActions();
    const handleDelete = async () => {
        const success = await deleteAccommodation(accommodationId);
        if (success) {
            onSuccess?.();
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { style: styles.overlay, children: _jsxs("div", { style: styles.modal, children: [_jsx("h3", { children: "Confirmer la suppression" }), _jsx("p", { children: "\u00CAtes-vous s\u00FBr de vouloir supprimer ce logement ?" }), _jsxs("div", { style: styles.buttons, children: [_jsx("button", { onClick: handleDelete, children: "Oui, supprimer" }), _jsx("button", { onClick: onClose, children: "Annuler" })] })] }) }));
};
const styles = {
    overlay: {
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
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
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px"
    }
};
export default DeleteConfirmationModal;
