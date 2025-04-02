// src/components/Layout.tsx
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showHeader = location.pathname === "/";

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
};

export default Layout;
