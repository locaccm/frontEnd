import React, { useState, useEffect } from 'react';
import { DocumentInfo, fetchDocuments } from "../../core/api/documentManagement/getDocument.js";
import { generateReceipt } from "../../core/api/documentManagement/postDocument.js";

export interface DocumentManagementProps {
    leaseId: number;
    jwt: string;
    onClose: () => void;
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({
                                                                   leaseId,
                                                                   jwt,
                                                                   onClose
                                                               }) => {
    const [showConfirm, setShowConfirm]   = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError]               = useState<string | null>(null);
    const [documents, setDocuments]       = useState<DocumentInfo[]>([]);

    const loadDocuments = async () => {
        try {
            const docs = await fetchDocuments(jwt);
            setDocuments(docs);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        setIsGenerating(true);

        try {
            const { pdfUrl } = await generateReceipt(leaseId, jwt);
            window.open(pdfUrl, '_blank');
            await loadDocuments();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (!showConfirm) {
            loadDocuments();
        }
    }, [showConfirm]);

    if (error) {
        return (
            <div className="document-management-page">
                <p className="error">Erreur : {error}</p>
                <button onClick={onClose}>Retour</button>
            </div>
        );
    }

    return (
        <div className="document-management-page">
            {showConfirm ? (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Voulez-vous générer la quittance pour le logement n°{leaseId} ?</p>
                        <div className="modal-actions">
                            <button className="btn-confirm" onClick={handleConfirm} disabled={isGenerating}>
                                {isGenerating ? 'Génération…' : 'Confirmer'}
                            </button>
                            <button className="btn-cancel" onClick={onClose}>Annuler</button>
                        </div>
                    </div>
                </div>
            ) : (
                <section className="my-documents">
                    <h3>Mes documents</h3>
                    {isGenerating && <p className="loading">Génération en cours…</p>}
                    {documents.length === 0 ? (
                        <p>Aucun document disponible.</p>
                    ) : (
                        <ul className="documents-list">
                            {documents.map((doc) => (
                                <li key={doc.url} className="document-item">
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                        {doc.name}
                                    </a>
                                    <span className="created-date">
                    ({new Date(doc.created).toLocaleDateString()})
                  </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="btn-cancel" onClick={onClose}>Retour</button>
                </section>
            )}
        </div>
    );
};

export default DocumentManagement;
