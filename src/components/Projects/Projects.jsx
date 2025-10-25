import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const projects = [
    {
      title: "PIXEL_GAME_ENGINE",
      description: "A retro-style game engine built with modern web technologies",
      tech: ["TypeScript", "WebGL", "Node.js"],
      status: "LIVE",
      color: "purple"
    },
    {
      title: "CRYPTO_DASHBOARD", 
      description: "Real-time cryptocurrency tracking with pixel art visualizations",
      tech: ["React", "WebSocket", "D3.js"],
      status: "WIP",
      color: "blue"
    },
    {
      title: "AI_ART_GENERATOR",
      description: "Generate pixel art using machine learning models",
      tech: ["Python", "TensorFlow", "FastAPI"],
      status: "DEV",
      color: "accent"
    }
  ];

  return (
    <section id="projects" className={`pixel-projects ${expanded ? 'expanded' : ''}`}>
      <div className="container">
        <h2 className="pixel-section-title">PROJECTS</h2>
        <div className="projects-controls">
          <button
            className="pixel-btn toggle"
            onClick={() => setExpanded(prev => !prev)}
            aria-pressed={expanded}
          >
            {expanded ? 'COLLAPSE_PROJECTS' : 'EXPAND_PROJECTS'}
          </button>
        </div>
        {/* Overlay to blur background when a project is expanded */}
        {expandedIndex !== null && (
          <div
            className="projects-overlay"
            onClick={() => setExpandedIndex(null)}
            aria-hidden="true"
          />
        )}
        
  <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.color} ${expandedIndex === index ? 'is-expanded' : ''}`}>
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className={`status ${project.status.toLowerCase()}`}>
                  [{project.status}]
                </span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-preview">
                <div className="pixel-art-preview">
                  <div className="pixel-grid-small"></div>
                </div>
              </div>
              
              <div className="project-actions">
                <button className="pixel-btn small">VIEW_CODE</button>
                <button className="pixel-btn small secondary">LIVE_DEMO</button>
                <button
                  className="pixel-btn small toggle-expand"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  aria-pressed={expandedIndex === index}
                >
                  {expandedIndex === index ? 'CLOSE' : 'EXPAND'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;