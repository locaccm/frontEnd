// src/pages/dashboardManagement/dashboardManagement.tsx
import { useState } from "react";
import UserInfo from "../../components/dashboardManagement/UserInfo.js";
import Accommodations from "../../components/dashboardManagement/Accommodations.js";
import Events from "../../components/dashboardManagement/Events.js";
import Messages from "../../components/dashboardManagement/Messages.js";
import "./dashboardManagement.css";

export default function Dashboard() {
    const userId = 1;
  
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-title">Tableau de Bord Utilisateur</h1>
  
        <div className="profile-section card">
          <UserInfo userId={userId} />
        </div>
  
        <div className="content-section">
          <div className="card accommodations">
            <Accommodations userId={userId} />
          </div>
  
          <div className="card events">
            <Events userId={userId} />
          </div>
        </div>
  
        <div className="card messages">
          <Messages userId={userId} />
        </div>
      </div>
    );
  }
  