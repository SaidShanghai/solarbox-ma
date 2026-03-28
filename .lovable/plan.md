

## Problème

Le site a **deux sources de JSON-LD Organization avec `aggregateRating`** :

1. **Statique dans `index.html`** — un `<script type="application/ld+json">` hardcodé avec Organization + aggregateRating
2. **Dynamique via React** — le composant `JsonLd` injecte `homepageSchema` (depuis `seoSchemas.ts`) qui contient aussi Organization + aggregateRating

Comme c'est une SPA, le bloc statique de `index.html` reste **toujours dans le DOM**, et sur la homepage le composant React en ajoute un deuxième identique. Google voit donc 2 `aggregateRating` → erreur "L'avis contient plusieurs notes cumulées".

## Solution

**Supprimer le bloc `<script type="application/ld+json">` statique de `index.html`.**

Le schéma dynamique React (`homepageSchema` dans `seoSchemas.ts`) contient déjà toutes les mêmes données (Organization, WebSite, WebPage, FAQPage). Il est injecté/nettoyé correctement par le composant `JsonLd` à chaque changement de page.

## Fichier modifié

- **`index.html`** — Supprimer les ~50 lignes du bloc `<script type="application/ld+json">...</script>` (lignes 24-82 environ), en gardant tout le reste intact (meta tags, OG tags, etc.)

## Résultat

- 1 seul schema Organization + aggregateRating par page
- Plus de duplication détectée par Google Search Console
- Chaque page continue d'avoir son propre JSON-LD via le composant React

