# Portfolio React & Next.js

Bienvenue sur le projet Portfolio !
Ce projet est réalisé avec **Next.js**, **React**, et une base de données **SQLite**.

## Prérequis pour faire tourner le projet

1. **Node.js** (v18+ recommandé)
2. **NPM** ou **Yarn**

## Installation

1. Cloner ce dépôt (`git clone ...`)
2. Installer les dépendances :
   ```bash
   npm install
   ```

## Configuration (Important pour la correction)

Ce projet utilise des variables d'environnement (notamment pour l'envoi des formulaires de contact via l'API Resend).
Le fichier `.env.local` est ignoré par Git pour des raisons de sécurité.

Pour que le projet fonctionne parfaitement chez vous :

1. Prenez le fichier `.env.example` présent à la racine.
2. Copiez/Renommez ce fichier en **`.env.local`**.
3. (Optionnel) Si vous souhaitez tester l'envoi d'e-mail avec Resend, insérez votre propre clé API dans ce fichier `RESEND_API_KEY=...` (Sinon, tout le reste du site fonctionnera normalement).

## Initialisation de la base de données

Les données ("Compétences" et "Projets") ne sont pas écrites en dur, mais sont extraites dynamiquement d'une base SQLite.
Avant de lancer le projet, **vous devez initialiser la base de données** à l'aide de cette commande :

```bash
node scripts/init-db.js
```

_Cela va créer/écraser le fichier `database.sqlite` et insérer les entrées par défaut._

## Lancer l'environnement de développement

Une fois les dépendances installées et la DB générée :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

_Ce projet est une démonstration technique._
