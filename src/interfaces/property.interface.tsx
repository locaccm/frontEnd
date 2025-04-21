// Represents the structure of a full property object stored in the system
export type Property = {
    id: number;
    title: string;
    address: string;
    rent: number;
    surface: number;
    rooms: number;
};

// Represents the structure of the form data used to create or edit a property
export type PropertyFormData = {
    title: string;
    address: string;
    rent: string;
    surface: string;
    rooms: string;
};

export type HousingTableProps = {
    properties: Property[];
    onEdit: (property: Property) => void;
    onDelete: (property: Property) => void;
};

export type PropertyFormModalProps = {
    isEditing: boolean;
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
    onSubmit: () => void;
};

export type DeleteConfirmationModalProps = {
    title: string;
    onCancel: () => void;
    onConfirm: () => void;
};

