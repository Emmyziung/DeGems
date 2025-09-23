import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold">
              <span className="text-accent">De</span> GEMS
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-accent transition-colors">About</a>
            <a href="#" className="hover:text-accent transition-colors">Activities</a>
            <a href="#" className="hover:text-accent transition-colors">Join</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors">
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors">
              <Twitter className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs/relaxed text-primary-foreground/80">
          © {year} De GEMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;