

## Repositionner SOLARBOX comme vendeur de matériel — sans toucher les titres de pages

### Contrainte
Les titres de navigation et URLs restent identiques (indexation Google en place).

### Stratégie
Changer le **contenu interne** (sous-titres, descriptions, CTAs, badges) pour que le visiteur comprenne immédiatement qu'on vend du matériel + installation, pas un service de diagnostic.

### Changements proposés

**1. Page Accueil (Index.tsx) — Hero section**
- Sous-titre actuel type "diagnostic" → nouveau sous-titre orienté produit :
  *"Panneaux, batteries, installation — votre kit solaire complet livré et installé au Maroc"*
- CTA principal : garder ou remplacer par **"Dimensionner mon kit"** au lieu de "Lancer l'analyse"

**2. Page Accueil — Mockup téléphone**
- Header mockup : *"Votre diagnostic solaire"* → *"Dimensionnez votre kit solaire"*
- Sous-texte mockup : mentionner matériel + pose inclus
- CTA mockup : *"Configurer ma SolarBox"*

**3. Page Diagnostic (Diagnostic.tsx)**
- Badge : *"Diagnostic solaire gratuit"* → *"Configurateur solaire gratuit"*
- Titre : *"Votre diagnostic en 3 minutes"* → *"Votre kit solaire en 3 minutes"*
- Sous-titre : *"On dimensionne le matériel et l'installation adaptés à votre consommation"*

**4. Page Nos Solutions (NosSolutions.tsx)**
- Sous-titre hero : insister sur **"livrée et installée"** plutôt que juste décrire la technologie
- CTA bas de page : *"Lancer mon diagnostic"* → *"Dimensionner mon kit solaire"*

**5. Page À propos (About.tsx)**
- Ajuster la description de SOLARBOX pour mentionner "fournisseur de solutions solaires clé en main" plutôt que "plateforme de diagnostic"

### Ce qui NE change PAS
- Titres de navigation (Accueil, Diagnostic IA, Nos solutions, Blog, À propos, Contact)
- URLs et routes
- Balises `<title>` des pages (déjà indexées)
- Logique du flow diagnostic
- Pages légales

### Résumé
On garde l'enveloppe (titres, URLs, SEO titles) mais on change le **discours intérieur** pour que chaque page dise "on vous vend et installe du matériel solaire", pas "on vous fait un diagnostic".

