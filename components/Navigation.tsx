"use client";

import { useEffect, useState } from "react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        
        root: null,
        rootMargin: "-40% 0px -40% 0px", 
        threshold: 0
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-list">
          <a href="#hero" className={`nav-item ${activeSection === "hero" ? "active" : ""}`}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#skills" className={`nav-item ${activeSection === "skills" ? "active" : ""}`}>
            <i className="fas fa-code"></i>
            <span>Compétences</span>
          </a>
          <a href="#projects" className={`nav-item ${activeSection === "projects" ? "active" : ""}`}>
            <i className="fas fa-briefcase"></i>
            <span>Projets</span>
          </a>
          <a href="#contact" className={`nav-item ${activeSection === "contact" ? "active" : ""}`}>
            <i className="fas fa-envelope"></i>
            <span>Contact</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
