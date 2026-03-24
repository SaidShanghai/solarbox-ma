import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    document.title = "Contact – SOLARBOX";
    return () => { document.title = "SOLARBOX – Énergie Solaire au Maroc"; };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Champs requis", description: "Veuillez remplir le nom, l'email et le message.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("quote_requests").insert({
        client_name: form.name,
        client_email: form.email,
        client_phone: form.phone || null,
        description_projet: form.message,
        project_type: "contact",
        status: "nouveau",
      });
      if (error) throw error;
      setSent(true);
      toast({ title: "Message envoyé ✅", description: "Nous vous répondrons dans les 24h." });
    } catch {
      toast({ title: "Erreur", description: "Une erreur est survenue. Réessayez.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Message envoyé !</h1>
            <p className="text-muted-foreground">Notre équipe vous répondra dans les plus brefs délais.</p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contactez-nous</h1>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Une question sur votre projet solaire ? Notre équipe basée à Casablanca est là pour vous aider.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input id="name" name="name" placeholder="Ahmed Benali" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="ahmed@exemple.ma" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+212 6 XX XX XX XX" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" placeholder="Décrivez votre projet ou posez votre question..." rows={5} value={form.message} onChange={handleChange} required />
                  </div>
                  <Button type="submit" className="w-full gap-2 rounded-full" size="lg" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6 space-y-5">
                <h2 className="font-semibold text-lg">Nos coordonnées</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">CasaNearshore Park, Sidi Maarouf<br />Casablanca 20270, Maroc</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a href="tel:+212600000000" className="text-muted-foreground hover:text-foreground transition-colors">+212 6 00 00 00 00</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@solarbox.ma" className="text-muted-foreground hover:text-foreground transition-colors">contact@solarbox.ma</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm font-medium mb-1">⚡ Réponse rapide</p>
                <p className="text-xs text-muted-foreground">
                  Notre équipe répond en moyenne sous 24h, du lundi au vendredi de 9h à 18h.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
