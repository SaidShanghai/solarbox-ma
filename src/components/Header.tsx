import { useState, useMemo } from "react";
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowLogout(false);
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center shrink-0">
              <SolarboxLogo className="md:hidden" size="sm" />
              <SolarboxLogo className="hidden md:block" size="md" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[160px]">{user.email}</span>
                  <Button size="sm" variant="outline" onClick={() => setShowLogout(true)}>
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
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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