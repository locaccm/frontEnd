import { DeleteConfirmationModalProps } from "../interfaces/property.interface.js";

/**
 * DeleteConfirmationModal
 * 
 * This component displays a confirmation dialog before deleting a property.
 * It ensures that users don't delete items by mistake.
 */
export default function DeleteConfirmationModal({ title, onCancel, onConfirm }: DeleteConfirmationModalProps) {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <div className="dialog-header">Supprimer ce bien ?</div>
                <div className="dialog-content">
                    <p>Êtes-vous sûr de vouloir supprimer "{title}" ?</p>
                </div>
                <div className="dialog-footer">
                    <button className="button outline" onClick={onCancel}>
                        Annuler
                    </button>
                    <button className="button destructive" onClick={onConfirm}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}
