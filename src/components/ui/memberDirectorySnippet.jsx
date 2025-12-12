import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { useDatabaseContext } from "@/context/DatabaseContext";

const MemberDirectorySnippet = () => {
  const { publicMembers } = useDatabaseContext();

  const [index, setIndex] = useState(0);


  const goNext = () => setIndex((prev) => (prev + 1) % publicMembers.length);
  const goPrev = () =>
    setIndex((prev) =>
      prev === 0 ? publicMembers.length - 1 : prev - 1
    );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  if (!publicMembers || publicMembers.length === 0)
    return <p className="text-gray-600 px-6">No members found...</p>;

  const member = publicMembers[index];
  const {
    firstName,
    lastName,
    position,
    desc,
    socialLinks = {},
    imageUrl,
  } = member;

  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  
  return (
    <div className="w-full flex flex-col items-center overflow-hidden px-6">

    {/* CARD WRAPPER */}
<div
  {...swipeHandlers}
  className="w-full max-w-xl mx-auto transition-all duration-500"
>
  {/* Outer gradient layer (as in original) */}
  <div className="md:mr-8 mb-4 bg-gradient-to-b from-white via-primary/80 to-white rounded-xl mx-auto">
    
    {/* Inner frosted glass card */}
    <div
      className="
        member-directory-snippet
        md:min-h-[50vh] min-h-[30vh]
        flex flex-col
        border border-primary/10
        bg-white/30
        backdrop-blur-4xl
        shadow-md shadow-primary/20
        hover:shadow-lg
        transition-shadow
        rounded-xl
        p-4
      "
    >
      {/* === Card Content === */}
      <div className="flex justify-between">
        <div className="w-28 h-28 rounded-full bg-white/30 flex items-center 
                        justify-center text-2xl font-bold border-2 border-accent/60 mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={fullName || "Member"}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <IoDiamond className="size-6 sm:size-8 text-gray-800" />
      </div>

      {/* Name */}
      {fullName && (
        <h2 className="text-gray-50 [text-shadow:0_0_2px_black] text-xl sm:text-2xl font-bold">
          {fullName}
        </h2>
      )}

      {/* Position */}
      {position && (
        <p className="text-[16px] sm:text-[18px] font-semibold mb-2">
          {position}
        </p>
      )}

      {/* Desc */}
      {desc && <p className="text-gray-700 text-sm mb-4">{desc}</p>}

      {/* Socials */}
      {(socialLinks.twitter ||
        socialLinks.facebook ||
        socialLinks.instagram) && (
        <p className="text-gray-700 text-sm">Connect with {firstName} on:</p>
      )}

      <div className="flex gap-4 mt-2">
        {socialLinks.twitter && (
          <a
            href={`https://twitter.com/${socialLinks.twitter}`}
            target="_blank"
            className="flex items-center gap-1 hover:text-blue-400 transition"
          >
            <FaTwitter />
            <span className="text-xs">{socialLinks.twitter}</span>
          </a>
        )}

        {socialLinks.facebook && (
          <a
            href={`https://facebook.com/${socialLinks.facebook}`}
            target="_blank"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <FaFacebook />
            <span className="text-xs">{socialLinks.facebook}</span>
          </a>
        )}

        {socialLinks.instagram && (
          <a
            href={`https://instagram.com/${socialLinks.instagram}`}
            target="_blank"
            className="flex items-center gap-1 hover:text-pink-400 transition"
          >
            <FaInstagram />
            <span className="text-xs">{socialLinks.instagram}</span>
          </a>
        )}
      </div>
    </div>
  </div>
</div>

      {/* DOTS + DESKTOP NAV */}
      <div className="w-full max-w-md   flex items-center gap-4 justify-center">

        {/* LEFT DESKTOP NAV */}
        <button
          onClick={goPrev}
          className="
            hidden md:flex 
            w-8 h-8 !bg-transparent rounded-full !text-primary
            items-center justify-center hover:bg-primary/90 transition
          "
        >
          <div className="
            w-0 h-0 
            border-t-[8px] border-b-[8px] border-r-[12px]
            border-t-transparent border-b-transparent border-r-primary
          " />
        </button>

        {/* DOTS */}
        <div className="flex gap-2">
          {publicMembers.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? "bg-primary w-4" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* RIGHT DESKTOP NAV */}
        <button
          onClick={goNext}
          className="
            hidden md:flex 
            w-8 h-8 !bg-transparent rounded-full !text-primary
            items-center justify-center hover:bg-primary/90 transition
          "
        >
          <div className="
            w-0 h-0 
            border-t-[8px] border-b-[8px] border-l-[12px]
            border-t-transparent border-b-transparent border-l-primary
          " />
        </button>
      </div>

    </div>
  );
};

export default MemberDirectorySnippet;
