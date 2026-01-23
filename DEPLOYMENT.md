# Procédure de Déploiement - Actor Quest

Cette procédure décrit les étapes pour déployer l'application React "Actor Quest" sur un serveur statique ou une plateforme d'hébergement comme Netlify, Vercel ou un serveur web traditionnel.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre système :

- **Node.js** (version 16 ou supérieure) : Téléchargeable depuis [nodejs.org](https://nodejs.org/).
- **npm** (inclus avec Node.js) ou **yarn** pour la gestion des paquets.
- Un compte sur une plateforme d'hébergement statique (optionnel, si vous déployez sur un serveur personnalisé).

## Étape 1 : Cloner ou Télécharger le Projet

Si ce n'est pas déjà fait, clonez le dépôt Git ou téléchargez les fichiers sources dans un répertoire local.

```bash
git clone https://github.com/philgeronegit/actors-quest
cd actor-quest
```

## Étape 2 : Installer les Dépendances

Installez toutes les dépendances du projet en utilisant npm.

```bash
npm install
```

Cette commande lira le fichier `package.json` et installera tous les paquets nécessaires, y compris React, TypeScript, Tailwind CSS, Flowbite, etc.

## Étape 2.5 : Configurer les Variables d'Environnement

Le projet utilise des variables d'environnement pour configurer des clés API ou autres paramètres sensibles.

1. Copiez le fichier d'exemple `.env-sample` vers `.env` :

   ```bash
   cp .env-sample .env
   ```

2. Ouvrez le fichier `.env` et remplissez les valeurs requises. Par exemple :
   - `REACT_APP_API_ACCESS_TOKEN` : Obtenez un token d'accès API depuis le service approprié (par exemple, TMDB ou un autre fournisseur de données d'acteurs). Remplacez la valeur vide par votre token réel.

   **Important** : Ne commitez jamais le fichier `.env` dans le dépôt Git, car il contient des informations sensibles. Le fichier `.env-sample` est fourni comme modèle.

## Étape 3 : Construire l'Application

Générez les fichiers de production optimisés en exécutant le script de build.

```bash
npm run build
```

Cette commande :
- Compile le code TypeScript en JavaScript.
- Optimise les assets (CSS, JS, images).
- Génère les fichiers statiques dans le dossier `build/`.

Vérifiez que le dossier `build/` contient les fichiers suivants :
- `index.html`
- `static/css/`
- `static/js/`
- `manifest.json`
- `robots.txt`
- `asset-manifest.json`

## Étape 4 : Tester Localement (Optionnel)

Avant le déploiement, vous pouvez tester les fichiers de build localement en utilisant un serveur statique.

Installez `serve` globalement si nécessaire :

```bash
npm install -g serve
```

Puis lancez le serveur :

```bash
serve -s build
```

Ouvrez votre navigateur à `http://localhost:3000` pour vérifier que l'application fonctionne correctement.

## Étape 5 : Déployer l'Application

1. Transférez le contenu du dossier `build/` vers votre serveur web (via FTP, SCP, etc.).
2. Assurez-vous que le serveur sert `index.html` pour toutes les routes (SPA routing).
   - Pour Apache : Ajoutez un fichier `.htaccess` avec des règles de réécriture.
   - Pour Nginx : Configurez les règles de location.
3. Configurez HTTPS si nécessaire pour la sécurité.

## Étape 6 : Vérification Post-Déploiement

- Accédez à l'URL de déploiement.
- Vérifiez que l'application se charge correctement.
- Testez les fonctionnalités principales (recherche d'acteurs, détails, favoris, etc.).
- Vérifiez la console du navigateur pour d'éventuelles erreurs.

## Dépannage

- **Erreur de build** : Assurez-vous que toutes les dépendances sont installées et que Node.js est à jour.
- **Problèmes de routing** : Pour les SPAs, configurez le serveur pour rediriger toutes les requêtes vers `index.html`.
- **Assets manquants** : Vérifiez que le dossier `build/` est complet après le build.

## Notes Supplémentaires

- L'application utilise des données statiques (`actors.json`, `actor-detail.json`) stockées dans `src/assets/`. Assurez-vous qu'elles sont incluses dans le build.
- Pour les environnements de production, considérez l'utilisation de variables d'environnement pour les clés API si nécessaire (bien que ce projet semble utiliser des données locales).
- Maintenez le projet à jour en surveillant les mises à jour des dépendances avec `npm audit` et `npm update`.

Pour toute question ou problème, consultez la documentation React ou les issues du projet.