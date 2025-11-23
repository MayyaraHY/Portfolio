import React from 'react';
import './Hero.css';

const Hero = () => {
  const _rawBase = import.meta.env.BASE_URL || '/';
  const base = _rawBase.endsWith('/') ? _rawBase : `${_rawBase}/`;
  return (
    <section className="pixel-hero">
      <div className="pixel-grid-bg"></div>
      <div className="pixel-corners">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="pixel-avatar">
            <div className="avatar-frame">
              <img src={`${base}icons/me.png`} alt="me" className="avatar-img" />
            </div>
          </div>
          
          <h1 className="pixel-text">
            <span className="pixel-gradient">Mayyara_Haj_Yahia</span>
          </h1>
          <h2 className="pixel-subtitle">Software_architecture_engineer & ML</h2>
          <p className="pixel-description">
            HEYY !! <br></br>
Final-year software architecture student skilled in software development (Spring Boot, Angular) and ML (python/Flask). 
Seeking an end-of-studies internship .          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;