import React from "react";
import "./Camps.css";

const Camps = () => {
  const camps = [
    {
      id: 1,
      name: "City Health Center",
      date: "2025-09-10",
      location: "Vandalur, Chennai",
    },
    {
      id: 2,
      name: "Red Cross Blood Camp",
      date: "2025-09-15",
      location: "Kattankulathur, Chennai",
    },
    {
      id: 3,
      name: "Hospital Drive",
      date: "2025-09-20",
      location: "East Coast Road, Chennai",
    },
  ];

  return (
    <div className="camps-container">
      <h2>🩸 Find Nearby Blood Donation Camps</h2>
      <p className="subtitle">Join a camp near you and save lives!</p>
      <div className="camps-grid">
        {camps.map((camp) => (
          <div className="camp-card" key={camp.id}>
            <h3>{camp.name}</h3>
            <p>
              <strong>Date:</strong> {camp.date}
            </p>
            <p>
              <strong>Location:</strong> {camp.location}
            </p>
            <button className="join-btn">Join Camp</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Camps;
