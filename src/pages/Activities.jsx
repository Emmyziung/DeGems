import { useState, useEffect, useRef } from "react";
import TabsNavigation from "@/components/ui/TabsNavigation";
import ActivityCard from "@/components/ui/ActivityCard";
import Lightbox from "@/components/ui/Lightbox";

import { useGlobalContext } from "@/context/pageContext";
import { useDatabaseContext } from "@/context/databaseContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";




const Activities = () => {

   const { tabs } = useGlobalContext();

     const {activities, photos, fetchPhotos, hasMore, loading} = useDatabaseContext()
 
  const [activeTab, setActiveTab] = useState("activities");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
   const observerRef = useRef(null);
   const observerInstanceRef = useRef(null);

  // Generate 10 varied skeleton heights for visual interest
  const skeletonHeights = [
"h-48", "h-56", "h-64", "h-72", "h-80" , "h-56", "h-64", "h-72", "h-80", "h-48"
  ];
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





  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index) => {
    // Keep skeleton visible on error for network independence
    setLoadedImages(prev => ({ ...prev, [index]: false }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-primary mb-2">{tabs[activeTabIndex].label}</h1>

        <TabsNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "activities" && 

        (activities.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div> : <div className="w-full h-full text-center">No Activities yet</div>)}
        

       {activeTab === "gallery" && (
  <div>
    <div className="columns-2 lg:columns-3 xl:columns-4 gap-2">
      {photos.length > 0 ? (
        photos.map((photo, index) => (
          <div key={photo.id} className="relative mb-2">
            {!loadedImages[index] && (
              <div
                className={`absolute inset-0 z-10 rounded-lg shadow-sm bg-gray-300 animate-pulse ${
                  skeletonHeights[index % skeletonHeights.length]
                }`}
              />
            )}

            <LazyLoadImage
              effect="blur"
              src={photo.url}
              alt={`Gallery photo ${index + 1}`}
              className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openLightbox(index)}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          </div>
        ))
      ) : (
        // Show 10 skeleton placeholders when no photos are loaded
        Array.from({ length: 10 }, (_, index) => (
          <div
            key={`skeleton-${index}`}
            className={`w-full rounded-lg shadow-sm mb-2 bg-gray-300 animate-pulse ${skeletonHeights[index]}`}
          />
        ))
      )}
    </div>

    {/* SEE MORE BUTTON */}
    <div className="flex justify-center mt-6">
      {hasMore ? (
        <button
          onClick={() => fetchPhotos(false)}
          disabled={loading}
          className="px-4 py-2 !bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
        >
          {loading ? "Loading..." : "See More"}
        </button>
      ) : (
        <p className="text-center text-gray-500">No more photos</p>
      )}
    </div>
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