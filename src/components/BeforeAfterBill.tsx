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
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl border-2 bg-card shadow-lg overflow-hidden ${
            tab === "before" ? "border-destructive/30" : "border-primary/30"
          }`}
        >
          <div className={`h-1 ${tab === "before" ? "bg-destructive" : "bg-primary"}`} />

          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                tab === "before" ? "bg-destructive/10" : "bg-primary/10"
              }`}>
                {tab === "before" ? (
                  <Zap className="w-4 h-4 text-destructive" />
                ) : (
                  <Sun className="w-4 h-4 text-primary" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm">Facture ONEE</p>
                <p className="text-[11px] text-muted-foreground">Consommation mensuelle</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Consommation réseau</span>
                <span className="font-semibold">
                  {tab === "before" ? "850 kWh" : "320 kWh"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tarif moyen/kWh</span>
                <span className="font-semibold">
                  {tab === "before" ? "1.60 MAD" : "1.10 MAD"}
                </span>
              </div>
              {tab === "after" && (
                <div className="flex justify-between text-sm text-primary">
                  <span>Production solaire</span>
                  <span className="font-semibold">~530 kWh</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-border flex justify-between items-end">
              <span className="font-bold text-sm">Total TTC</span>
              <span className={`text-2xl font-bold ${
                tab === "before" ? "text-destructive" : "text-primary"
              }`}>
                {tab === "before" ? "1 850" : "550"} MAD
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
