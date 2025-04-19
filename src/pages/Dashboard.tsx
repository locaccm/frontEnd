import "../styles/Dashboard.css";
import EventList from "../components/EventList.js";

const Dashboard = () => {
  return (
    <>
      {/* Main title of the dashboard */}
      <h1 className="dashboard-title">Dashboard Tenant</h1>

      {/* Grid layout for dashboard cards */}
      <div className="dashboard">
        {/* Event list section */}
        <div className="card">
          <EventList />
        </div>

        {/* Card for example */}
        <div className="card">
          <h2>Bar Chart</h2>
        </div>

        <div className="card">
          <h2>Line Chart</h2>
        </div>

        <div className="card">
          <h2>Pie Chart</h2>
        </div>

        <div className="card full-width">
          <h2>Sales Table</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
