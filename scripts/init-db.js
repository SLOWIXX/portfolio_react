const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("Initialisation de la base de données...");

db.serialize(() => {
  // CREATE TABLE FOR SKILLS
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      count INTEGER,
      skills_list TEXT
    )
  `);

  /*
   * =========================================================================
   * POUR RAJOUTER UN PROJET PLUS TARD, VOICI LA COMMANDE SQL :
   * =========================================================================
   * 
   * INSERT INTO projects (title, description, image, tags, previewStatus, githubStatus, isPrincipal) 
   * VALUES (
   *   'Nom de ton nouveau projet', 
   *   'Description géniale de ton projet...', 
   *   'https://url-de-ton-image.com/image.jpg', 
   *   '["Tag1", "Tag2"]', 
   *   1, 
   *   2, 
   *   0
   * );
   * 
   * Note : 
   * - Les tags doivent être stockés sous forme de tableau JSON texte : '["Vue JS", "Node JS"]'
   * - isPrincipal : 1 c'est vrai, 0 c'est faux
   * =========================================================================
   */
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT,
      tags TEXT,
      previewStatus INTEGER,
      githubStatus INTEGER,
      isPrincipal INTEGER DEFAULT 0
    )
  `);

  // Clear existing data to avoid duplicates when re-running
  db.run(`DELETE FROM skills`);
  db.run(`DELETE FROM projects`);

  // --- Insertion des Skills ---
  const stmtSkills = db.prepare("INSERT INTO skills (title, count, skills_list) VALUES (?, ?, ?)");
  const allSkills = [
    { title: "Languages", count: 7, skills: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "Python", "C++"] },
    { title: "Front-End", count: 5, skills: ["Vue JS", "Nuxt JS", "Tailwind CSS", "React JS", "Next JS"] },
    { title: "Back-End", count: 6, skills: ["Node JS", "npm", "Vercel", "OVH", "Symfony", "Laravel"] },
    { title: "Databases", count: 3, skills: ["MySQL", "SQLITE", "MariaDB"] },
    { title: "Design", count: 4, skills: ["Figma", "Adobe", "Canva", "Blender"] },
    { title: "Tools & VCS", count: 4, skills: ["Git", "GitHub", "Postman", "Docker"] },
  ];
  for (const skill of allSkills) {
    stmtSkills.run(skill.title, skill.count, JSON.stringify(skill.skills));
  }
  stmtSkills.finalize();

  // --- Insertion des Projets ---
  const stmtProjects = db.prepare("INSERT INTO projects (title, description, image, tags, previewStatus, githubStatus, isPrincipal) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const projects = [
    {
      title: "Site de Streaming",
      description: "Plateforme de streaming permettant de regarder des films et séries en haute qualité, avec recommandations personnalisées.",
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600",
      tags: ["Vue JS", "Node JS", "PHP", "MySQL"],
      previewStatus: 1,
      githubStatus: 2,
      isPrincipal: 0,
    },
    {
      title: "Site de collection de cartes",
      description: "Plateforme interactive pour collectionner et échanger des cartes Harry Potter avec base de données complète et système de rareté.",
      image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=600",
      tags: ["PHP", "MySQL", "API REST", "JavaScript"],
      previewStatus: 2,
      githubStatus: 2,
      isPrincipal: 0,
    },
    {
      title: "To-Do List app",
      description: "Application web pour gérer des tâches quotidiennes avec interface intuitive et fonctionnalités de rappel. Premiers pas avec Symfony",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600",
      tags: ["PHP", "Symfony", "Twig"],
      previewStatus: 3,
      githubStatus: 2,
      isPrincipal: 0,
    },
    {
      title: "Bot Discord d'aide",
      description: "Bot Discord spécialisé pour renseigner les joueurs sur un jeu vidéo avec 55 commandes personnalisées. Utilisé quotidiennement par une moyenne de 60 personnes.",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=600",
      tags: ["Node.js", "Discord.js", "JavaScript"],
      previewStatus: 2,
      githubStatus: 2,
      isPrincipal: 1,
    },
    {
      title: "Site Festival Eurokéennes",
      description: "Site web responsive pour le festival des Eurokéennes avec programmation interactive, mini-jeu intégré et fil d'actualités. Interface moderne et immersive pour découvrir l'événement.",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600",
      tags: ["HTML", "CSS", "JavaScript"],
      previewStatus: 3,
      githubStatus: 2,
      isPrincipal: 0,
    },
    {
      title: "Système de Réservations d'Activités",
      description: "Plateforme de réservation en ligne pour activités et événements avec gestion de planning et paiement intégré. Actuellement en cours !",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=600",
      tags: ["PHP", "MySQL", "JavaScript"],
      previewStatus: 2,
      githubStatus: 2,
      isPrincipal: 0,
    }
  ];

  for (const proj of projects) {
    stmtProjects.run(proj.title, proj.description, proj.image, JSON.stringify(proj.tags), proj.previewStatus, proj.githubStatus, proj.isPrincipal);
  }
  stmtProjects.finalize();

  console.log("Données insérées avec succès !");
});

db.close((err) => {
  if (err) {
    console.error("Erreur à la fermeture:", err.message);
  } else {
    console.log("Connexion à la base de données fermée.");
  }
});
