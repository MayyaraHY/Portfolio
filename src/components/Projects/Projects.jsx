import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    //1
    {
      title: "Intelligent Partnership Management Platform",
      description: "A comprehensive microservices-based platform that streamlines partnership lifecycle management for an educational institution, from proposal discovery to performance monitoring and automated contract enforcement.",
      tech: ["SpringBoot", "Angular", "Python", "Docker", "Selenium", "FuzzyWuzzy"],
      color: "purple",
      demo: 'icons/pi%20video.mp4',
      codeUrl: 'https://github.com/MayyaraHY/Elearning/tree/partnership',
      preview: 'icons/previewPI.png'
    },
    //2
    {
      title: "Intelligent classification system",
      description: "This project was developed during my internship to automate and improve the classification of support tickets in an IT service system. The goal is to predict the category of a ticket based on its content, reducing manual workload and improving response efficiency.",
      tech: ["Scikit-learn", "CamemBert", "spaCy", "nltk", "Python", "Flask", "React"],
      color: "blue",
      demo: 'icons/chat.mp4',
      codeUrl: 'https://github.com/MayyaraHY/glpi_chatbot',
      preview: 'icons/chatbot.png'
    },
    {
      title: "Fraud Detection System",
      description: "A system for detecting fraudulent car listings for a second-hand marketplace using machine learning.",
      tech: ["Scikit-learn", "RandomForest", "Hugging Face", "Flask", "Next.js", "DistelBERT"],
      color: "accent",
      //demo: 'icons/ai_demo.mp4',
      codeUrl: 'https://github.com/ilyeschaabani/Ai_MarketPlace/tree/fraud_detection?tab=readme-ov-file',
      preview: ''
    },
    {
      title: "HR management application",
      description: "A comprehensive HR management application that streamlines employee onboarding, performance tracking, and payroll processing.",
      tech: ["Symfony", "Mysql"],
      color: "purple",
      demo: 'icons/pi%20video.mp4',
      codeUrl: 'https://github.com/MayyaraHY/Elearning/tree/partnership',
      preview: ''
    },

  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const descRefs = useRef([]);
  const [hasOverflow, setHasOverflow] = useState(() => projects.map(() => false));
  const [videoIndex, setVideoIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w >= 1200) return 3;
      if (w >= 800) return 2;
    }
    return 1;
  });
  const pointer = useRef({ startX: 0, isDown: false });

  const _rawBase = import.meta.env.BASE_URL || '/';
  const base = _rawBase.endsWith('/') ? _rawBase : `${_rawBase}/`;

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

  // responsive visible count
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      let v = 1;
      if (w >= 1200) v = 3;
      else if (w >= 800) v = 2;
      else v = 1;
      setVisibleCount(v);
      // clamp current slide so we never overflow
      setCurrentSlide(s => Math.min(s, Math.max(0, projects.length - v)));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [projects.length]);

  const maxSlideIndex = Math.max(0, projects.length - visibleCount);

  // pointer (touch) handlers for swipe
  const onPointerDown = (e) => {
    pointer.current.isDown = true;
    pointer.current.startX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? 0;
  };
  const onPointerUp = (e) => {
    if (!pointer.current.isDown) return;
    const endX = e.clientX ?? (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX) ?? 0;
    const dx = endX - pointer.current.startX;
    pointer.current.isDown = false;
    const threshold = 50; // px
    if (dx < -threshold) {
      setCurrentSlide(s => Math.min(s + 1, maxSlideIndex));
    } else if (dx > threshold) {
      setCurrentSlide(s => Math.max(s - 1, 0));
    }
  };

  // keyboard navigation for carousel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide(s => (s + 1) % projects.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(s => (s - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [projects.length]);

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
        {/* Render expanded project as a top-level fixed card (outside the carousel transform)
            This ensures position:fixed centering works correctly even though the carousel
            uses a transformed parent for sliding. */}
        {expandedIndex !== null && projects[expandedIndex] && (
          <div className="project-expanded-portal" aria-hidden={false}>
            <div className={`project-card ${projects[expandedIndex].color} is-expanded`}>
              <div className="project-header">
                <h3>{projects[expandedIndex].title}</h3>
              </div>
              <button
                className="expand-top"
                onClick={() => setExpandedIndex(null)}
                aria-label="Close project"
              >
                <img src={`${base}icons/close.png`} alt="close" />
              </button>

              <div className="project-preview">
                <div className="pixel-art-preview">
                  {projects[expandedIndex].preview ? (
                    <img src={`${base}${projects[expandedIndex].preview}`} alt={`${projects[expandedIndex].title} preview`} className="project-preview-img" />
                  ) : null}
                </div>
              </div>

              <p className="project-description expanded">
                {projects[expandedIndex].description}
              </p>

              <div className="project-tech">
                {projects[expandedIndex].tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-actions">
                <button
                  className="pixel-btn small"
                  onClick={() => {
                    const url = projects[expandedIndex].codeUrl;
                    if (url && url !== '#') window.open(url, '_blank', 'noopener');
                    else alert('Repository link not provided for this project.');
                  }}
                >
                  VIEW_CODE
                </button>
                {projects[expandedIndex].demo ? (
                  <button className="pixel-btn small secondary" onClick={() => setVideoIndex(expandedIndex)}>LIVE_DEMO</button>
                ) : null}
              </div>
            </div>
          </div>
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
                src={
                  videoIndex !== null && projects[videoIndex] && projects[videoIndex].demo
                    ? `${base}${projects[videoIndex].demo}`
                    : undefined
                }
                controls
                autoPlay
                className="video-player"
              >
                {/* If no video source is available for this project, show a fallback message */}
                Your browser does not support the video tag or the demo is unavailable.
              </video>
              <button className="video-close" onClick={() => setVideoIndex(null)} aria-label="Close video">✕</button>
            </div>
          </>
        )}
        </div>
  <div className="projects-carousel">
    <button className="carousel-nav prev" aria-label="Previous project" onClick={() => setCurrentSlide(s => Math.max(s - 1, 0))}>‹</button>
          <div className="carousel-track">
            <div className="carousel-inner"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onTouchStart={onPointerDown}
              onTouchEnd={onPointerUp}
              style={{ transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` }}
            >
            {projects.map((project, index) => (
              <div key={index} className={`carousel-slide ${index === currentSlide ? 'is-active' : ''}`} aria-hidden={index >= currentSlide + visibleCount || index < currentSlide} style={{flex: `0 0 ${100 / visibleCount}%` }}>
                  <div className={`project-card ${project.color} ${expandedIndex === index ? 'is-expanded' : ''}`}>
                    <div className="project-preview">
                      <div className="pixel-art-preview">
                        {project.preview ? (
                          <img src={`${base}${project.preview}`} alt={`${project.title} preview`} className="project-preview-img" />
                        ) : null}
                      </div>
                    </div>
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
                  src={`${base}${expandedIndex === index ? 'icons/close.png' : 'icons/maximize.png'}`}
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
                <button
                  className="pixel-btn small"
                  onClick={() => {
                    if (project.codeUrl) {
                      // open codeUrl in a new tab
                      window.open(project.codeUrl, '_blank', 'noopener');
                    } else {
                      // fallback: alert or no-op
                      // you can replace '#' in project.codeUrl with the real repo url
                      alert('Repository link not provided for this project.');
                    }
                  }}
                >
                  VIEW_CODE
                </button>
                <button className="pixel-btn small" onClick={() => setVideoIndex(index)}>LIVE_DEMO</button>
              </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-nav next" aria-label="Next project" onClick={() => setCurrentSlide(s => Math.min(s + 1, maxSlideIndex))}>›</button>
          <div className="carousel-indicators">
            {Array.from({ length: maxSlideIndex + 1 }).map((_, i) => (
              <button key={i} className={`indicator ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} aria-label={`Go to project ${i + 1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;