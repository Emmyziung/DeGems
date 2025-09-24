import logo from "@/img/IMG-20250908-WA0004.jpg";
import { IoClose } from "react-icons/io5";

const MobileMenu = () => {
  return (
        <div id="mobileMenu" className="fixed inset-0 bg-[#d4d4d450] bg-opacity-50 z-50 lg:hidden">
        <div className="bg-white h-full w-4/5 max-w-sm p-6 mr-auto mobile-menu-slide">
            <div className="flex justify-between items-center mb-8">
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
                <button id="closeMenu" className="text-2xl text-slate-700 hover:text-[#1311a3f3]"><IoClose className="h-8 w-8 bg-white text-slate-700"/></button>
            </div>
            <nav className="flex font-medium flex-col space-y-4">
                <a href="#hero" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Home</a>
                <a href="#about" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">About us</a>
                <a href="#services" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Activities</a>
                <a href="#portfolio" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Members</a>
                <a href="#testimonials" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Contact</a>
                <a href="#footer" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Log in</a>
            </nav>
        </div>
        
            
    </div>
    )   
}
export default MobileMenu;