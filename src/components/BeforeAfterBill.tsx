import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sun } from "lucide-react";

export default function BeforeAfterBill() {
  const [tab, setTab] = useState<"before" | "after">("before");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-full p-1 w-fit">
        <button
          onClick={() => setTab("before")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            tab === "before"
              ? "bg-destructive text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Avant
        </button>
        <button
          onClick={() => setTab("after")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
            tab === "after"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Après ☀️
        </button>
      </div>

      {/* Bill card */}
      {/* Bill card — no remount, just cross-fade values */}
      <div
        className={`rounded-2xl border-2 bg-card shadow-lg overflow-hidden transition-colors duration-300 ${
          tab === "before" ? "border-destructive/30" : "border-primary/30"
        }`}
      >
        <div className={`h-1 transition-colors duration-300 ${tab === "before" ? "bg-destructive" : "bg-primary"}`} />

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              tab === "before" ? "bg-destructive/10" : "bg-primary/10"
            }`}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tab}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === "before" ? (
                    <Zap className="w-4 h-4 text-destructive" />
                  ) : (
                    <Sun className="w-4 h-4 text-primary" />
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <div>
              <p className="font-bold text-sm">Facture ONEE</p>
              <p className="text-[11px] text-muted-foreground">Consommation mensuelle</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Consommation réseau</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tab === "before" ? "850" : "320"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold"
                >
                  {tab === "before" ? "850 kWh" : "320 kWh"}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarif moyen/kWh</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tab === "before" ? "1.60" : "1.10"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold"
                >
                  {tab === "before" ? "1.60 MAD" : "1.10 MAD"}
                </motion.span>
              </AnimatePresence>
            </div>
            {/* Always rendered to prevent height jump */}
            <div className={`flex justify-between text-sm text-primary transition-opacity duration-300 ${
              tab === "after" ? "opacity-100" : "opacity-0"
            }`}>
              <span>Production solaire</span>
              <span className="font-semibold">~530 kWh</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex justify-between items-end">
            <span className="font-bold text-sm">Total TTC</span>
            <div className="flex items-baseline gap-2">
              {/* Ancien prix barré — visible uniquement en mode Après */}
              <span
                className={`text-sm line-through text-muted-foreground transition-all duration-300 ${
                  tab === "after" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}
              >
                1 850 MAD
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={tab === "before" ? "1850" : "550"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`text-2xl font-bold ${
                    tab === "before" ? "text-destructive" : "text-primary"
                  }`}
                >
                  {tab === "before" ? "1 850" : "550"} MAD
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
