import { Menu } from "lucide-react";
import logo from "@/img/IMG-20250908-WA0004.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white  border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto h-[10vh] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="De GEMS logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="font-heading text-lg font-semibold text-primary">
            <span className="text-accent">De</span> GEMS
          </p>
        </div>

        <button 
          aria-label="Open menu" id="openMenu"
        className="p-2 !bg-transparent md:hidden   rounded-md  hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
        </button>

        <div className="hidden md:block">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium !text-blue-950 font-body">
            <Link to='/' className="hover:text-accent !text-primary text-base transition-colors">
              Home</Link>
            <Link to = '/About' className="hover:text-accent !text-primary text-base transition-colors">
              About Us</Link>
            <a href="#activities" className="hover:text-accent !text-primary text-base transition-colors">
              Activities</a>
            <a href="#members" className="hover:text-accent !text-primary text-base transition-colors">
              Members</a>
            <a href="#contact" className="hover:text-accent !text-primary text-base transition-colors">
              Contact</a>
              <button>
              <a href="#join" className="px-4 py-2 !bg-gradient-to-r !from-orange-400 !to-orange-600 !text-white rounded hover:!bg-accent/90 transition-colors shadow-xs text-base">
                Log In
              </a>
              </button>

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;