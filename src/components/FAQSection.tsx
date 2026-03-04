import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/data/faq";

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  items,
  title = "Questions fréquentes",
  subtitle = "Tout ce que vous devez savoir sur le solaire au Maroc",
}: FAQSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl px-5 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-base font-medium py-5 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
