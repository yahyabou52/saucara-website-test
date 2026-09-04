# SAUCARA — site vitrine de démonstration

Site one-page en français pour **SAUCARA**, studio pâtissier premium fictif à Casablanca. L’expérience présente des créations de démonstration et aide le visiteur à préparer une demande de gâteau sur mesure avant d’ouvrir WhatsApp.

> Projet fictif et non commercial. La marque, les coordonnées, les horaires, les politiques, les témoignages et les créations présentées ne décrivent pas une entreprise réelle. Les photographies sont des images de stock documentées dans [`docs/ASSETS.md`](docs/ASSETS.md).

## Démarrer localement

Prérequis : Node.js 22 (voir `.nvmrc`) et npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Le numéro WhatsApp est volontairement absent du prototype. Sans configuration, les liens utilisent le compositeur générique `wa.me` avec un message français prérempli. Pour tester un numéro approuvé localement :

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000 npm run dev
```

N’utiliser qu’un numéro autorisé, au format international sans `+`, espace ni ponctuation.

`NEXT_PUBLIC_SITE_URL` définit l’origine canonique des métadonnées et vaut `http://localhost:3000` dans l’exemple local. Avant toute mise en ligne, la remplacer par l’URL HTTPS réellement approuvée ; les valeurs invalides reviennent sans erreur au fallback local.

## Contrôles qualité

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright install chromium  # une fois par machine
npm run test:e2e
python3 scripts/validate_agency.py
python3 scripts/quality_gate.py --ci --report agency/state/QUALITY_REPORT.md
```

Le build utilise Webpack explicitement : le bac à sable de ce projet interdit le port interne utilisé par Turbopack pendant PostCSS. Le script de type checking régénère d’abord les déclarations Next avec `next typegen`, puis exécute TypeScript ; le build conserve aussi son propre contrôle.

## Architecture

- Next.js App Router, React et TypeScript strict ;
- rendu statique et composants serveur pour le contenu ;
- deux îlots client limités au menu mobile et au formulaire ;
- Tailwind CSS 4 avec un système visuel éditorial dans `src/app/globals.css` ;
- images et polices locales dans `src/assets` ;
- tests Vitest/Testing Library et Playwright/axe ;
- route 404, favicon, métadonnées Open Graph et `robots.txt` non indexable.

Le formulaire n’a ni action réseau, ni backend, ni stockage. Après validation locale, il compose seulement une URL WhatsApp que la personne choisit ou non d’ouvrir.

## Contenu principal

Le parcours comprend le header responsive, le hero, cinq créations signature, le service sur mesure, les quatre étapes de commande, cinq occasions, une galerie, trois témoignages explicitement fictifs, six questions fréquentes, le contact et le footer.

Les textes métier et politiques sont des exemples à valider avant toute utilisation commerciale. Les sources et licences des visuels et typographies sont regroupées dans [`docs/ASSETS.md`](docs/ASSETS.md), et le système visuel dans [`design-system/saucara/MASTER.md`](design-system/saucara/MASTER.md).

## Agency OS

L’Agency OS a été installé de façon additive dans ce dépôt cible. Le plan se trouve dans [`agency/state/plan.json`](agency/state/plan.json), les décisions dans [`agency/state/DECISIONS.md`](agency/state/DECISIONS.md), le rapport qualité dans [`agency/state/QUALITY_REPORT.md`](agency/state/QUALITY_REPORT.md), et le dossier de livraison dans [`agency/state/DELIVERY_PACKET.md`](agency/state/DELIVERY_PACKET.md). Les aperçus validés sont regroupés dans [`docs/evidence`](docs/evidence/README.md).

Branche de travail : `codex/saucara-website`. Aucun déploiement ni merge vers `main` n’est effectué par ce projet.
