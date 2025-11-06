import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h2>📞 Contact Us</h2>
        <p>If you have any queries regarding blood donation, feel free to reach out:</p>

        <div className="contact-info">
          <p><strong>👤 Name:</strong> Spandan Chakraborty</p>
          <p><strong>📱 Phone:</strong> +91-8272950554</p>
          <p><strong>📧 Email:</strong> spandan.chakraborty2023@vitstudent.ac.in</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
