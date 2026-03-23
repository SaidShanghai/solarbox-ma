import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Sun, BatteryCharging } from "lucide-react";

type TabKey = "before" | "after75" | "after100" | "after120";

interface Scenario {
  label: string;
  shortLabel: string;
  gridKwh: number;
  solarKwh: number;
  totalMad: number;
  coverage: number;
  isBefore: boolean;
  icon: typeof Zap;
  note?: string;
}

const TARIF = 1.6; // MAD/kWh
const CONSO = 850; // kWh/mois

const scenarios: Record<TabKey, Scenario> = {
  before: {
    label: "Avant",
    shortLabel: "Avant",
    gridKwh: CONSO,
    solarKwh: 0,
    totalMad: Math.round(CONSO * TARIF),
    coverage: 0,
    isBefore: true,
    icon: Zap,
  },
  after75: {
    label: "75 %",
    shortLabel: "75 %",
    gridKwh: Math.round(CONSO * 0.25),
    solarKwh: Math.round(CONSO * 0.75),
    totalMad: Math.round(CONSO * 0.25 * TARIF),
    coverage: 75,
    isBefore: false,
    icon: Sun,
  },
  after100: {
    label: "100 %",
    shortLabel: "100 %",
    gridKwh: 0,
    solarKwh: CONSO,
    totalMad: 0,
    coverage: 100,
    isBefore: false,
    icon: Sun,
    note: "Facture réseau → 0 MAD",
  },
  after120: {
    label: "120 %",
    shortLabel: "120 %",
    gridKwh: 0,
    solarKwh: Math.round(CONSO * 1.2),
    totalMad: 0,
    coverage: 120,
    isBefore: false,
    icon: BatteryCharging,
    note: "Surplus injectable dans le réseau",
  },
};

const fmt = (n: number) => n.toLocaleString("fr-FR");

interface BeforeAfterBillProps {
  onScenarioChange?: (monthlySaving: number) => void;
}

export default function BeforeAfterBill({ onScenarioChange }: BeforeAfterBillProps) {
  const [tab, setTab] = useState<TabKey>("before");
  const s = scenarios[tab];

  const handleTab = (key: TabKey) => {
    setTab(key);
    const saving = scenarios.before.totalMad - scenarios[key].totalMad;
    onScenarioChange?.(saving);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-1 bg-muted/80 backdrop-blur rounded-full p-1 w-fit flex-wrap">
        {/* Before tab */}
        <button
          onClick={() => handleTab("before")}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            tab === "before"
              ? "bg-destructive text-destructive-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Avant
        </button>

        {/* After tabs */}
        {(["after75", "after100", "after120"] as const).map((key) => (
          <button
            key={key}
            onClick={() => handleTab(key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              tab === key
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {scenarios[key].label}
          </button>
        ))}
      </div>

      {/* Bill card */}
      <div
        className={`rounded-2xl border-2 bg-card shadow-lg overflow-hidden transition-colors duration-300 ${
          s.isBefore ? "border-destructive/30" : "border-primary/30"
        }`}
      >
        <div className={`h-1 transition-colors duration-300 ${s.isBefore ? "bg-destructive" : "bg-primary"}`} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                s.isBefore ? "bg-destructive/10" : "bg-primary/10"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={tab}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {s.isBefore ? (
                    <Zap className="w-4 h-4 text-destructive" />
                  ) : (
                    <s.icon className="w-4 h-4 text-primary" />
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <div>
              <p className="font-bold text-sm">Facture ONEE</p>
              <p className="text-[11px] text-muted-foreground">
                Consommation mensuelle · {s.isBefore ? "sans solaire" : `couverture ${s.coverage} %`}
              </p>
            </div>
          </div>

          {/* Lines */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Consommation totale</span>
              <span className="font-semibold">{fmt(CONSO)} kWh</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarif moyen/kWh</span>
              <span className="font-semibold">{TARIF.toFixed(2)} MAD</span>
            </div>

            {/* Solar production — always rendered to prevent height jump */}
            <div
              className={`flex justify-between text-sm text-primary transition-opacity duration-300 ${
                !s.isBefore ? "opacity-100" : "opacity-0"
              }`}
            >
              <span>Production solaire</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={s.solarKwh}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold"
                >
                  ~{fmt(s.solarKwh)} kWh
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Réseau résiduel</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={s.gridKwh}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-semibold"
                >
                  {fmt(s.gridKwh)} kWh
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 pt-3 border-t border-border flex justify-between items-end">
            <span className="font-bold text-sm">Total TTC</span>
            <div className="flex items-baseline gap-2">
              {/* Original price strikethrough — visible only in "after" modes */}
              <span
                className={`text-sm line-through text-muted-foreground transition-all duration-300 ${
                  !s.isBefore ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}
              >
                {fmt(scenarios.before.totalMad)} MAD
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={s.totalMad}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`text-2xl font-bold ${s.isBefore ? "text-destructive" : "text-primary"}`}
                >
                  {fmt(s.totalMad)} MAD
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Note */}
          <div className="h-6 mt-2">
            <AnimatePresence mode="wait">
              {s.note && (
                <motion.p
                  key={s.note}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-primary font-medium"
                >
                  ✨ {s.note}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
