const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NOORIA",
  "description": "NOORIA connecte particuliers et entreprises aux installateurs solaires certifiés au Maroc. Diagnostic gratuit, devis personnalisé, aides d'état SR500 & TATWIR.",
  "url": "https://sungpt.ma",
  "logo": "https://sungpt.ma/og-image.png",
  "image": "https://sungpt.ma/og-image.png",
  "telephone": "+212-XXX-XXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA",
    "addressLocality": "Casablanca",
    "addressRegion": "Casablanca-Settat"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.5731,
    "longitude": -7.5898
  },
  "areaServed": {
    "@type": "Country",
    "name": "Morocco"
  },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment fonctionne le diagnostic solaire NOORIA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En 2 minutes, répondez à quelques questions sur votre logement et votre consommation. Notre IA analyse votre potentiel solaire et vous propose un dimensionnement personnalisé avec les meilleures offres d'installateurs certifiés près de chez vous."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les aides disponibles pour le solaire au Maroc ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le Maroc propose plusieurs programmes d'aides : SR500 pour les particuliers, TATWIR pour les entreprises industrielles, et le GEFF (Green Economy Financing Facility) pour le financement vert. NOORIA vous guide dans l'éligibilité et les démarches."
      }
    },
    {
      "@type": "Question",
      "name": "Combien coûte une installation solaire au Maroc ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le coût varie selon la puissance installée. Pour un particulier, comptez entre 30 000 et 80 000 MAD pour un kit de 3 à 6 kWc. Avec les aides d'état, le retour sur investissement est généralement de 4 à 6 ans, avec jusqu'à 70% d'économies sur votre facture."
      }
    },
    {
      "@type": "Question",
      "name": "Les installateurs NOORIA sont-ils certifiés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, tous les installateurs partenaires NOORIA sont certifiés et vérifiés. Ils disposent de garanties décennales et d'un suivi post-installation. Nous vérifions leurs certifications, références et qualité de service."
      }
    },
    {
      "@type": "Question",
      "name": "Le diagnostic solaire est-il gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, le diagnostic solaire NOORIA est 100% gratuit et sans engagement. Vous recevez une estimation personnalisée de votre potentiel solaire, des économies réalisables et un devis sous 24h."
      }
    }
  ]
};

const JsonLd = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  </>
);

export default JsonLd;
