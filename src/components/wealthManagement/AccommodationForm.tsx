import React, { useState, useEffect } from "react";
import { AccommodationInput } from "../../types/wealthManagement/wealthManagement.js";

interface AccommodationFormProps {
  initialData?: Partial<AccommodationInput>;
  onSubmit: (data: AccommodationInput) => void;
  onCancel: () => void;
}

const AccommodationForm: React.FC<AccommodationFormProps> = ({
  initialData = {
    ACCC_NAME: "",
    ACCC_TYPE: "",
    ACCC_ADDRESS: "",
    ACCC_DESC: "",
    ACCB_AVAILABLE: true,
  },
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<AccommodationInput>(initialData as AccommodationInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked! : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <input name="ACCC_NAME" value={form.ACCC_NAME} onChange={handleChange} placeholder="Nom" required />
      <input name="ACCC_TYPE" value={form.ACCC_TYPE} onChange={handleChange} placeholder="Type" required />
      <input name="ACCC_ADDRESS" value={form.ACCC_ADDRESS} onChange={handleChange} placeholder="Adresse" required />
      <textarea name="ACCC_DESC" value={form.ACCC_DESC} onChange={handleChange} placeholder="Description" />
      <label>
        Disponible :
        <input type="checkbox" name="ACCB_AVAILABLE" checked={form.ACCB_AVAILABLE} onChange={handleChange} />
      </label>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
        <button type="submit">Valider</button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
};

export default AccommodationForm;
