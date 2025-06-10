import { useState, useEffect } from "react";
import { Lease } from "../../pages/housingManagement/housingManagement.js";
import { useLeaseActions } from "../../hooks/housingManagement/useLeaseActions.js";
import { LeaseFormData } from "../../types/housingManagement/housingManagement.js";

interface LeaseFormProps {
  lease: Lease | null;
  onClose: () => void;
}

const LeaseForm = ({ lease, onClose }: LeaseFormProps) => {
  const { createLease, updateLease } = useLeaseActions();

  const [formData, setFormData] = useState<LeaseFormData>({
    LEAN_ID: 0,
    LEAD_START: "",
    LEAD_END: "",
    LEAN_RENT: "0",
    LEAN_CHARGES: "0",
    LEAD_PAYMENT: "",
    LEAB_ACTIVE: true,
    USEN_ID: 1,
    ACCN_ID: 1,
  });

  useEffect(() => {
    if (lease) {
      setFormData({
        ...lease,
        LEAD_START: lease.LEAD_START ? lease.LEAD_START.split("T")[0] : "",
        LEAD_END: lease.LEAD_END ? lease.LEAD_END.split("T")[0] : "",
        LEAD_PAYMENT: lease.LEAD_PAYMENT ? lease.LEAD_PAYMENT.split("T")[0] : "",
        LEAN_RENT: lease.LEAN_RENT.toString(),
        LEAN_CHARGES: lease.LEAN_CHARGES.toString(),
      });
    }
  }, [lease]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const newValue =
      type === "checkbox" ? target.checked
      : name === "LEAN_RENT" || name === "LEAN_CHARGES" || name === "USEN_ID" || name === "ACCN_ID"
      ? value
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanData = {
        LEAD_START: formData.LEAD_START ?? "",
        LEAD_END: formData.LEAD_END ?? "",
        LEAN_RENT: Number(formData.LEAN_RENT),
        LEAN_CHARGES: Number(formData.LEAN_CHARGES),
        LEAD_PAYMENT: formData.LEAD_PAYMENT ?? "",
        LEAB_ACTIVE: formData.LEAB_ACTIVE,
        ACCN_ID: formData.ACCN_ID ?? 0,
      };

      const success = lease
        ? await updateLease(lease.LEAN_ID, { ...cleanData, USEN_ID: formData.USEN_ID ?? 0 })
        : await createLease(cleanData);
      if (success) onClose();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form aria-label="lease form" onSubmit={handleSubmit} style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
      <p>Votre ID utilisateur est : {sessionStorage.getItem("userId")}</p>

      <h2>{lease ? "Modifier un bail" : "Ajouter un nouveau bail"}</h2>

      <label>
        Date de début :
        <input type="date" name="LEAD_START" value={formData.LEAD_START} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Date de fin :
        <input type="date" name="LEAD_END" value={formData.LEAD_END} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Loyer (€) :
        <input type="number" step="0.01" name="LEAN_RENT" value={formData.LEAN_RENT} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Charges (€) :
        <input type="number" step="0.01" name="LEAN_CHARGES" value={formData.LEAN_CHARGES} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Date de paiement :
        <input type="date" name="LEAD_PAYMENT" value={formData.LEAD_PAYMENT} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Actif :
        <input type="checkbox" name="LEAB_ACTIVE" checked={formData.LEAB_ACTIVE} onChange={handleChange} />
      </label>
      <br />

      <label>
        ID Utilisateur :
        <input type="number" name="USEN_ID" value={formData.USEN_ID} onChange={handleChange} required />
      </label>
      <br />

      <label>
        ID Logement :
        <input type="number" name="ACCN_ID" value={formData.ACCN_ID} onChange={handleChange} required />
      </label>
      <br />

      <button type="submit">{lease ? "Enregistrer les modifications" : "Créer"}</button>
      <button type="button" onClick={onClose} style={{ marginLeft: "1rem" }}>
        Annuler
      </button>
    </form>
  );
};

export default LeaseForm;
