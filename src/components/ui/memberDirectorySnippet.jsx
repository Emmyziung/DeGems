import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
const MemberDirectorySnippet = () =>{
    return(
        <div className="px-6  ">
         <div className="md:mr-8 mb-12 bg-gradient-to-b  from-white via-primary/80 to-white  rounded-xl mx-auto">
        <div className=" member-directory-snippet
  md:min-h-[50vh] min-h-[30vh]
  flex flex-col
  border border-primary/10
  bg-white/30
  backdrop-blur-4xl
  shadow-md shadow-primary/20 
  hover:shadow-lg
  transition-shadow
  rounded-xl
  p-4">
            
        {/* Dummy Profile Picture (Initials) */}
        <div className="flex justify-between">
        <div className="w-28 h-28 rounded-full bg-white/30 flex items-center justify-center text-2xl font-bold  border-2 border-accent/60 mb-4">
          JD
        </div>
        <IoDiamond  className="size-6 sm:size-8 text-gray-800" />
        </div>

        {/* Name */}
        <h2 className="text-gray-50 [text-shadow:0_0_2px_black] text-xl sm:text-2xl font-bold">John Doe</h2>

        {/* Position */}
        <p className=" text-[16px] sm:text-[18px] font-semibold mb-2">President of Club</p>

        {/* Short Description */}
        <p className="text-gray-700 text-sm mb-4">
          Passionate about technology and community building. Loves mentoring and hackathons.
        </p>
        <p className="text-gray-700 text-sm ">
          Connect with John on:
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mt-2">
          <a href="#" className="flex items-center gap-1  hover:text-blue-400 transition">
            <FaTwitter />
            <span className="text-xs">John</span>
          </a>
          <a href="#" className="flex items-center gap-1  hover:text-blue-600 transition">
            <FaFacebook />
            <span className="text-xs">John</span>
          </a>
          <a href="#" className="flex items-center gap-1  hover:text-pink-400 transition">
            <FaInstagram />
            <span className="text-xs">John</span>
          </a>
        </div>
        </div>
        </div>
        </div>
        
    )   
}

export default MemberDirectorySnippet;