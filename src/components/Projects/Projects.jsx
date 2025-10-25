import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  // project data
  const projects = [
    {
      title: "Intelligent Partnership Management Platform",
      description: "A comprehensive microservices-based platform that streamlines partnership lifecycle management for an educational institution, from proposal discovery to performance monitoring and automated contract enforcement.",
      tech: ["TypeScript", "WebGL", "Node.js"],
      color: "purple"
    },
    {
      title: "CRYPTO_DASHBOARD", 
      description: "Real-time cryptocurrency tracking with pixel art visualizations",
      tech: ["React", "WebSocket", "D3.js"],
      color: "blue"
    },
    {
      title: "AI_ART_GENERATOR",
      description: "Generate pixel art using machine learning models",
      tech: ["Python", "TensorFlow", "FastAPI"],
      color: "accent"
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const descRefs = useRef([]);
  const [hasOverflow, setHasOverflow] = useState(() => projects.map(() => false));
  const [videoIndex, setVideoIndex] = useState(null);

  useEffect(() => {
    // measure each description to see if it overflows 3 lines (clamped)
    const measure = () => {
      setHasOverflow(projects.map((_, i) => {
        const el = descRefs.current[i];
        if (!el) return false;
        return el.scrollHeight > el.clientHeight + 1; // small tolerance
      }));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []); // projects array is static in this component

  return (
    <section id="projects" className="pixel-projects">
      <div className="container">
        <h2 className="pixel-section-title">PROJECTS</h2>
        
        {/* Overlay to blur background when a project is expanded */}
        {expandedIndex !== null && (
          <div
            className="projects-overlay"
            onClick={() => setExpandedIndex(null)}
            aria-hidden="true"
          />
        )}
        {/* Video overlay/modal */}
        {videoIndex !== null && (
          <>
            <div
              className="projects-overlay"
              onClick={() => setVideoIndex(null)}
              aria-hidden="true"
            />
            <div className="video-modal" role="dialog" aria-modal="true">
              <video
                src={'/icons/pi%20video.mp4'}
                controls
                autoPlay
                className="video-player"
              />
              <button className="video-close" onClick={() => setVideoIndex(null)} aria-label="Close video">✕</button>
            </div>
          </>
        )}
        
  <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.color} ${expandedIndex === index ? 'is-expanded' : ''}`}>
              <div className="project-header">
                <h3>{project.title}</h3>
              </div>
              {/* top-right expand icon */}
              <button
                className="expand-top"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                aria-pressed={expandedIndex === index}
                aria-label={expandedIndex === index ? 'Close project' : 'Expand project'}
              >
                <img
                  src={expandedIndex === index ? '/icons/close.png' : '/icons/maximize.png'}
                  alt={expandedIndex === index ? 'close' : 'expand'}
                />
              </button>
              
              <p
                className={`project-description ${expandedIndex === index ? 'expanded' : 'clamped'}`}
                ref={el => descRefs.current[index] = el}
              >
                {project.description}
              </p>
              {/* show ...more only when text actually overflows and project is not expanded */}
              {hasOverflow[index] && expandedIndex !== index && (
                <button
                  className="more-link"
                  onClick={() => setExpandedIndex(index)}
                  aria-expanded={false}
                >
                  ...more
                </button>
              )}
              
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              
              <div className="project-actions">
                <button className="pixel-btn small">VIEW_CODE</button>
                <button className="pixel-btn small secondary" onClick={() => setVideoIndex(index)}>LIVE_DEMO</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;