// src/App.tsx
import React, { useEffect, useState } from 'react';
import api from './services/api.js';
import Sidebar from './components/Sidebar.js';
import './styles/App.css';

interface User {
  USEN_ID: number;
  USEC_TYPE: string;
  USEC_FNAME: string;
  USEC_LNAME: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    api.get<User[]>('/users').then((response) => setUsers(response.data));
  }, []);

  return (
    <div className="app-container">
      <h1>Liste des utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Nom</th>
            <th>Prénom</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.USEN_ID} onClick={() => setSelectedUser(user)}>
              <td>{user.USEN_ID}</td>
              <td>{user.USEC_TYPE}</td>
              <td>{user.USEC_LNAME}</td>
              <td>{user.USEC_FNAME}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && <Sidebar userId={selectedUser.USEN_ID} onClose={() => setSelectedUser(null)} />}
    </div>
  );
};

export default App;
