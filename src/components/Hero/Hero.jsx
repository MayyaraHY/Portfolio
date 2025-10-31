import React from 'react';
import './Hero.css';

const Hero = () => {
  const base = import.meta.env.BASE_URL || '/';
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
          <h2 className="pixel-subtitle">FULL_STACK_DEV</h2>
          <p className="pixel-description">
            I BUILD PIXEL-PERFECT APPS WITH MODERN TECH STACKS
          </p>
          
          <div className="pixel-buttons">
            <button className="pixel-btn primary">VIEW_PROJECTS</button>
            <button className="pixel-btn secondary">DOWNLOAD_CV</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;