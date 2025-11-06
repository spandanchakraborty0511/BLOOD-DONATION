import React from "react";
import "./FindCamps.css";

function FindCamps() {
  const camps = [
    {
      id: 1,
      name: "City Hospital Blood Camp",
      location: "Downtown, Sector 14",
      date: "2025-09-10",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Red Cross Blood Drive",
      location: "Community Hall, Green Park",
      date: "2025-09-12",
      time: "9:00 AM - 3:00 PM",
    },
    {
      id: 3,
      name: "University Blood Camp",
      location: "Campus Auditorium",
      date: "2025-09-15",
      time: "11:00 AM - 5:00 PM",
    },
  ];

  return (
    <div className="find-camps">
      <h2>📍 Nearby Blood Donation Camps</h2>
      <div className="camp-list">
        {camps.map((camp) => (
          <div className="camp-card" key={camp.id}>
            <h3>{camp.name}</h3>
            <p>📍 {camp.location}</p>
            <p>📅 {camp.date}</p>
            <p>🕒 {camp.time}</p>
            <button>Register</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindCamps;
