import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="pixel-contact">
      <div className="container">
        <h2 className="pixel-section-title">GET_IN_TOUCH</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <h3>EMAIL</h3>
                <p>your.email@domain.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div>
                <h3>LINKEDIN</h3>
                <p>linkedin.com/in/yourprofile</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div>
                <h3>GITHUB</h3>
                <p>github.com/yourusername</p>
              </div>
            </div>
          </div>
          
          <form className="pixel-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pixel-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pixel-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="pixel-textarea"
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="pixel-btn primary full-width">
              SEND_MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;