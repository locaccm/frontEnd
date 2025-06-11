import React, { useState } from 'react';
import {DocumentInfo, fetchDocuments} from "../../core/api/documentManagement/getDocument.js";
import {generateReceipt} from "../../core/api/documentManagement/postDocument.js";

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

    const loadDocuments = () => {
        fetchDocuments(jwt)
            .then((docs: React.SetStateAction<DocumentInfo[]>) => setDocuments(docs))
            .catch((err: { message: React.SetStateAction<string | null>; }) => setError(err.message));
    };

    const handleConfirm = async () => {
        setShowConfirm(false);
        setIsGenerating(true);

        try {
            const { pdfUrl } = await generateReceipt(leaseId, jwt);
            window.open(pdfUrl, '_blank');
            loadDocuments();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsGenerating(false);
        }
    };

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
                <div className="confirm-modal">
                    <p>
                        Voulez-vous générer la quittance pour le bail n°{leaseId} ?
                    </p>
                    <button onClick={handleConfirm}>Confirmer</button>
                    <button onClick={onClose}>Annuler</button>
                </div>
            ) : (
                <>
                    {isGenerating && <p>Génération en cours…</p>}

                    <section>
                        <h3>Mes documents</h3>
                        <ul>
                            {documents.map(doc => (
                                <li key={doc.url}>
                                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                        {doc.name} (
                                        {new Date(doc.created).toLocaleDateString()})
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button onClick={onClose}>Retour</button>
                    </section>
                </>
            )}
        </div>
    );
};

export default DocumentManagement;
