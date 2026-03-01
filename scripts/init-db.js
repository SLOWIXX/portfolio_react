const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("Initialisation de la base de données...");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      count INTEGER,
      skills_list TEXT
    )
  `);

  db.run(`DROP TABLE IF EXISTS projects`);
  db.run(`
    CREATE TABLE projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image TEXT,
      tags TEXT,
      previewStatus INTEGER,
      githubStatus INTEGER,
      previewUrl TEXT,
      githubUrl TEXT,
      isPrincipal INTEGER DEFAULT 0
    )
  `);

  db.run(`DELETE FROM skills`);
  db.run(`DELETE FROM projects`);

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

  const stmtProjects = db.prepare("INSERT INTO projects (title, description, image, tags, previewStatus, githubStatus, previewUrl, githubUrl, isPrincipal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  const projects = [
    {
      title: "Site de Streaming",
      description: "Plateforme de streaming permettant de regarder des films et séries en haute qualité, avec recommandations personnalisées.",
      image: "/images/film.png",
      tags: ["Vue JS", "Node JS", "PHP", "MySQL"],
      previewStatus: 1, // En cours
      githubStatus: 1,  // Code Privé
      previewUrl: "",
      githubUrl: "",
      isPrincipal: 0,
    },
    {
      title: "Site de collection de cartes",
      description: "Plateforme interactive pour collectionner et échanger des cartes Harry Potter avec base de données complète et système de rareté.",
      image: "/images/hp-cards-realistic.svg",
      tags: ["PHP", "MySQL", "API REST", "JavaScript"],
      previewStatus: 2, // Disable
      githubStatus: 1,  // Code Privé
      previewUrl: "",
      githubUrl: "",
      isPrincipal: 0,
    },
    {
      title: "To-Do List app",
      description: "Application web pour gérer des tâches quotidiennes avec interface intuitive et fonctionnalités de rappel. Premiers pas avec Symfony",
      image: "/images/todolist-realistic.svg",
      tags: ["PHP", "Symfony", "Twig"],
      previewStatus: 3, // Active
      githubStatus: 2,  // Code Public
      previewUrl: "/projets/To_do_list/preview.html",
      githubUrl: "https://github.com/SLOWIXX/todo-list",
      isPrincipal: 0,
    },
    {
      title: "Bot Discord d'aide",
      description: "Bot Discord spécialisé pour renseigner les joueurs sur un jeu vidéo avec 55 commandes personnalisées. Utilisé quotidiennement par une moyenne de 60 personnes.",
      image: "/images/discord-simple.svg",
      tags: ["Node.js", "Discord.js", "JavaScript"],
      previewStatus: 2, // Disable
      githubStatus: 1,  // Code Privé
      previewUrl: "",
      githubUrl: "",
      isPrincipal: 1,
    },
    {
      title: "Site Festival Eurokéennes",
      description: "Site web responsive pour le festival des Eurokéennes avec programmation interactive, mini-jeu intégré et fil d'actualités. Interface moderne et immersive pour découvrir l'événement.",
      image: "/images/eurok-site.png",
      tags: ["HTML", "CSS", "JavaScript"],
      previewStatus: 3, // Active
      githubStatus: 2,  // Code Public
      previewUrl: "/projets/site-eurok/index.html",
      githubUrl: "https://github.com/SLOWIXX/Eurokeennes-MDS",
      isPrincipal: 0,
    },
    {
      title: "Système de Réservations d'Activités",
      description: "Plateforme de réservation en ligne pour activités et événements avec gestion de planning et paiement intégré. Actuellement en cours !",
      image: "/images/reservations.svg",
      tags: ["PHP", "MySQL", "JavaScript"],
      previewStatus: 2, // Disable
      githubStatus: 1,  // Code Privé
      githubUrl: "",
      isPrincipal: 0,
    }
  ];

  for (const proj of projects) {
    stmtProjects.run(proj.title, proj.description, proj.image, JSON.stringify(proj.tags), proj.previewStatus, proj.githubStatus, proj.previewUrl, proj.githubUrl, proj.isPrincipal);
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
