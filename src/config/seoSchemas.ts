import { STATS } from "./stats";
import { faqData, buildFaqSchema } from "@/data/faq";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NOORIA – SunGPT",
  "url": "https://sungpt.ma",
  "logo": "https://sungpt.ma/logo.png",
  "description":
    "Premier diagnostic solaire IA au Maroc. Estimez votre installation photovoltaïque, économies et retour sur investissement en moins de 2 minutes.",
  "areaServed": {
    "@type": "Country",
    "name": "Morocco",
  },
  "serviceType": "Diagnostic solaire IA, Installation panneau solaire",
  "currenciesAccepted": "MAD",
  "priceRange": "$$",
  "telephone": "+212-XXX-XXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "MA",
    "addressRegion": "Casablanca-Settat",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.5731,
    "longitude": -7.5898,
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": String(STATS.rating.value),
    "reviewCount": "87",
    "bestRating": "5",
  },
  "sameAs": ["https://solarcompare.ma"],
};

/** FAQ schema built from the single source of truth in faq.ts */
export const faqSchema = buildFaqSchema(faqData.slice(0, 6));

export const defaultSchemas = [localBusinessSchema, faqSchema];
