import { faqData, buildFaqSchema } from "@/data/faq";

const SITE_URL = "https://solarbox.ma";
const BRAND = "SOLARBOX";

/**
 * Homepage: @graph with a single LocalBusiness entity + WebSite + WebPage + FAQPage (top 6)
 */
export const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND,
      alternateName: BRAND,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 60,
      },
      image: `${SITE_URL}/og-image.png`,
      description:
        "Première plateforme de diagnostic solaire IA au Maroc. Analysez votre facture ONEE, obtenez un devis personnalisé en 2 minutes et connectez-vous à des installateurs certifiés partout au Maroc.",
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        streetAddress: "CasaNearshore Park, Sidi Maarouf",
        addressLocality: "Casablanca",
        postalCode: "20270",
        addressRegion: "Casablanca-Settat",
        addressCountry: "MA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 33.5311,
        longitude: -7.6476,
      },
      priceRange: "35000-120000 MAD",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Maroc",
        sameAs: "https://www.wikidata.org/wiki/Q1028",
      },
      serviceArea: [
        "Casablanca", "Rabat", "Marrakech", "Agadir",
        "Fès", "Tanger", "Meknès", "Oujda", "Kénitra",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.2",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://facebook.com/solarbox.ma",
        "https://instagram.com/solarbox.ma",
        "https://linkedin.com/company/solarbox-ma",
        "https://solarbox.ma",
        "https://nooria.ma",
        "https://solarcompare.ma",
        "https://powerbox.ma",
        "https://sunwall.ma",
        "https://bluecarbon.ma",
        "https://iashems.com",
        "https://iasolaire.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["French", "Arabic"],
        areaServed: "MA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${BRAND} – Diagnostic Solaire IA Maroc`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr-MA",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${BRAND} – Diagnostic Solaire IA Gratuit en 2 min au Maroc`,
      description:
        "Diagnostic solaire IA gratuit en 2 minutes. Économisez jusqu'à 70 % sur votre facture ONEE. Installateurs certifiés partout au Maroc.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "fr-MA",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqData.slice(0, 6).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

/**
 * /faq page: FAQPage with all 12 questions
 */
export const fullFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}/faq`,
  name: `FAQ Solaire Maroc 2025 – 12 Questions Répondues | ${BRAND}`,
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/**
 * /nos-solutions: Service schema
 */
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: `${BRAND} – Installation Solaire Résidentielle et Professionnelle`,
  provider: {
    "@type": "Organization",
    name: BRAND,
    url: SITE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "Maroc",
  },
  description:
    "Installation solaire complète pour particuliers et entreprises au Maroc. Système avec batterie LFP, onduleur hybride, garantie 10 ans, installateurs certifiés.",
  category: "Énergie renouvelable",
  serviceType: "Installation photovoltaïque",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "MAD",
    lowPrice: "35000",
    highPrice: "120000",
    offerCount: "3",
  },
};

/**
 * /diagnostic: HowTo schema
 */
export const diagnosticSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `Comment obtenir un diagnostic solaire gratuit au Maroc avec ${BRAND}`,
  description:
    `Obtenez un diagnostic solaire personnalisé en 2 minutes grâce à ${BRAND}. Analysez votre facture ONEE et recevez une recommandation d'installation en dirhams (MAD).`,
  totalTime: "PT2M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "MAD",
    value: "0",
  },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Uploadez votre facture ONEE",
      text: "Prenez en photo ou téléchargez votre dernière facture ONEE. Notre OCR extrait automatiquement votre consommation en kWh.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "L'IA analyse votre profil",
      text: `${BRAND} combine votre consommation réelle avec les données PVGIS d'ensoleillement de votre région au Maroc pour calculer la puissance optimale.`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Recevez votre rapport personnalisé",
      text: "En moins de 2 minutes : puissance recommandée en kWc, coût estimé en dirhams (MAD), ROI calculé et mise en relation avec des installateurs certifiés proches de chez vous.",
    },
  ],
};

/**
 * /a-propos: AboutPage schema
 */
export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/a-propos`,
  name: `À Propos de ${BRAND} – Experts Solaire au Maroc`,
  description:
    `${BRAND} est la première plateforme IA dédiée au diagnostic solaire au Maroc. Fondée en 2024, elle connecte les particuliers et entreprises avec des installateurs certifiés.`,
  about: {
    "@type": "Organization",
    name: BRAND,
    url: SITE_URL,
    foundingDate: "2024",
    description:
      "Plateforme de diagnostic et mise en relation solaire au Maroc",
    knowsAbout: [
      "Énergie solaire photovoltaïque",
      "Loi 82-21 Maroc",
      "ONEE autoconsommation",
      "Batterie LFP",
      "Onduleur hybride",
      "PVGIS",
      "MASEN",
      "AMEE",
    ],
  },
};

/**
 * Blog article: build dynamically per post
 */
export function buildArticleSchema(post: {
  title: string;
  slug: string;
  meta_description?: string | null;
  content?: string;
  published_at?: string | null;
  cover_image_url?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description:
      post.meta_description || (post.content?.substring(0, 155) + "…") || "",
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at || undefined,
    dateModified: post.published_at || undefined,
    image: post.cover_image_url || `${SITE_URL}/og-image.png`,
    author: {
      "@type": "Organization",
      name: BRAND,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    about: { "@type": "Thing", name: "Énergie solaire au Maroc" },
    keywords:
      "panneau solaire Maroc, installation solaire MAD, ONEE autoconsommation, Loi 82-21",
    inLanguage: "fr-MA",
    isPartOf: {
      "@type": "Blog",
      name: `Blog ${BRAND} – Solaire au Maroc`,
      url: `${SITE_URL}/blog`,
    },
  };
}
