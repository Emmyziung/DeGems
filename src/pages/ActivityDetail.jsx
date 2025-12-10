import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useState } from "react";
import img1 from "@/img/family-enjoying-their-quality-winter-time.jpg";
import img2 from "@/img/23682.jpg";
import img3 from "@/img/8990534.png";
import { useDatabaseContext } from "@/context/databaseContext";
import Lightbox from "@/components/ui/Lightbox";

const ActivityDetail = () => {
  const {activities} = useDatabaseContext()
  const { id } = useParams();
  
  const activity = activities.find((a) => a.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!activity) {
    return <div className="min-h-screen flex items-center justify-center">Activity not found</div>;
  }

    const openLightbox = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const changePhotoIndex = (index) => setCurrentPhotoIndex(index);


  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Activities", href: "/Activities" },
    { label: activity.title },
  ];

const imageUrls = activity.img|| [];    
           // get their values
                  // remove undefined or empty ones


  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 md:h-80">
        <img
          src={activity.img[0]}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb items={breadcrumbs} />

        <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">{activity.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-base leading-relaxed mb-6">{activity.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {imageUrls.length > 0 ? (
    imageUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Activity photo ${index + 1}`}
        className="w-full h-64 object-cover rounded-lg shadow-sm"
        onClick={() => openLightbox(index)}
      />
    ))
  ) : (
    <p className="text-muted-foreground text-center py-6">
      No photos uploaded yet.
    </p>
  )}
              
            </div>

            <Lightbox
              images={imageUrls}
              currentIndex={currentPhotoIndex}
              isOpen={lightboxOpen}
              onClose={closeLightbox}
              onChangeIndex={changePhotoIndex}
            />
          </div>

          <aside className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h2 className="font-heading font-semibold text-lg mb-4">Event Details</h2>
              <div className="space-y-2">
                <p><strong>Date:</strong> {activity.date}</p>
                <p><strong>Location:</strong> {activity.location}</p>
                <p><strong>Dress Code:</strong> Native Attire</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;