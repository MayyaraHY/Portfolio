import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Loading from './components/Loading/Loading';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Optional: Force minimum loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 4000); // Maximum 4 seconds loading time

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="pixel-app">
      {isLoading ? (
        <Loading onLoadingComplete={handleLoadingComplete} />
      ) : (
        <>
          <Header />
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;