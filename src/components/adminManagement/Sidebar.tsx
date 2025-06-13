import React, { useState } from 'react';
import UserInfo from './UserInfo.js';
import Events from './Events.js';
import Messages from './Messages.js';
import Accommodations from './Accommodations.js';
import Leases from './Leases.js';

interface SidebarProps {
  userId: number;
  visible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userId, visible, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className={`sidebar ${visible ? 'visible' : ''}`}>
<button id="Close_button" onClick={onClose} aria-label="Fermer la barre latérale">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
</button>
      <div className="tabs">
        <button onClick={() => setActiveTab('info')} className={activeTab === 'info' ? 'active' : ''}>User Info</button>
        <button onClick={() => setActiveTab('events')} className={activeTab === 'events' ? 'active' : ''}>Events</button>
        <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>Messages</button>
        <button onClick={() => setActiveTab('accommodations')} className={activeTab === 'accommodations' ? 'active' : ''}>Accommodations</button>
        <button onClick={() => setActiveTab('leases')} className={activeTab === 'leases' ? 'active' : ''}>Leases</button>
      </div>

      <div className="content">
        {activeTab === 'info' && userId > 0 && <UserInfo userId={userId} />}
        {activeTab === 'events' && userId > 0 && <Events userId={userId} />}
        {activeTab === 'messages' && userId > 0 && <Messages userId={userId} />}
        {activeTab === 'accommodations' && userId > 0 && <Accommodations userId={userId} />}
        {activeTab === 'leases' && userId > 0 && <Leases userId={userId} />}
      </div>
    </div>
  );
};

export default Sidebar;
