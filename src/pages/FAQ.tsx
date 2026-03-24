import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/seo/JsonLd";
import { faqData } from "@/data/faq";
import { fullFaqSchema } from "@/config/seoSchemas";
import { usePageMeta } from "@/hooks/usePageMeta";
import faqBg from "@/assets/faq-bg.webp";

export default function FAQ() {
  usePageMeta({
    title: "FAQ Solaire Maroc 2025 – 12 Questions Répondues | SOLARBOX",
    description: "Coûts, Loi 82-21, ONEE, aides AMEE… Toutes les réponses sur l'installation solaire au Maroc par les experts SOLARBOX.",
  });

  return (
    <>
      <JsonLd schema={fullFaqSchema} />

      <main className="flex-1">
        {/* Hero banner with background image */}
        <section
          className="relative pt-28 pb-20 px-4 overflow-hidden"
          style={{
            backgroundImage: `url(${faqBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-foreground/75 backdrop-blur-sm" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              Questions fréquentes
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-background leading-tight">
              Tout savoir sur le solaire au Maroc
            </h1>
            <p className="text-background/70 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Coûts, Loi 82-21, ONEE, aides AMEE… Les réponses claires aux
              questions les plus posées sur l'installation solaire en 2025.
            </p>
          </div>
        </section>

        <FAQSection
          items={faqData}
          title=""
          subtitle=""
        />
      </main>
    </>
  );
}
