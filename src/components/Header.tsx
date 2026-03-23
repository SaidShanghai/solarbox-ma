import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SolarboxLogo from "@/components/SolarboxLogo";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = useMemo(() => {
    const links = [
      { to: "/", label: "Accueil" },
      ...(isAdmin ? [{ to: "/profil", label: "Tableau de bord" }] : []),
      { to: "/diagnostic", label: "Diagnostic IA" },
      { to: "/nos-solutions", label: "Nos solutions" },
      { to: "/blog", label: "Blog" },
      { to: "/a-propos", label: "À propos" },
      ...(!isAdmin ? [{ to: "/profil", label: "Mon diagnostic" }] : []),
    ];
    return links;
  }, [isAdmin]);

  // Determine which index should show the pill (hovered takes priority, else active route)
  const activeIndex = NAV_LINKS.findIndex((l) => l.to === location.pathname);
  const pillIndex = hoveredIndex !== null ? hoveredIndex : activeIndex >= 0 ? activeIndex : 0;

  // Compute pill position from refs
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = linkRefs.current[pillIndex];
    const nav = navRef.current;
    if (el && nav) {
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - navRect.left,
        width: elRect.width,
      });
    }
  }, [pillIndex, NAV_LINKS]);

  // Recalculate on resize
  useEffect(() => {
    const onResize = () => {
      const el = linkRefs.current[pillIndex];
      const nav = navRef.current;
      if (el && nav) {
        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setPillStyle({
          left: elRect.left - navRect.left,
          width: elRect.width,
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pillIndex]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowLogout(false);
    navigate("/");
  };

  const headerTransparent = isHome && !scrolled;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        headerTransparent
          ? "bg-transparent border-transparent"
          : "glass border-border"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center shrink-0 translate-y-0.5">
              <SolarboxLogo className="md:hidden" size="sm" />
              <SolarboxLogo className="hidden md:block" size="md" />
            </Link>

            {/* Desktop nav */}
            <nav
              ref={navRef}
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Sliding pill */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-background/90 shadow-sm"
                animate={{ left: pillStyle.left, width: pillStyle.width }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ pointerEvents: "none" }}
              />
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                    pillIndex === i
                      ? "text-foreground"
                      : headerTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className={`hidden sm:inline text-xs truncate max-w-[160px] ${
                    headerTransparent ? "text-white/70" : "text-muted-foreground"
                  }`}>{user.email}</span>
                  <Button size="sm" variant="outline" onClick={() => setShowLogout(true)}
                    className={headerTransparent ? "border-white/30 text-white hover:bg-white/10" : ""}>
                    Connecté
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm" className="hidden md:inline-flex">
                  <Link to="/profil">Se connecter</Link>
                </Button>
              )}

              {/* Mobile hamburger */}
              <button
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  headerTransparent ? "text-white hover:bg-white/10" : "hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-lg"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {!user && (
                  <Link
                    to="/profil"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground text-center"
                  >
                    Se connecter
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Déconnexion</DialogTitle>
            <DialogDescription>
              Voulez-vous vous déconnecter de votre compte ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-center">
            <Button variant="outline" onClick={() => setShowLogout(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
