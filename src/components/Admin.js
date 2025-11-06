import React from "react";
import { FaUserCog, FaHospitalUser, FaClipboardList, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2 className="admin-title">
          <FaUserCog className="title-icon" /> Admin Dashboard
        </h2>

        <div className="admin-section">
          <h3><FaHospitalUser /> Manage Donors</h3>
          <ul>
            <li><Link to="/admin/donors">Donor Management</Link></li>
          </ul>
        </div>

        <div className="admin-section">
          <h3><FaHospitalUser /> Manage Hospitals</h3>
          <ul>
            <li><Link to="/admin/hospitals">Hospital Management</Link></li>
          </ul>
        </div>

        <div className="admin-section">
          <h3><FaClipboardList /> Blood Requests</h3>
          <ul>
            <li><Link to="/admin/requests">Blood Request Management</Link></li>
          </ul>
        </div>

        <div className="admin-section">
          <h3><FaChartLine /> Reports</h3>
          <ul>
            <li>📊 Donor activity reports (coming soon)</li>
            <li>📊 Hospital request trends (coming soon)</li>
            <li>📊 Blood availability summary (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
