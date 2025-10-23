import { Facebook, Instagram, Twitter,  } from "lucide-react";
import { Mail } from "lucide-react";
import { useGlobalContext } from "@/context/pageContext";
 import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  const { hideFooter } = useGlobalContext();

  if (hideFooter) return null;
  return (
   <footer className="bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground ">
  <div className="max-w-7xl  border-t border-border  mx-auto  py-10">
    <div className="px-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
      
      {/* Column 1 - Brand */}
      <div>
        <div className="font-semibold font-heading text-lg">
          <span className="text-accent">De</span> GEMS
        </div>
        <p className="mt-2 text-sm text-primary-foreground/80">
          A social club for growth, networking, and shared experiences.
        </p>
      </div>

      {/* Column 2 - Quick Links */}
      <div>
        <h4 className="font-semibold mb-3">Quick Links</h4>
        <ul className="space-y-2 text-sm">
        <li><Link to="/About" className="transition-colors !text-primary-foreground/50 hover:!text-accent">About Us</Link></li>
        <li><Link to="/Activities" className="transition-colors !text-primary-foreground/50 hover:!text-accent">Events</Link></li>
        <li><Link to="/members" className="transition-colors !text-primary-foreground/50 hover:!text-accent">Join Us</Link></li>
    
        </ul>
      </div>

      {/* Column 3 - Contact & Socials */}
      <div>
        <h4 className="font-semibold mb-3">Contact</h4>
        <p className="text-sm flex gap-2 "><Mail className="h-5 transition-colors !text-primary-foreground/50 hover:!text-accent w-5" aria-hidden="true"/> <span className="text-primary-foreground/80">official@degems.org</span></p>
        
        <div className="mt-4 flex gap-4">
          <a href="#" aria-label="Facebook" className="transition-colors !text-primary-foreground/50 hover:!text-accent">
            <Facebook className="h-5 w-5 tex" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Instagram" className="transition-colors !text-primary-foreground/50 hover:!text-accent">
            <Instagram className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Twitter" className="transition-colors !text-primary-foreground/50 hover:!text-accent">
            <Twitter className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>

    </div>
     </div>
    {/* Bottom line */}
    <div className="mt-10 text-center text-xs text-primary-foreground/60  border-t border-border pt-4">
      © {year} De GEMS. All rights reserved.
    </div>
   
  </div>
</footer>

  );
};

export default Footer;