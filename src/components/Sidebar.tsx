import React, { useState } from 'react';
import UserInfo from './UserInfo.js';
import Events from './Events.js';

interface SidebarProps {
  userId: number;
  visible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userId, visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
      <button onClick={onClose}>Fermer</button>
      <div className="tabs">
        <button
          className={activeTab === 'info' ? 'active' : ''}
          onClick={() => setActiveTab('info')}
        >
          User Info
        </button>
        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
      </div>

      <div className="content">
        {activeTab === 'info' && userId > 0 && <UserInfo userId={userId} />}
        {activeTab === 'events' && userId > 0 && <Events userId={userId} />}
      </div>
    </div>
  );
};

export default Sidebar;
