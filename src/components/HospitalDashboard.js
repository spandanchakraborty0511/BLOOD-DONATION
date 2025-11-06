import React from "react";
import "./HospitalDashboard.css";

function HospitalDashboard() {
  return (
    <div className="hospital-dashboard">
      <h2>🏥 Hospital Portal</h2>
      <p>
        Welcome to the hospital portal. Manage blood requests, donors, and blood
        stock efficiently.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>🩸 Total Blood Units</h3>
          <p>120 Units</p>
        </div>

        <div className="card">
          <h3>📌 Pending Requests</h3>
          <p>8 Requests</p>
        </div>

        <div className="card">
          <h3>✅ Approved Donations</h3>
          <p>56</p>
        </div>

        <div className="card">
          <h3>⚠️ Critical Shortages</h3>
          <p>O- , AB-</p>
        </div>
      </div>

      <div className="hospital-actions">
        <button>➕ Add Blood Request</button>
        <button>📋 View All Requests</button>
        <button>🧑‍🤝‍🧑 Manage Donors</button>
        <button>📦 Update Stock</button>
      </div>
    </div>
  );
}

export default HospitalDashboard;
