import logo from "@/img/IMG-20250908-WA0004.jpg";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/context/pageContext";
const MobileMenu = () => {
  const {menuDisplay} = useGlobalContext();
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
                <button id="closeMenu" className="text-2xl text-slate-700 hover:text-[#1311a3f3]"><IoClose onClick={menuDisplay} className="h-8 w-8 bg-white text-slate-700"/></button>
            </div>
            <nav className="flex font-medium flex-col space-y-4">
                <Link to="/" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Home</Link>
                <Link to="/About" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">About us</Link>
                <Link to="/Activities" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Activities</Link>
                <Link to="/members" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Members</Link>
                <a href="#contact" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Contact</a>
                <Link to="/signin" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Log in</Link>
            </nav>
        </div>
        
            
    </div>
    )   
}
export default MobileMenu;