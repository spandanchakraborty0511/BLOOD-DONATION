import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [pending, setPending] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchHospitals = () => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:5000/api/hospitals").then((r) => r.json()),
      fetch("http://localhost:5000/api/hospitals?approved=false").then((r) => r.json()),
    ]).then(([approved, pending]) => {
      setHospitals(approved);
      setPending(pending);
      setLoading(false);
    });
  };

  useEffect(() => { fetchHospitals(); }, []);

  const approveHospital = (id) => {
    fetch(`http://localhost:5000/api/hospitals/${id}/approve`, { method: "POST" })
      .then(() => fetchHospitals());
  };

  const removeHospital = (id) => {
    fetch(`http://localhost:5000/api/hospitals/${id}`, { method: "DELETE" })
      .then(() => fetchHospitals());
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address, contact }),
    }).then(() => {
      setName(""); setAddress(""); setContact("");
      fetchHospitals();
    });
  };

  return (
  <div className="admin-dashboard" style={{background:'#121212', color:'#f5f5f5'}}>
      <h2>🏥 Hospital Management</h2>
  <form onSubmit={handleAdd} style={{ marginBottom: 20, background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Hospital Name" required />
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
        <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Contact" required />
        <button type="submit">Add Hospital</button>
      </form>
      <div style={{background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18, marginBottom:16}}>
        <h3>Pending Hospitals</h3>
        {pending.length === 0 ? <div>None</div> : (
          <ul>{pending.map(h => (
            <li key={h.id} style={{background:'#222', color:'#f5f5f5', borderRadius:8, margin:6, padding:10}}>{h.name} ({h.address}) <button onClick={() => approveHospital(h.id)}>Approve</button> <button onClick={() => removeHospital(h.id)}>Remove</button></li>
          ))}</ul>
        )}
      </div>
      <div style={{background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18}}>
        <h3>Approved Hospitals</h3>
        {hospitals.length === 0 ? <div>None</div> : (
          <ul>{hospitals.map(h => (
            <li key={h.id} style={{background:'#222', color:'#f5f5f5', borderRadius:8, margin:6, padding:10}}>{h.name} ({h.address}) <button onClick={() => removeHospital(h.id)}>Remove</button></li>
          ))}</ul>
        )}
      </div>
    </div>
  );
}

export default AdminHospitals;
