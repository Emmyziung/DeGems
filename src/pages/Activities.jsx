import { useState, useEffect, use } from "react";
import TabsNavigation from "@/components/ui/TabsNavigation";
import ActivityCard from "@/components/ui/ActivityCard";
import Lightbox from "@/components/ui/Lightbox";
import img1 from "@/img/family-enjoying-their-quality-winter-time.jpg";
import img2 from "@/img/23682.jpg";
import img3 from "@/img/8990534.png";
import img4 from "@/img/close-up-portrait-smiling-african-man-looking.jpg";
import img5 from "@/img/close-up-smiley-man-with-glasses.jpg";
import img6 from "@/img/portrait-smiley-black-man.jpg";
import img7 from "@/img/three-african-american-happy-succesfull-mans-suit-rich-black-business-mans.jpg";
import { useGlobalContext } from "@/context/pageContext";
const activities = [
  {
    id: 1,
    title: "Annual Charity Gala",
    date: "February 28, 2024",
    location: "Iperu-Remo",
    image: img1,
    description: "Join us for an elegant evening of dining, entertainment, and giving back to the community. This year's gala features live music, auctions, and special performances.",
  },
  {
    id: 2,
    title: "Community Outreach",
    date: "March 12, 2024",
    location: "Iperu-Remo",
    image: img2,
    description: "Our monthly community outreach program provides essential services and support to local families in need. Volunteers welcome for food distribution and educational activities.",
  },
  {
    id: 3,
    title: "Annual Dinner Night",
    date: "April 5, 2024",
    location: "Iperu-Remo",
    image: img3,
    description: "A formal dinner event celebrating our club's achievements and honoring outstanding members. Includes keynote speeches and networking opportunities.",
  },
  {
    id: 4,
    title: "Youth Mentorship Program",
    date: "May 15, 2024",
    location: "Iperu-Remo",
    image: img4,
    description: "Empowering the next generation through mentorship and skill-building workshops. Connect with young professionals and share your expertise.",
  },
  {
    id: 5,
    title: "Cultural Festival",
    date: "June 20, 2024",
    location: "Iperu-Remo",
    image: img5,
    description: "Celebrate diversity with traditional music, dance, food, and art from various cultures. A vibrant showcase of our community's rich heritage.",
  },
  {
    id: 6,
    title: "Business Networking Event",
    date: "July 10, 2024",
    location: "Iperu-Remo",
    image: img6,
    description: "Connect with local entrepreneurs and business leaders. Share ideas, form partnerships, and discover new opportunities in our growing community.",
  },
];

const photos = [img1, img2, img3, img4, img5, img6, img7];

const Activities = () => {
   const { tabs } = useGlobalContext();
   console.log(tabs); 
   console.log(1);
  const [activeTab, setActiveTab] = useState("activities");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleTabChange = (tab) =>{
    setActiveTab(tab);
   
  } 
  useEffect(() => {
    if(activeTab==="activities"){
      setActiveTabIndex(0)
    } else{
      setActiveTabIndex(1)
    }   
    }, [activeTab])
 /*  activeTab==="activities"? setActiveTabIndex(0):setActiveTabIndex(1); */
  const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const changePhotoIndex = (index) => setCurrentPhotoIndex(index);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-2">{tabs[activeTabIndex].label}</h1>

        <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "activities" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Gallery photo ${index + 1}`}
                className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        )}

        <Lightbox
          images={photos}
          currentIndex={currentPhotoIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onChangeIndex={changePhotoIndex}
        />
      </div>
    </div>
  );
};

export default Activities;