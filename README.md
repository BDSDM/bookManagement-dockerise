# 📚 Book Management – Application de Gestion de Livres

**Book Management** est une application fullstack (Angular + Spring Boot + MySQL) permettant aux utilisateurs de gérer leurs livres, ajouter des nouveaux, supprimer ou modifier des informations, et d’avoir un suivi complet des utilisateurs et de leurs rôles. Elle propose également une interface administrateur pour gérer les utilisateurs, leurs rôles et leurs accès.

Cette version introduit une amélioration majeure avec la gestion intelligente des cookies, permettant de mémoriser le thème choisi (clair/sombre) et de revenir automatiquement sur la dernière page consultée après reconnexion.

---

## 🚀 Fonctionnalités principales

### 🔐 Authentification sécurisée avec JWT

### 🍪 Gestion avancée des cookies

* Sauvegarde automatique du thème sélectionné (clair/sombre)
* Restauration de la dernière page consultée à la reconnexion

### 👥 Gestion complète des utilisateurs avec rôles (ADMIN / USER)

### 📊 Tableau de bord administrateur

* Gestion des utilisateurs
* Suivi des livres et de leurs informations

### 🛒 Gestion des livres

* Ajouter, modifier ou supprimer des livres
* Gestion des catégories et détails des livres

### 🐳 Application fullstack conteneurisée avec Docker

* MySQL + Spring Boot + Angular

### 🌍 Compatible multi-plateforme

* Windows, Linux et macOS

---

## ⚙️ Installation & Lancement

### 🪟 Sous Windows (CMD / PowerShell)

```cmd
(for %P in (3306 8080 4200) do @for /f "tokens=1" %I in ('docker ps --format "{{.ID}} {{.Ports}}" ^| findstr ":%P"') do docker rm -f %I) & git clone https://github.com/BDSDM/bookManagement-dockerise.git && cd bookManagement-dockerise && docker compose --env-file app.env up -d
```

### 🐧 Sous Linux / macOS (bash / zsh)

```bash
for P in 3306 8080 4200; do
  docker ps -q --filter "publish=$P" | xargs -r docker rm -f
done && \
git clone https://github.com/BDSDM/bookManagement-dockerise.git && \
cd bookManagement-dockerise && \
docker compose --env-file app.env up -d
```

---


