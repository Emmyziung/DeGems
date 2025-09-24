import img1 from "@/img/close-up-portrait-smiling-african-man-looking.jpg";
import img2 from "@/img/close-up-smiley-man-with-glasses.jpg";
import img3 from "@/img/portrait-smiley-black-man.jpg"
import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

export const PageContext = createContext();

const PageProvider = ({ children }) => {
      const people = [
    { name: "John Doe", role: "President", initials: "JD", image: img1 },
    { name: "Jane Smith", role: "Vice President", initials: "JS", image: img2 },
    { name: "Alex Johnson", role: "Secretary", initials: "AJ", image: img3 },
    { name: "Chris Lee", role: "Treasurer", initials: "CL" },
  ];
  const [showMembers, setShowMembers] = useState(false);  
  const [showMenu, setShowMenu] = useState(false)
  const memberDisplay = () => {
    setShowMembers(!showMembers);
  }
  const menuDisplay = () => {
    setShowMenu(!showMenu);
  }
 /*  useEffect(() => {
    return () => {
     mobileMenu.classList.add('show');
        const slideElement = mobileMenu.querySelector('.mobile-menu-slide');
        if (slideElement) {
            // Small delay to ensure the display: block is applied first
            setTimeout(() => {
                slideElement.classList.add('show');
            }, 10);
        }
        document.body.style.overflow = ['hidden'];
    }
  }, showMenu) */
  

    return (
        <PageContext.Provider value={{ memberDisplay,people, menuDisplay, showMembers }}>
            {children}
        </PageContext.Provider>
    );
}
export const useGlobalContext = () => useContext(PageContext);

export default PageProvider;