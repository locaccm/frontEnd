import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccommodationActions } from "../../hooks/wealthManagement/useAccommodationActions.js";
const AccommodationTable = ({ onCreate, onEdit, onDelete, onGenerate, }) => {
    const [accommodations, setAccommodations] = useState([]);
    const { fetchAccommodations } = useAccommodationActions();
    useNavigate();
    useEffect(() => {
        (async () => {
            const data = await fetchAccommodations();
            if (data) {
                setAccommodations(data);
            }
        })();
    }, [fetchAccommodations]);
    return (_jsxs("div", { children: [_jsx("h2", { children: "Mes Logements" }), _jsx("button", { onClick: onCreate, children: "Ajouter un logement" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Nom" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Adresse" }), _jsx("th", { children: "Disponible" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: accommodations.map((acc) => (_jsxs("tr", { children: [_jsx("td", { children: acc.ACCC_NAME }), _jsx("td", { children: acc.ACCC_TYPE }), _jsx("td", { children: acc.ACCC_ADDRESS }), _jsx("td", { children: acc.ACCB_AVAILABLE ? "Oui" : "Non" }), _jsx("td", { children: acc.ACCC_DESC }), _jsxs("td", { children: [_jsx("button", { onClick: () => onEdit(acc), children: "Modifier" }), _jsx("button", { onClick: () => onDelete(acc.ACCN_ID), children: "Supprimer" }), _jsx("button", { onClick: () => onGenerate(acc.ACCN_ID), children: "G\u00E9n\u00E9rer quittance" })] })] }, acc.ACCN_ID))) })] })] }));
};
export default AccommodationTable;
