import logo from "@/img/IMG-20250908-WA0004.jpg";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "@/firebase";
import {   signOut, onAuthStateChanged } from "firebase/auth"
import { useGlobalContext } from "@/context/pageContext";
import { useAuthContext } from "@/context/AuthContext";
const MobileMenu = () => {
    const [memberLink, setMemberLink] = useState("/members");
    const [memberText, setMemberText] = useState("Members");
  useEffect(() => {

  const unSubscribe =onAuthStateChanged(auth, (user) => {
    
  if (user) {
    
    
setMemberLink("/member-dashboard");
setMemberText("Dashboard");      
 
  } else {
    setMemberLink("/members");
    setMemberText("Members");
              
  }  })  
  return () => unSubscribe();
}, [auth.currentUser]);

  const { setCurrentUser} = useAuthContext()
  const {menuDisplay,showMenu} = useGlobalContext();
  return (
    <div>
       {showMenu && <div id="mobileMenu" className="fixed inset-0 bg-[#52525350] bg-opacity-50 z-50 lg:hidden">
        <div className="bg-white h-full w-4/5 max-w-sm p-6 mr-auto ">
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
            <nav onClick={menuDisplay}  className="flex font-medium flex-col space-y-4">
                <Link to="/" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Home</Link>
                <Link to="/About" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">About us</Link>
                <Link to="/Activities" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Activities</Link>
                <Link to={memberLink} className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">{memberText}</Link>
              

                {auth.currentUser?(<Link onClick={() => {signOut(auth); setCurrentUser(null)} } to="/" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Sign Out</Link>):(<Link to="/signin" className="!text-slate-700 hover:!text-primary py-3 px-2 rounded hover:bg-slate-100 transition-colors">Sign In</Link>)}
                
            </nav>
        </div> 
        
            
    </div>}
    </div>
    )   
}
export default MobileMenu;