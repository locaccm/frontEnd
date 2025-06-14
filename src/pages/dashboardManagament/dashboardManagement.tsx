// src/pages/dashboardManagement/dashboardManagement.tsx

import UserInfo from "../../components/dashboardManagement/UserInfo.js";
import Accommodations from "../../components/dashboardManagement/Accommodations.js";
import Events from "../../components/dashboardManagement/Events.js";
import Messages from "../../components/dashboardManagement/Messages.js";
import "../../styles/dashboardManagement.css"; // Import the page styles

/**
 * Main dashboard page for the user.
 * Shows user profile, accommodations, events, and messages.
 */
export default function Dashboard() {
  // Hardcoded userId for demonstration/testing purpose (normally dynamic)
  const userId = 1;

  return (
    <div className="dashboard-container">
      {/* Dashboard main title */}
      <h1 className="dashboard-title">Tableau de Bord Utilisateur</h1>

      {/* User profile section (top of the page) */}
      <div className="profile-section card">
        <UserInfo userId={userId} />
      </div>

      {/* Two columns: Accommodations and Events */}
      <div className="content-section">
        <div className="card accommodations">
          <Accommodations userId={userId} />
        </div>

        <div className="card events">
          <Events userId={userId} />
        </div>
      </div>

      {/* Messages section (at the bottom) */}
      <div className="card messages">
        <Messages userId={userId} />
      </div>
    </div>
  );
}
