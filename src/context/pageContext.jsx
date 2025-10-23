import img1 from "@/img/close-up-portrait-smiling-african-man-looking.jpg";
import img2 from "@/img/close-up-smiley-man-with-glasses.jpg";
import img3 from "@/img/portrait-smiley-black-man.jpg"
import { useState, useEffect } from "react";
import { createContext, useContext,  } from "react";
import { useLocation } from "react-router-dom";

export const PageContext = createContext();

const PageProvider = ({ children }) => {
  const location = useLocation();
  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    
    const hiddenPaths = ["/signin", "/admin"]; 

    if (hiddenPaths.includes(location.pathname)) {
      setHideFooter(true);
    } else {
      setHideFooter(false);
    }
  }, [location.pathname]);

   const tabs = [
    { id: "activities", label: "Activities" },
    { id: "gallery", label: "Photo Gallery" },
  ];
  
      const people = [
    { name: "Gem Olusesan Oso", role: "Mayor", initials: "OO" },
    { name: "Gem Olufemi Oyeti", role: "Vice Mayor", initials: "OO" },
    { name: " Gem Abidemi Mate ", role: "Scribe", initials: "AM" },
    { name: "Gem Damilare Talib", role: "Financial Secretary", initials: "DT" },
    { name: "Gem Bisi Odubona", role: "Chief Whip", initials: "BO" },
    { name: " Gem Adeboye Elepe", role: "Social Director", initials: "AE" },
  ];
  const [showMembers, setShowMembers] = useState(false);  
  const [showMenu, setShowMenu] = useState(false)
  const memberDisplay = () => {
    setShowMembers(!showMembers);
  }
  const menuDisplay = () => {
    setShowMenu(!showMenu);
  }
/*   useEffect(() => {
    return () => {
      if (!showMenu) {
     mobileMenu.classList.add('show');
     console.log('showing menu')
        const slideElement = mobileMenu.querySelector('.mobile-menu-slide');
        if (slideElement) {
            // Small delay to ensure the display: block is applied first
            setTimeout(() => {
                slideElement.classList.add('show');
            }, 10);
        }
        document.body.style.overflow = ['hidden'];
      }
    }
  }, [showMenu]) */
  

    return (
        <PageContext.Provider value={{ memberDisplay,people, tabs, menuDisplay, showMembers, showMenu, hideFooter, setHideFooter }}>
            {children}
        </PageContext.Provider>
    );
}
export const useGlobalContext = () => useContext(PageContext);

export default PageProvider;