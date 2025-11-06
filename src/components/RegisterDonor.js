import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaHome, FaVenusMars, FaFileSignature } from "react-icons/fa";
import "./RegisterDonor.css";

const RegisterDonor = () => {
  const [form, setForm] = useState({
    name: "",
    blood_type: "",
    email: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess("✅ Donor Registered Successfully!");
        setForm({ name: "", blood_type: "", email: "" });
      } else {
        setSuccess("❌ Registration failed.");
      }
    } catch {
      setSuccess("❌ Could not connect to backend.");
    }
  };

  return (
    <div className="register-donor-page">
      <div className="register-container">
        <h2 className="form-title">
          <FaFileSignature className="title-icon" /> Donor Registration
        </h2>
        {success && <div style={{ marginBottom: 10 }}>{success}</div>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="blood_type"
              placeholder="Blood Type (e.g. A+, O-)"
              value={form.blood_type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            🚀 Register as Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDonor;
