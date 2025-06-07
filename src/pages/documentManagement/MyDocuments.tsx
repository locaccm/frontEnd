// src/pages/documentManagement/MyDocuments.tsx
import React, { useEffect, useState } from "react";
import {DocumentInfo, fetchDocuments} from "../../core/api/documentManagement/getDocument.js";
import {deleteDocument} from "../../core/api/documentManagement/deleteDocument.js";

interface MyDocumentsProps {
    jwt: string;
}

const MyDocuments: React.FC<MyDocumentsProps> = ({ jwt }) => {
    const [docs, setDocs] = useState<DocumentInfo[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function loadDocs() {
        try {
            setError(null);
            setDocs(await fetchDocuments(jwt));
        } catch (err: any) {
            setError(err.message ?? "Erreur lors du chargement");
        }
    }

    useEffect(() => {
        loadDocs();
    }, [jwt]);

    const handleDelete = async (filename: string) => {
        if (!window.confirm(`Confirmez-vous la suppression de ${filename} ?`)) {
            return;
        }
        try {
            setLoading(true);
            await deleteDocument(filename, jwt);
            await loadDocs();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="error">Erreur : {error}</div>;
    }

    return (
        <section className="my-documents">
            <h3>Mes documents</h3>
            {loading && <p>Suppression en cours…</p>}
            <ul>
                {docs.map((doc) => (
                    <li key={doc.name} className="document-item">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            {doc.name} ({new Date(doc.created).toLocaleDateString()})
                        </a>
                        {" — "}
                        <button
                            className="btn-delete"
                            onClick={() => handleDelete(doc.name)}
                            disabled={loading}
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MyDocuments;
