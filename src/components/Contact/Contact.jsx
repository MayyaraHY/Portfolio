import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form to formsubmit.co which forwards to the target email address
    // No server-side required. Replace the endpoint email if you want a different recipient.
    const endpoint = 'https://formsubmit.co/hajyahia.mayyara@gmail.com';
    setStatus({ loading: true, ok: null, msg: '' });

    const payload = new URLSearchParams();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('message', formData.message);
    // anti-spam honeypot field
    payload.append('_honey', '');
    // disable FormSubmit captcha (optional)
    payload.append('_captcha', 'false');
    payload.append('_subject', 'New portfolio message from ' + (formData.name || formData.email));

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    }).then(res => {
      if (res.ok) {
        setStatus({ loading: false, ok: true, msg: 'Message sent — I will reply soon.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        return res.text().then(text => { throw new Error(text || 'Failed to send'); });
      }
    }).catch(err => {
      console.error('Contact form error', err);
      setStatus({ loading: false, ok: false, msg: 'Failed to send message. Please try mailto: or try again later.' });
    });
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
                <p>hajyahia.mayyara@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div>
                
                  <a href="https://www.linkedin.com/in/mayyara-haj-yahia-5b0199282/" target="_blank" rel="noopener noreferrer"><h3>LINKEDIN</h3></a>
                  <p>Mayyara Haj yahia</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div>
                  <a href="https://github.com/MayyaraHY" target="_blank" rel="noopener noreferrer"><h3>GITHUB</h3></a>
                  <p>MayyaraHY</p>
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
              {status.loading ? 'SENDING...' : 'SEND_MESSAGE'}
            </button>
            {status.ok === true && <p className="form-success" role="status">{status.msg}</p>}
            {status.ok === false && <p className="form-error" role="alert">{status.msg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;