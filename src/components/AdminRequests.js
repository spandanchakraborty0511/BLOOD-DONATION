import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [patient, setPatient] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/requests")
      .then(r => r.json())
      .then(data => { setRequests(data); setLoading(false); });
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/requests/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() => fetchRequests());
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_name: patient, blood_type: bloodType, units }),
    }).then(() => {
      setPatient(""); setBloodType(""); setUnits(1);
      fetchRequests();
    });
  };

  return (
  <div className="admin-dashboard" style={{background:'#121212', color:'#f5f5f5'}}>
      <h2>🩸 Blood Requests</h2>
  <form onSubmit={handleAdd} style={{ marginBottom: 20, background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18 }}>
        <input value={patient} onChange={e => setPatient(e.target.value)} placeholder="Patient Name" required />
        <input value={bloodType} onChange={e => setBloodType(e.target.value)} placeholder="Blood Type" required />
        <input type="number" value={units} min={1} onChange={e => setUnits(e.target.value)} placeholder="Units" required />
        <button type="submit">Add Request</button>
      </form>
      <div style={{background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18}}>
        <h3>All Requests</h3>
        {loading ? <div>Loading...</div> : (
          <ul>{requests.map(r => (
            <li key={r.id} style={{background:'#222', color:'#f5f5f5', borderRadius:8, margin:6, padding:10}}>{r.patient_name} ({r.blood_type}, {r.units} units) - {r.status}
              {r.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(r.id, 'approved')}>Approve</button>
                  <button onClick={() => updateStatus(r.id, 'rejected')}>Reject</button>
                </>
              )}
            </li>
          ))}</ul>
        )}
      </div>
    </div>
  );
}

export default AdminRequests;
