// src/components/Header/Header.js
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`pixel-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="pixel-corners">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
      </div>
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <div className="pixel-box"></div>
            <span>DEV_PORTFOLIO</span>
          </div>
          <nav className="pixel-nav">
            <a href="#skills">[SKILLS]</a>
            <a href="#projects">[PROJECTS]</a>
            <a href="#contact">[CONTACT]</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;