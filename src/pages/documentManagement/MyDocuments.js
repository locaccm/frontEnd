import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import { fetchDocuments } from "../../core/api/documentManagement/getDocument.js";
import { deleteDocument } from "../../core/api/documentManagement/deleteDocument.js";
const MyDocuments = ({ jwt }) => {
    const [docs, setDocs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const loadDocs = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchDocuments(jwt);
            setDocs(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors du chargement");
        }
    }, [jwt]);
    useEffect(() => {
        loadDocs();
    }, [loadDocs]);
    const handleDelete = async (filename) => {
        if (!window.confirm(`Confirmez-vous la suppression de ${filename} ?`)) {
            return;
        }
        try {
            setLoading(true);
            await deleteDocument(filename, jwt);
            await loadDocs();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        }
        finally {
            setLoading(false);
        }
    };
    if (error) {
        return _jsxs("div", { className: "error", children: ["Erreur : ", error] });
    }
    return (_jsxs("section", { className: "my-documents", children: [_jsx("h3", { children: "Mes documents" }), loading && _jsx("p", { children: "Suppression en cours\u2026" }), _jsx("ul", { children: docs.map((doc) => (_jsxs("li", { className: "document-item", children: [_jsxs("a", { href: doc.url, target: "_blank", rel: "noopener noreferrer", children: [doc.name, " (", new Date(doc.created).toLocaleDateString(), ")"] }), " — ", _jsx("button", { className: "btn-delete", onClick: () => handleDelete(doc.name), disabled: loading, children: "Supprimer" })] }, doc.name))) })] }));
};
export default MyDocuments;
