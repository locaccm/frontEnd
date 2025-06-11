import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import DocumentManagement from "../../../pages/documentManagement/documentManagement.js";
import { fetchDocuments } from "../../../core/api/documentManagement/getDocument.js";
import { generateReceipt } from "../../../core/api/documentManagement/postDocument.js";
vi.mock('../../../core/api/documentManagement/getDocument');
vi.mock('../../../core/api/documentManagement/postDocument');
const mockedFetchDocuments = vi.mocked(fetchDocuments);
const mockedGenerateReceipt = vi.mocked(generateReceipt);
describe('DocumentManagement', () => {
    const defaultProps = {
        leaseId: 123,
        jwt: 'fake-jwt-token',
        onClose: vi.fn(),
    };
    beforeAll(() => {
        globalThis.open = vi.fn();
    });
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('affiche la confirmation initiale', () => {
        render(_jsx(MemoryRouter, { children: _jsx(DocumentManagement, { ...defaultProps }) }));
        expect(screen.getByText(/Voulez-vous générer la quittance pour le bail n°123 ?/)).toBeInTheDocument();
    });
    it('appelle onClose quand on clique sur Annuler', () => {
        render(_jsx(MemoryRouter, { children: _jsx(DocumentManagement, { ...defaultProps }) }));
        fireEvent.click(screen.getByText('Annuler'));
        expect(defaultProps.onClose).toHaveBeenCalledOnce();
    });
    it('génère la quittance et liste les documents obtenus', async () => {
        mockedGenerateReceipt.mockResolvedValue({ pdfUrl: 'https://exemple/doc.pdf' });
        const docs = [
            { name: 'doc1.pdf', url: 'url1', created: '2023-01-01T00:00:00Z', leaseId: 123 },
            { name: 'doc2.pdf', url: 'url2', created: '2023-02-02T00:00:00Z', leaseId: 123 },
        ];
        mockedFetchDocuments.mockResolvedValue(docs);
        render(_jsx(MemoryRouter, { children: _jsx(DocumentManagement, { ...defaultProps }) }));
        fireEvent.click(screen.getByText('Confirmer'));
        await waitFor(() => {
            expect(screen.getByText(/Génération en cours…/i)).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Mes documents/i })).toBeInTheDocument();
        });
        const link1 = screen.getByRole('link', { name: /doc1\.pdf/i });
        const link2 = screen.getByRole('link', { name: /doc2\.pdf/i });
        expect(link1).toBeInTheDocument();
        expect(link1).toHaveAttribute('href', 'url1');
        expect(link2).toBeInTheDocument();
        expect(link2).toHaveAttribute('href', 'url2');
        expect(screen.getByText('Retour')).toBeInTheDocument();
        expect(globalThis.open).toHaveBeenCalledWith('https://exemple/doc.pdf', '_blank');
    });
    it('gère l’erreur generateReceipt', async () => {
        mockedGenerateReceipt.mockRejectedValue(new Error('GCS error'));
        mockedFetchDocuments.mockResolvedValue([]);
        render(_jsx(MemoryRouter, { children: _jsx(DocumentManagement, { ...defaultProps }) }));
        fireEvent.click(screen.getByText('Confirmer'));
        await waitFor(() => {
            expect(screen.getByText(/Erreur : GCS error/i)).toBeInTheDocument();
        });
        expect(screen.getByText('Retour')).toBeInTheDocument();
    });
    it('gère l’erreur fetchDocuments', async () => {
        mockedGenerateReceipt.mockResolvedValue({ pdfUrl: 'ignored.pdf' });
        mockedFetchDocuments.mockRejectedValue(new Error('Fetch error'));
        render(_jsx(MemoryRouter, { children: _jsx(DocumentManagement, { ...defaultProps }) }));
        fireEvent.click(screen.getByText('Confirmer'));
        await waitFor(() => {
            expect(screen.getByText(/Erreur : Fetch error/i)).toBeInTheDocument();
        });
    });
});
