import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [pendingDonors, setPendingDonors] = useState([]);
  const [approvedDonors, setApprovedDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pending and approved donors
  const fetchDonors = () => {
    setLoading(true);
    Promise.all([
      fetch("http://localhost:5000/api/donors/pending").then((r) => r.json()),
      fetch("http://localhost:5000/api/donors").then((r) => r.json()),
    ])
      .then(([pending, approved]) => {
        setPendingDonors(pending);
        setApprovedDonors(approved);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not fetch donors from backend.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Approve donor
  const approveDonor = (id) => {
    fetch(`http://localhost:5000/api/donors/${id}/approve`, { method: "POST" })
      .then(() => fetchDonors());
  };

  // Search donors
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return setSearchResults([]);
    setLoading(true);
    fetch(`http://localhost:5000/api/donors?search=${encodeURIComponent(search)}`)
      .then((r) => r.json())
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Search failed.");
        setLoading(false);
      });
  };

  return (
  <div className="admin-dashboard" style={{background:'#121212', color:'#f5f5f5'}}>
      <h2>👨‍💼 Admin Portal</h2>
      <p>Welcome Admin! Approve donors, search, and manage the donor list.</p>

      <div className="dashboard-cards" style={{background:'#181818', borderRadius:12, padding:18}}>
        <div className="card">
          <h3>🧑‍🤝‍🧑 Total Donors</h3>
          <p>{approvedDonors.length}</p>
        </div>
        <div className="card">
          <h3>⏳ Pending Donors</h3>
          <p>{pendingDonors.length}</p>
        </div>
      </div>

  <div className="admin-section" style={{background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18}}>
        <h3>🔍 Search Donors</h3>
        <form onSubmit={handleSearch} style={{ marginBottom: 10 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, blood type, or email"
            style={{ padding: 6, borderRadius: 6, marginRight: 8 }}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {searchResults.length > 0 && (
          <div>
            <h4>Results:</h4>
            <ul>
              {searchResults.map((donor) => (
                <li key={donor.id}>
                  {donor.name} ({donor.blood_type}) - {donor.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

  <div className="admin-section" style={{background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18}}>
        <h3>⏳ Pending Donor Approvals</h3>
        {pendingDonors.length === 0 ? (
          <div>No pending donors.</div>
        ) : (
          <ul>
            {pendingDonors.map((donor) => (
              <li key={donor.id}>
                {donor.name} ({donor.blood_type}) - {donor.email}
                <button style={{ marginLeft: 10 }} onClick={() => approveDonor(donor.id)}>
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

  <div className="admin-section" style={{background:'#181818', color:'#f5f5f5', borderRadius:12, padding:18}}>
        <h3>🧑‍🤝‍🧑 Approved Donors</h3>
        {approvedDonors.length === 0 ? (
          <div>No approved donors.</div>
        ) : (
          <ul>
            {approvedDonors.map((donor) => (
              <li key={donor.id}>
                {donor.name} ({donor.blood_type}) - {donor.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
