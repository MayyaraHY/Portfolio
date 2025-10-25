import React, { useState, useEffect } from 'react';
import './Loading.css';

const Loading = ({ onLoadingComplete }) => {
  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Use three image avatars from public/icons
  const avatars = [
    <img src="/icons/yippie.png" alt="yippie" className="avatar-img" key="yippie" />,
    <img src="/icons/peacesign.png" alt="peacesign" className="avatar-img" key="peacesign" />,
    <img src="/icons/kissyface.png" alt="kissyface" className="avatar-img" key="kissyface" />
  ];

  useEffect(() => {
    // Avatar switching interval
    const avatarInterval = setInterval(() => {
      setCurrentAvatar(prev => (prev + 1) % avatars.length);
    }, 800); // Switch every 800ms

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(avatarInterval);
          
          // Loading complete - fade out
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2; // Adjust speed here
      });
    }, 50);

    return () => {
      clearInterval(avatarInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete, avatars.length]);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="pixel-grid-bg"></div>
      <div className="pixel-corners">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>
      
      <div className="loading-content">
        <div className="avatar-container">
          {avatars[currentAvatar]}
        </div>
        
        <div className="loading-text">
          <h2 className="pixel-loading-title">LOADING_PORTFOLIO</h2>
          <p className="loading-subtitle">INITIALIZING_SYSTEMS...</p>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {progress}%
          </div>
        </div>
        
        <div className="loading-stats">
          <div className="stat">
            <span className="stat-label">MEMORY</span>
            <span className="stat-value">[{progress >= 25 ? 'OK' : '...'}]</span>
          </div>
          <div className="stat">
            <span className="stat-label">GRAPHICS</span>
            <span className="stat-value">[{progress >= 50 ? 'OK' : '...'}]</span>
          </div>
          <div className="stat">
            <span className="stat-label">SYSTEM</span>
            <span className="stat-value">[{progress >= 75 ? 'OK' : '...'}]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;