import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DonorPortal from "./components/DonorDashboard";
import Hospital from "./components/Hospital";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";
import AdminHospitals from "./components/AdminHospitals";
import AdminRequests from "./components/AdminRequests";
import BloodTest from "./components/BloodTest";
import RegisterDonor from "./components/RegisterDonor";
import Camps from "./components/Camps";
import Footer from "./components/Footer";
import Header from "./components/Header"; // ✅ new header
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* ✅ Always visible at the top */}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<BloodTest />} />
            <Route path="/register" element={<RegisterDonor />} />
            <Route path="/donor" element={<DonorPortal />} />
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/donors" element={<AdminDashboard />} />
            <Route path="/admin/hospitals" element={<AdminHospitals />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/camps" element={<Camps />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer /> {/* ✅ Always visible at the bottom */}
      </div>
    </Router>
  );
}

export default App;
