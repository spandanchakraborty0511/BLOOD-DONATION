import React, { useEffect, useState } from "react";
import { FaHospitalSymbol, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/donors")
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not fetch donors from backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="donor-container">
      <h2>🧑‍🤝‍🧑 Registered Donors</h2>
      <p className="subtitle">
        List of all registered blood donors in the system.
      </p>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="hospital-grid">
        {donors.map((donor) => (
          <div className="hospital-card" key={donor.id}>
            <div className="hospital-header">
              <FaHospitalSymbol className="hospital-icon" />
              <h3>{donor.name}</h3>
            </div>
            <p>
              <FaMapMarkerAlt className="icon" /> <strong>Blood Type:</strong> {donor.blood_type}
            </p>
            <p>
              <FaPhoneAlt className="icon" /> <strong>Email:</strong> {donor.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorDashboard;
