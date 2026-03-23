

## Fusionner "Pourquoi SOLARBOX" et "Avant/Après facture" en une seule section side-by-side

### Layout proposé

Sur un viewport de 1440px, on a ~1400px utiles. Un split 50/50 donne ~680px par côté -- largement suffisant.

```text
┌─────────────────────────────────────────────────────────┐
│  LEFT (50%)                 │  RIGHT (50%)              │
│                             │                           │
│  "Pourquoi SOLARBOX ?"     │  "Votre facture ONEE,     │
│   subtitle                  │   avant et après"         │
│                             │   subtitle                │
│  ┌────┐ ┌────┐             │                           │
│  │feat│ │feat│             │  [Avant/Après tabs]       │
│  └────┘ └────┘             │  [Bill card]              │
│  ┌────┐ ┌────┐             │  [Before/After cards]     │
│  │feat│ │feat│             │  [25yr savings]           │
│  └────┘ └────┘             │                           │
└─────────────────────────────────────────────────────────┘
```

### Modifications

**1. `src/pages/Index.tsx` (lines 1513-1556)**
- Remplacer les deux sections distinctes (Features + BeforeAfterBill wrapper) par une seule section `min-h-screen snap-start bg-muted`
- Layout: `grid lg:grid-cols-2 gap-12 items-center`
- Colonne gauche : titre "Pourquoi SOLARBOX ?", subtitle, grille 2x2 des 4 feature cards
- Colonne droite : `<BeforeAfterBill />`

**2. `src/components/BeforeAfterBill.tsx`**
- Supprimer le wrapper `<section className="py-24 bg-muted/20">` et le `container` -- le parent dans Index gère le layout
- Rendre le composant comme un simple `<div>` sans padding section
- Réduire légèrement les tailles de titre (text-3xl au lieu de text-4xl/5xl) pour s'adapter à la demi-largeur
- Les feature cards passent en grille `grid-cols-2` (2x2) avec des cartes plus compactes

### Mobile
Sur mobile (`< lg`), la grille passe en `grid-cols-1` : features empilées en haut, puis BeforeAfterBill en dessous. Scroll naturel dans la section.

