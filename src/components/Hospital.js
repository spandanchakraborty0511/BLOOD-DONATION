import React, { useState, useEffect } from "react";
import { FaHospital, FaPlusCircle, FaSearch, FaFileMedical } from "react-icons/fa";
import "./Hospital.css";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [reqForm, setReqForm] = useState({ patient_name: "", blood_type: "", units: 1, hospital_id: "" });
  const [reqMsg, setReqMsg] = useState("");
  const [search, setSearch] = useState("");
  const [donors, setDonors] = useState([]);
  const [searching, setSearching] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Fetch hospitals on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/hospitals?approved=true")
      .then(r => r.json())
      .then(data => setHospitals(data));
  }, []);

  // Fetch requests for selected hospital
  useEffect(() => {
    if (selectedHospital) {
      setLoadingRequests(true);
      fetch("http://localhost:5000/api/requests")
        .then(r => r.json())
        .then(data => {
          setRequests(data.filter(req => req.hospital_id === parseInt(selectedHospital)));
          setLoadingRequests(false);
        });
    } else {
      setRequests([]);
    }
  }, [selectedHospital]);

  const handleRequest = (e) => {
    e.preventDefault();
    setReqMsg("");
    fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reqForm, hospital_id: selectedHospital }),
    })
      .then((res) => res.ok ? setReqMsg("✅ Blood Request Submitted!") : setReqMsg("❌ Request failed."))
      .catch(() => setReqMsg("❌ Could not connect to backend."));
    setReqForm({ patient_name: "", blood_type: "", units: 1, hospital_id: selectedHospital });
    // Refresh requests after submit
    setTimeout(() => {
      fetch("http://localhost:5000/api/requests")
        .then(r => r.json())
        .then(data => setRequests(data.filter(req => req.hospital_id === parseInt(selectedHospital))));
    }, 500);
  };

  const handleSearch = (e) => {
    setSearching(true);
    fetch(`http://localhost:5000/api/donors?search=${encodeURIComponent(search)}`)
      .then((r) => r.json())
      .then((data) => { setDonors(data); setSearching(false); })
      .catch(() => { setDonors([]); setSearching(false); });
  };

  return (
    <div className="hospital-page">
      <div className="hospital-container">
        <h2 className="hospital-title">
          <FaHospital className="title-icon" /> Hospital Portal
        </h2>

        {/* Hospital selection */}
        <div className="hospital-section">
          <h3>Select Hospital</h3>
          <select value={selectedHospital} onChange={e => { setSelectedHospital(e.target.value); setReqForm(f => ({ ...f, hospital_id: e.target.value })); }} required>
            <option value="">-- Select Hospital --</option>
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name} ({h.address})</option>
            ))}
          </select>
        </div>

        {/* Blood Request Section */}
        <form className="hospital-form" onSubmit={handleRequest}>
          <h3><FaPlusCircle /> Request Blood</h3>
          <div className="form-group">
            <input type="text" placeholder="Patient Name" required name="patient_name" value={reqForm.patient_name} onChange={e => setReqForm({ ...reqForm, patient_name: e.target.value })} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Blood Group Needed" required name="blood_type" value={reqForm.blood_type} onChange={e => setReqForm({ ...reqForm, blood_type: e.target.value })} />
          </div>
          <div className="form-group">
            <input type="number" placeholder="Units Required" required name="units" value={reqForm.units} min={1} onChange={e => setReqForm({ ...reqForm, units: e.target.value })} />
          </div>
          <button type="submit" className="hospital-btn" disabled={!selectedHospital}>🚑 Submit Request</button>
          {reqMsg && <div style={{ marginTop: 8 }}>{reqMsg}</div>}
        </form>

        {/* Requests for selected hospital */}
        <div className="hospital-section">
          <h3>Blood Requests for Hospital</h3>
          {selectedHospital === "" ? <div>Select a hospital to view requests.</div> : loadingRequests ? <div>Loading...</div> : (
            requests.length === 0 ? <div>No requests yet.</div> : (
              <ul>
                {requests.map(r => (
                  <li key={r.id}>{r.patient_name} ({r.blood_type}, {r.units} units) - Status: {r.status}</li>
                ))}
              </ul>
            )
          )}
        </div>

        {/* Search Donors */}
        <div className="hospital-section">
          <h3><FaSearch /> Find Donors</h3>
          <form onSubmit={e => { e.preventDefault(); handleSearch(); }} style={{ marginBottom: 10 }}>
            <input type="text" className="search-bar" placeholder="Search by blood group or name..." value={search} onChange={e => setSearch(e.target.value)} />
            <button type="submit">Search</button>
          </form>
          {searching && <div>Searching...</div>}
          {donors.length > 0 && (
            <ul>
              {donors.map(d => (
                <li key={d.id}>{d.name} ({d.blood_type}) - {d.email}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Reports */}
        <div className="hospital-section">
          <h3><FaFileMedical /> Reports</h3>
          <ul>
            <li>📌 Blood Request History (see above)</li>
            <li>📌 Available Donors List (use search above)</li>
            <li>📌 Previous Transactions (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
