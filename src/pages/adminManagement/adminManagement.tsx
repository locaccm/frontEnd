/**/
// App.tsx
import React, { useEffect, useState } from 'react';
import api from '../../infrastructre/services/adminApi.js';
import './styles/App.css';
import Sidebar from '../../components/adminDashbord/Sidebar.js';
import Header from '../../components/adminDashbord/Header.js';
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
       <Header />
      <h1>Liste des utilisateurs</h1>
      <table className="user-table">
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

      <Sidebar
        userId={selectedUser?.USEN_ID || 0}
        visible={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default App;
