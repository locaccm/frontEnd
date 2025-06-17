import { useState, useEffect } from "react";
import { Lease } from "../../pages/housingManagement/housingManagement.js";
import { getUserProfileData } from "../../core/session/SessionsManager.js";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";
import { Accommodation } from "../../types/wealthManagement/wealthManagement.js";

interface LeaseFormProps {
  lease: Lease | null;
  onClose: () => void;
}

const LeaseForm = ({ lease, onClose }: LeaseFormProps) => {
  const [userName, setUserName] = useState("");
  const [, setHousingName] = useState("");
  const { fetchAccommodations } = useAccommodationActions();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  
  const [formData, setFormData] = useState<Lease>({
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
    const { firstName, lastName } = getUserProfileData();
    setUserName(`${firstName} ${lastName}`);

    const init = async () => {
      const data = await fetchAccommodations();
      if (data) {
        setAccommodations(data);
        const selected = data.find((acc) => acc.ACCN_ID === formData.ACCN_ID);
        setHousingName(selected?.ACCC_NAME || `Logement n°${formData.ACCN_ID}`);
      } // NOSONAR
    };

    init();

    if (lease) {
      setFormData({
        ...lease,
        LEAD_START: lease.LEAD_START?.split("T")[0] || "",
        LEAD_END: lease.LEAD_END?.split("T")[0] || "",
        LEAD_PAYMENT: lease.LEAD_PAYMENT?.split("T")[0] || "",
        LEAN_RENT: lease.LEAN_RENT.toString(),
        LEAN_CHARGES: lease.LEAN_CHARGES.toString(),
      });
    }
  }, [lease]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : ["LEAN_RENT", "LEAN_CHARGES", "USEN_ID", "ACCN_ID"].includes(name)
        ? Number(value)
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Aucun token d'authentification trouvé.");
      return;
    }

    const cleanData = {
      LEAD_START: formData.LEAD_START || null,
      LEAD_END: formData.LEAD_END || null,
      LEAN_RENT: Number(formData.LEAN_RENT),
      LEAN_CHARGES: Number(formData.LEAN_CHARGES),
      LEAD_PAYMENT: formData.LEAD_PAYMENT || null,
      LEAB_ACTIVE: formData.LEAB_ACTIVE,
      USEN_ID: formData.USEN_ID > 0 ? formData.USEN_ID : null,
      ACCN_ID: formData.ACCN_ID > 0 ? formData.ACCN_ID : null,
    };

    const method = lease?.LEAN_ID ? "PUT" : "POST";
    const url = lease?.LEAN_ID
      ? `${import.meta.env.VITE_HOUSING_URL}/lease/${lease.LEAN_ID}`
      : `${import.meta.env.VITE_HOUSING_URL}/lease`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(cleanData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Erreur ${res.status} : ${errorText || "serveur inaccessible"}` // NOSONAR
        ); 
      }

      onClose();
    } catch (err) {
      console.error("Échec de l'envoi du formulaire :", err);
    }
  };

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="dialog">
        <h2 className="dialog-header">
          {lease ? "Modifier un bail" : "Ajouter un nouveau bail"}
        </h2>
        <form onSubmit={handleSubmit} className="lease-form">
          <label>
            Date de début :
            <input
              type="date"
              name="LEAD_START"
              value={formData.LEAD_START}
              onChange={handleChange}
              className="input-field"
              required
            />
          </label>

          <label>
            Date de fin :
            <input
              type="date"
              name="LEAD_END"
              value={formData.LEAD_END}
              onChange={handleChange}
              className="input-field"
              required
            />
          </label>

          <label>
            Loyer (€) :
            <input
              type="number"
              step="0.01"
              name="LEAN_RENT"
              value={formData.LEAN_RENT}
              onChange={handleChange}
              className="input-field"
              required
            />
          </label>

          <label>
            Charges (€) :
            <input
              type="number"
              step="0.01"
              name="LEAN_CHARGES"
              value={formData.LEAN_CHARGES}
              onChange={handleChange}
              className="input-field"
              required
            />
          </label>

          <label>
            Date de paiement :
            <input
              type="date"
              name="LEAD_PAYMENT"
              value={formData.LEAD_PAYMENT}
              onChange={handleChange}
              className="input-field"
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="LEAB_ACTIVE"
              checked={formData.LEAB_ACTIVE}
              onChange={handleChange}
            />
            Actif
          </label>

          <label>
            Nom du locataire :
            <input
              type="number"
              name="USEN_ID"
              value={userName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </label>

          <label>
            Logement :
            <select
              name="ACCN_ID"
              value={formData.ACCN_ID}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">-- Sélectionner un logement --</option>
              {accommodations.map((acc) => (
                <option key={acc.ACCN_ID} value={acc.ACCN_ID}>
                  {acc.ACCC_NAME}
                </option>
              ))}
            </select>
          </label>

          <div className="dialog-footer">
            <button type="submit" className="submit-button">
              {lease ? "Enregistrer" : "Créer"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaseForm;