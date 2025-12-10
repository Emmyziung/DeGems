import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images, currentIndex, isOpen, onClose, onChangeIndex }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChangeIndex((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChangeIndex((currentIndex + 1) % images.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onChangeIndex]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  const url = images[currentIndex].url

  return (
    <div className="fixed inset-0 bg-black/99 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 !bg-transparent transition-colors"
        aria-label="Close lightbox"
      >
        <X className="size-8" />
      </button>

      <button
        onClick={() => onChangeIndex((currentIndex - 1 + images.length) % images.length)}
        className="absolute -left-4 top-1/2 -translate-y-1/2 text-gray-200 !bg-transparent hover:text-gray-300 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="size-15 " />
      </button>

      <button
        onClick={() => onChangeIndex((currentIndex + 1) % images.length)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 text-gray-200 !bg-transparent hover:text-gray-300 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="size-15" />
      </button>

      <img
        src={url ? url: images[currentIndex]}
        alt={`Gallery image ${currentIndex + 1}`}
        className="max-w-full max-h-full object-contain"
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;