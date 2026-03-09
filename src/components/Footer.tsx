const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight">
              <span className="text-foreground">SOLAR</span>
              <span className="text-[hsl(24,95%,53%)]">BOX</span>
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SOLARBOX. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
