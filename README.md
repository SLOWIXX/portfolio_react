# Portfolio React & Next.js

**Nom et prénom :** Quentin Deglas  
**URL du site déployé :** [https://portfolio-react-yc14.onrender.com/](https://portfolio-react-yc14.onrender.com/)

Bienvenue sur le projet Portfolio !
Ce projet est réalisé avec **Next.js**, **React**, et une base de données **SQLite**.

## Prérequis pour faire tourner le projet

1. **Node.js** (v18+ recommandé)
2. **NPM** ou **Yarn**

## Installation

1. Cloner ce dépôt ou extraire l'archive du projet.
2. Ouvrir le terminal dans le dossier du projet (`pf`).
3. Installer les dépendances :
   ```bash
   npm install
   ```
   _(ou `yarn install`)_

## Informations nécessaires au bon fonctionnement (.env)

Ce projet utilise des variables d'environnement, notamment pour l'envoi du formulaire de contact via l'API Resend. Le fichier `.env.local` n'est pas versionné pour des raisons de sécurité.

Pour que le projet fonctionne parfaitement chez vous :

1. Vous trouverez un fichier nommé `.env.example` à la racine du projet.
2. Copiez et renommez ce fichier en **`.env.local`**.
3. (Optionnel) Pour tester l'envoi d'e-mail du formulaire de contact, ajoutez votre propre clé API Resend dans ce fichier : `RESEND_API_KEY=votre_cle_api`.
   _(Note: Même sans cette clé, le reste du site et des fonctionnalités fonctionneront normalement)._

## Initialisation de la base de données

Les données affichées sur le site (comme les "Compétences" et les "Projets") sont gérées via une base de données SQLite.
Avant de lancer le serveur de développement, **vous devez obligatoirement initialiser la base de données** à l'aide de la commande suivante :

```bash
node scripts/init-db.js
```

_Cette étape va générer le fichier `database.sqlite` et y insérer toutes les entrées par défaut nécessaires à l'affichage du portfolio._

## Lancement du site en local

Une fois les dépendances installées, les variables d'environnement configurées et la base de données initialisée, vous pouvez démarrer l'application locale :

```bash
npm run dev
```

Une fois le serveur prêt, ouvrez simplement [http://localhost:3000](http://localhost:3000) dans votre navigateur web pour consulter le site.
