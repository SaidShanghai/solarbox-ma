

## Diagnostic du problème

La section "Pourquoi SOLARBOX ?" a plusieurs problèmes visuels :

1. **L'image de fond `sky-clouds-bg.jpg`** contient probablement un soleil visible qui crée du bruit visuel et entre en compétition avec le contenu
2. **L'overlay à 55%** ne suffit pas à neutraliser l'image — le soleil "perce" et distrait
3. **La grille 3 colonnes** (facture | features | stats) sur fond chargé = trop d'éléments visuels en compétition
4. **Manque de hiérarchie visuelle** — tout semble au même niveau d'importance

## Proposition : section épurée, fond neutre, layout recentré

Supprimer l'image de fond et adopter un design sobre et lisible.

```text
┌──────────────────────────────────────────────────────────────┐
│  bg-muted/30 (fond neutre, pas d'image)                     │
│                                                              │
│  Pourquoi SOLARBOX ?  (text-5xl/6xl, aligné à gauche)       │
│  subtitle                                                    │
│                                                              │
│  ┌─────────────────────────┐  ┌────────────────────────────┐ │
│  │  Facture Avant/Après    │  │  4 feature cards           │ │
│  │  + 25yr savings         │  │  en grille 2×2             │ │
│  │  (sticky, glassmorphism)│  │  + double CTA en dessous   │ │
│  └─────────────────────────┘  └────────────────────────────┘ │
│                                                              │
│  ── barre horizontale de 4 stats (inline, compact) ────────  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Changements clés

**1. Supprimer l'image de fond `sky-clouds-bg.jpg`**
- Remplacer par `bg-muted/30` (fond subtil, cohérent avec le reste du site)
- Plus de soleil qui distrait, lecture fluide

**2. Passer de 3 colonnes à 2 colonnes**
- Gauche : Facture Avant/Après + économies 25 ans (sticky)
- Droite : Features en grille 2x2 + CTA double

**3. Stats en barre horizontale en bas**
- Les 4 stats passent en une ligne horizontale (4 colonnes) sous le contenu principal
- Plus compact, moins de bruit, sert de "footer" de section

**4. Feature cards plus grandes et lisibles**
- Grille `grid-cols-2` au lieu de liste verticale
- Cards avec plus de padding, icônes plus grosses
- Hover avec `border-primary/30` pour l'interactivité

### Fichier modifié
- `src/pages/Index.tsx` (lignes 1517-1645) : restructuration de la section 2

