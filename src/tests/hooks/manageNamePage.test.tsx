import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {usePageTitle} from "../../hooks/manageNamePage.js";

function renderWithRouter(path: string, defaultTitle?: string) {
    return renderHook(() => usePageTitle(defaultTitle), {
        wrapper: ({ children }) => (
            <MemoryRouter initialEntries={[path]}>
                <Routes>
                    <Route path="*" element={children} />
                </Routes>
            </MemoryRouter>
        ),
    });
}

it('sets the correct title for the root path', () => {
    renderWithRouter('/');
    expect(document.title).toBe('Accueil – LocaCCM');
});

it('sets the correct title for the signin path', () => {
    renderWithRouter('/signin');
    expect(document.title).toBe('Connexion – LocaCCM');
});

it('sets the default title for an unknown path', () => {
    renderWithRouter('/unknown');
    expect(document.title).toBe('LocaCCM');
});

it('sets the provided default title for an unknown path', () => {
    renderWithRouter('/unknown', 'Titre par défaut');
    expect(document.title).toBe('Titre par défaut');
});