// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import UserInfo from './UserInfo.js';
import Events from './Events.js';

interface SidebarProps {
  userId: number;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userId, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="sidebar">
      <button onClick={onClose}>Fermer</button>
      <div className="tabs">
        <button onClick={() => setActiveTab('info')}>User Info</button>
        <button onClick={() => setActiveTab('events')}>Events</button>
        {/* Ajoute boutons Messages, Accommodation, Lease */}
      </div>

      <div className="content">
        {activeTab === 'info' && <UserInfo userId={userId} />}
        {activeTab === 'events' && <Events userId={userId} />}
        {/* Complète avec Messages, Accommodation, Lease */}
      </div>
    </div>
  );
};

export default Sidebar;
