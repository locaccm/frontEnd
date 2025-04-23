import React from "react";
import { Input } from "../components/ui/input.js";
import { PropertyFormModalProps } from "../interfaces/property.interface.js";

/**
 * PropertyFormModal
 * 
 * This modal is used to either add or edit a property.
 * It provides form fields for the user to input property details
 * like title, address, rent, surface, and number of rooms.
 * The form will trigger onSubmit to save the data or onClose to cancel.
 */
export default function PropertyFormModal({ isEditing, formData, onChange, onClose, onSubmit }: PropertyFormModalProps) {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <div className="dialog-header">{isEditing ? "Modifier un bien" : "Ajouter un bien"}</div>
                <div>
                    <Input className="input-field" name="title" placeholder="Titre" value={formData.title} onChange={onChange} />
                    <Input className="input-field" name="address" placeholder="Adresse" value={formData.address} onChange={onChange} />
                    <Input className="input-field" name="rent" type="number" placeholder="Loyer" value={formData.rent} onChange={onChange} />
                    <Input className="input-field" name="surface" type="number" placeholder="Surface" value={formData.surface} onChange={onChange} />
                    <Input className="input-field" name="rooms" type="number" placeholder="Nombre de pièces" value={formData.rooms} onChange={onChange} />
                    <Input className="input-field" name="locataire" type="name" placeholder="Email" value={formData.locataire} onChange={onChange} />
                </div>
                <div className="dialog-footer">
                    <button className="button primary" onClick={onSubmit}>
                        {isEditing ? "Sauvegarder" : "Ajouter"}
                    </button>
                    <button className="button outline" onClick={onClose}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
