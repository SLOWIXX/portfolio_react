"use client";
import { useState, useRef, useEffect } from 'react';
import "destyle.css";
import styles from "./home.module.css";
import Card from './../components/Card';
import ProjectCard from './../components/ProjectCard';


export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const [allSkills, setAllSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.allSkills) setAllSkills(data.allSkills);
        if (data.projects) setProjects(data.projects);
      })
      .catch(err => console.error("Erreur chargement données:", err))
      .finally(() => setLoadingData(false));
  }, []);

  const handleContactSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    // Trigger native browser validation UI
    if (!formRef.current.reportValidity()) return;

    setContactStatus("loading");
    
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    
    console.log("🚀 Lancement de la requête API depuis le front avec ces données:", data);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      
      const responseData = await res.json();
      console.log("📩 Réponse de l'API Contact reçue:", { status: res.status, ok: res.ok, data: responseData });

      if (res.ok) setContactStatus("success");
      else setContactStatus("error");
    } catch (err) {
      console.error("❌ Erreur critique lors du fetch vers /api/contact:", err);
      setContactStatus("error");
    }
  };

  // Les projets et compétences sont maintenant récupérés via l'API (SQLite)

  return (
    <main className={`flex min-h-screen items-center justify-center ${styles.main} dark:bg-black`}>
    
    <section id="hero" className="landing">
      <div className="landing-content">
        <div className="presentation">
          <h1 className="h1">Salut, je suis
            <br></br>
            <span className="prenom">Quentin</span>
          </h1>
          <p className="metier">Développeur Full Stack passionné</p>
          <p className="description">Je crée des expériences web modernes et performantes avec les dernières technologies. Spécialisé dans le développement frontend et backend.</p>
          <div className="boutons-landing">
            <a href="#projects" className="btn-projet" style={{ textDecoration: 'none' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16C3 17 3 21 3 21C3 21 6 21 8 19L5 16ZM21 2H17.31C14.91 2 12.65 2.94 10.95 4.64L8.69 6.9C6.52393 6.48796 4.2827 6.94411 2.45 8.17C2.2 8.34 2.04 8.61 2.01 8.9C1.98 9.19 2.09 9.49 2.3 9.71L14.3 21.71C14.5 21.91 14.75 22 15.01 22C15.27 22 15.52 21.9 15.72 21.71C17.62 19.81 17.32 16.63 17.1 15.33L19.38 13.05C21.08 11.35 22.02 9.09 22.02 6.69V3C22.02 2.45 21.57 2 21.02 2H21ZM17.41 9.41C16.63 10.19 15.36 10.19 14.58 9.41C13.8 8.63 13.8 7.36 14.58 6.58C15.36 5.8 16.63 5.8 17.41 6.58C18.19 7.36 18.19 8.63 17.41 9.41Z" fill="black"/>
</svg>
Voir mes projets</a>
            <a href="#contact" className="btn-contact" style={{ textDecoration: 'none' }}><i className="fas fa-envelope"></i>
Me contacter</a>
            <a href="/images/cv_quentin_deglas.pdf" download="cv_quentin_deglas.pdf" className="btn-cv" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z" fill="black"/>
</svg>
Télécharger mon CV</a>
          </div>
        </div>
        <div className="mac">
          <div className="mac-header">
            <div className="mac-button">
              <span className="red"></span>
              <span className="yellow"></span>
              <span className="green"></span>
            </div>
            <div className="mac-title">
              <p>welcome.js</p>
            </div>
          </div>
          <div className="mac-content">
            <div className="ligne-code">
              <p><span className="keyword">const </span> <span className="variable">developer</span> = {"{"}</p>
            </div>
            <div className="ligne-code">
              <p><span className="propriete">name</span>:<span className="string">&quot;Quentin&quot;</span>,</p>
            </div>
            <div className="ligne-code">
              <p><span className="propriete">passion</span>:<span className="string">&quot;Code&quot;</span>,</p>
            </div>
            <div className="ligne-code">
              <p><span className="propriete">coffee</span>:<span className="boolean">true</span></p>
            </div>
            <div className="ligne-code">
              <p>{"};"}</p>
            </div>
          </div>
        </div>
      </div>

 
    </section>
       <div className="scrool">
      <i className="fas fa-chevron-down"></i>
    </div>



    <section id="skills" className="competences">
      <h1 className="comp-title">Mes Compétences</h1>
      <button 
        className={`toggle ${showAll ? 'active' : ''}`}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? 'Mode aperçu' : 'Tout afficher'}
      </button>
      <div className={`skills-grid ${showAll ? 'show-all-mode' : ''}`}>
        {loadingData ? <p style={{textAlign: "center", width: "100%", color: "#ccc"}}>Chargement...</p> : allSkills.map((item, index) => (
          <Card 
            key={index} 
            title={item.title} 
            count={item.count} 
            skills={item.skills} 
          />
        ))}
      </div>
    </section>$
    
    <section id="projects" className="projects">
      <h2 className="comp-title">Mes Projets</h2>
      <div className="projects-grid">
        {loadingData ? <p style={{textAlign: "center", width: "100%", color: "#ccc"}}>Chargement...</p> : projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>

    <section id="contact" className="contact">
      <h2 className="comp-title">Contactez-moi</h2>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-details">
              <h4>Email</h4>
              <p>quentindeglas@gmail.com</p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="contact-details">
              <h4>Téléphone</h4>
              <p>+33 7 77 49 96 17</p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-details">
              <h4>Localisation</h4>
              <p>Paris, France</p>
            </div>
          </div>
          
          <div className="social-links">
            <a href="https://github.com/SLOWIXX" className="social-link"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/quentin-deglas/" className="social-link"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div className="contact-form">
          <form ref={formRef} autoComplete="off">
            <div className="form-group">
              <label>Nom complet</label>
              <input type="text" name="name" placeholder="Entrez votre nom complet" required autoComplete="off" />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="votre.email@exemple.com" required autoComplete="off" />
            </div>
            
            <div className="form-group">
              <label>Sujet</label>
              <input type="text" name="subject" placeholder="Objet de votre message" required autoComplete="off" />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Écrivez votre message ici..." required></textarea>
            </div>
            
            <button type="button" onClick={handleContactSubmit} className="btn-submit" disabled={contactStatus === "loading"}>
              <i className="fas fa-paper-plane"></i> 
              {contactStatus === "loading" ? "Envoi en cours..." : "Envoyer le message"}
            </button>
            
            {contactStatus === "success" && <p style={{color: '#4ade80', marginTop: '10px', textAlign: 'center'}}>Message envoyé avec succès !</p>}
            {contactStatus === "error" && <p style={{color: '#f87171', marginTop: '10px', textAlign: 'center'}}>Une erreur est survenue, veuillez réessayer.</p>}
          </form>
        </div>
      </div>
    </section>

    </main>
  );
}