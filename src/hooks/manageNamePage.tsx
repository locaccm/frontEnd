import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
    '/':                  'Accueil – LocaCCM',
    '/signin':            'Connexion – LocaCCM',
    '/signup':            'Inscription – LocaCCM',
    '/profile':           'Profil – LocaCCM',
    '/leases':            'Baux – LocaCCM',
    '/wealth-management': 'Gestion de patrimoine – LocaCCM',
    '/contacts':          'Contacts – LocaCCM',
    '/calendar':          'Calendrier – LocaCCM',
    '/properties':        'Propriétés – LocaCCM',
};

export function usePageTitle(defaultTitle = 'LocaCCM') {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = titles[pathname] ?? defaultTitle;
    }, [pathname, defaultTitle]);
}
