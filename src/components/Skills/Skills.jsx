import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: "FRONTEND",
      color: "purple",
      skills: ["React", "Angular", "Vue.js"],
      icon: "💻"
    },
    {
      title: "BACKEND", 
      color: "blue",
      skills: ["Node.js", "Python", "Spring Boot", "Symfony"],
      icon: "⚙️"
    },
    {
      title: "ML & AI",
      color: "green",
      skills: ["NLP","HuggingFace", "SpaCy", "Scikit-Learn", "CamemBert", "DistilBERT", "SVC", "RandomForest"],
      icon: "🤖"
    },
    {
      title: "TOOLS",
      color: "accent",
      skills: ["Git", "Docker", "Kubernetes", "Jenkins", "Jira", "SonarQube"],
      icon: "🛠️"
    }
  ];

  return (
    <section id="skills" className="pixel-skills">
      <div className="container">
        <h2 className="pixel-section-title">TECH_STACK</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className={`skill-category ${category.color}`}>
              <div className="skill-header">
                <span className="skill-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="pixel-dot"></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;