# Tableau de Bord d'Administration de Serveur

Application React moderne pour surveiller et administrer des serveurs via une interface intuitive et configurable.

## 🚀 Fonctionnalités

- **Tableau de bord principal** : Visualisation des indicateurs système clés
- **Gestion des logs** : Consultation des logs serveurs en temps réel
- **Monitoring des ressources** : Suivi CPU, RAM et stockage
- **Système d'alertes** : Notifications en cas de problèmes
- **Configuration dynamique** : Entièrement configurable via fichiers JSON

## 🛠️ Technologies

- **Frontend** : React avec ShadCN/UI
- **API** : Axios pour les requêtes HTTP
- **Navigation** : React Router Dom
- **Architecture** : Application monopage (SPA)

## 📁 Structure du projet

```
server-admin-dashboard/
│-- public/
│-- src/
│   │-- components/
│   │-- hooks/
│   │-- pages/
│   │-- utils/
│   │-- config/
│   │-- App.jsx
│   │-- main.jsx
│-- package.json
│-- tailwind.config.js
│-- vite.config.js
```

## 🔧 Installation

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Configurer le fichier `src/config/config.json`
4. Lancer l'application : `npm run dev`

## ⚙️ Configuration

La configuration centralisée dans `src/config/config.json` permet de :

- Définir les URLs des APIs
- Configurer les paramètres d'affichage des widgets
- Établir les niveaux d'alerte
- Personnaliser l'application sans modifier le code

## 📋 Modules

- **Dashboard Widgets** : Cartes affichant les indicateurs de performance
- **Logs Table** : Tableau interactif des logs en temps réel
- **Alert System** : Gestion et affichage des alertes critiques
- **Header & Sidebar** : Navigation intuitive entre sections

## 🔍 Optimisations

- React.memo pour optimiser les rendus
- Gestion de cache pour limiter les appels API
- Pagination/lazy loading pour les données volumineuses

## 💻 Déploiement

Application déployable sur Vercel ou autre plateforme de déploiement
