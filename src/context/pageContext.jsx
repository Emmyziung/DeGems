
import { useState, useEffect } from "react";
import { createContext, useContext,  } from "react";
import { useLocation } from "react-router-dom";
import mayorImg from "@/img/mayor.jpg"
import viceImg from "@/img/vice.jpg"
import scribeImg from "@/img/scribe.jpg"
import finSecImg from "@/img/finSec.jpeg"
import whipImg from "@/img/whip.png"


export const PageContext = createContext();

const PageProvider = ({ children }) => {
  const location = useLocation();
  const [hideFooter, setHideFooter] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


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
    { name: "Gem Olusesan Oso", role: "Mayor", initials: "OO", image: mayorImg },
    { name: "Gem Olufemi Oyeti", role: "Vice Mayor", initials: "OO", image: viceImg },
    { name: " Gem Abidemi Mate ", role: "Scribe", initials: "AM", image: scribeImg },
    { name: "Gem Damilare Talib", role: "Financial Secretary", initials: "DT", image: finSecImg },
    { name: "Gem Bisi Odubona", role: "Chief Whip", initials: "BO", image: whipImg },
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
        <PageContext.Provider value={{errorMessage, setErrorMessage, errorDisplay, setErrorDisplay, memberDisplay,people, tabs, menuDisplay, showMembers, showMenu, hideFooter, setHideFooter }}>
            {children}
        </PageContext.Provider>
    );
}
export const useGlobalContext = () => useContext(PageContext);

export default PageProvider;