import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import JsonLd from "@/components/seo/JsonLd";
import { faqData, buildFaqSchema } from "@/data/faq";

const faqSchema = buildFaqSchema(faqData);

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd schema={faqSchema} />
      <Header />

      <main className="flex-1 pt-16">
        <div className="text-center pt-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            FAQ – Énergie Solaire au Maroc
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Retrouvez les réponses aux questions les plus posées sur le solaire,
            l'autoconsommation et les aides disponibles au Maroc en 2025.
          </p>
        </div>

        <FAQSection
          items={faqData}
          title=""
          subtitle=""
        />
      </main>

      <Footer />
    </div>
  );
}
