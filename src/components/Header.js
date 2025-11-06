import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">🩸 Blood Donation</div>
      <nav className="nav">
        <Link to="/">Blood Test</Link>
        <Link to="/register">Register</Link>
        <Link to="/donor">Donor Portal</Link>
        <Link to="/hospital">Hospital</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/camps">Camps</Link>
        <li><Link to="/contact">Contact Us</Link></li>

      </nav>
    </header>
  );
};

export default Header;
