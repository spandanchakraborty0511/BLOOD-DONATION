import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodTest.css";

const BloodTest = () => {
  const [formData, setFormData] = useState({
    hemoglobin: "",
    weight: "",
    bloodGroup: "",
    bp: "",
    disease: "No",
    age: "",
    lastDonation: "",
    report: null,
  });

  const [result, setResult] = useState(null);
  const [eligible, setEligible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { hemoglobin, weight, bp, disease, age } = formData;

    if (
      hemoglobin >= 12 &&
      weight >= 50 &&
      bp.toLowerCase() === "normal" &&
      disease === "No" &&
      age >= 18 &&
      age <= 60
    ) {
      setResult("✅ Eligible – You can register as a donor!");
      setEligible(true);
    } else {
      setResult("❌ Deferred – You are not eligible for donation right now.");
      setEligible(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bloodtest-page">
      <div className="bloodtest-card">
        <h2>🧪 Pre-Donation Blood Test</h2>
        <form onSubmit={handleSubmit} className="bloodtest-form">
          <input
            type="number"
            name="hemoglobin"
            placeholder="Hemoglobin (g/dL)"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group (e.g. A+)"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="bp"
            placeholder="Blood Pressure (Normal/High/Low)"
            onChange={handleChange}
            required
          />
          <select name="disease" onChange={handleChange}>
            <option value="No">No Infectious Disease</option>
            <option value="Yes">Has Infectious Disease</option>
          </select>
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
          />
          <input type="date" name="lastDonation" onChange={handleChange} />
          <input
            type="file"
            name="report"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            Submit Test
          </button>
        </form>

        {result && (
          <div className="test-result">
            <h3>📋 Test Result</h3>
            <p>{result}</p>
            {eligible && (
              <button className="proceed-btn" onClick={goToRegister}>
                🚀 Proceed to Registration
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodTest;
