import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { fetchDocuments } from "../../core/api/documentManagement/getDocument.js";
import { generateReceipt } from "../../core/api/documentManagement/postDocument.js";
const DocumentManagement = ({ leaseId, jwt, onClose }) => {
    const [showConfirm, setShowConfirm] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [documents, setDocuments] = useState([]);
    const loadDocuments = () => {
        fetchDocuments(jwt)
            .then((docs) => setDocuments(docs))
            .catch((err) => setError(err.message));
    };
    const handleConfirm = async () => {
        setShowConfirm(false);
        setIsGenerating(true);
        try {
            const { pdfUrl } = await generateReceipt(leaseId, jwt);
            window.open(pdfUrl, '_blank');
            loadDocuments();
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setIsGenerating(false);
        }
    };
    if (error) {
        return (_jsxs("div", { className: "document-management-page", children: [_jsxs("p", { className: "error", children: ["Erreur : ", error] }), _jsx("button", { onClick: onClose, children: "Retour" })] }));
    }
    return (_jsx("div", { className: "document-management-page", children: showConfirm ? (_jsxs("div", { className: "confirm-modal", children: [_jsxs("p", { children: ["Voulez-vous g\u00E9n\u00E9rer la quittance pour le bail n\u00B0", leaseId, " ?"] }), _jsx("button", { onClick: handleConfirm, children: "Confirmer" }), _jsx("button", { onClick: onClose, children: "Annuler" })] })) : (_jsxs(_Fragment, { children: [isGenerating && _jsx("p", { children: "G\u00E9n\u00E9ration en cours\u2026" }), _jsxs("section", { children: [_jsx("h3", { children: "Mes documents" }), _jsx("ul", { children: documents.map(doc => (_jsx("li", { children: _jsxs("a", { href: doc.url, target: "_blank", rel: "noopener noreferrer", children: [doc.name, " (", new Date(doc.created).toLocaleDateString(), ")"] }) }, doc.url))) }), _jsx("button", { onClick: onClose, children: "Retour" })] })] })) }));
};
export default DocumentManagement;
