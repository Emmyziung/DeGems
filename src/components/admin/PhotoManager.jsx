import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { Trash2, Check } from "lucide-react"; // icons
import { X } from "lucide-react";
import { useDatabaseContext } from "@/context/databaseContext";
import uploadImagesToCloudinary from "@/utilities/cloudinaryUpload";


const PhotoManager = ({ view }) => {
  // Dummy photos for remove view
    const{photos, collection, writeBatch, serverTimestamp, db, doc, arrayRemove, setPhotos} = useDatabaseContext()
 const [files, setFiles] = useState([]);
 const [loading, setLoading] = useState(false)
 const handleFileUpload = (e) => {
  const selectedFiles = Array.from(e.target.files);
    const mapped = selectedFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));

    // Append new files to existing ones
    setFiles((prev) => [...prev, ...mapped]);
  };
   const removeFile = (index) => {
    setFiles((prev) => {
      const updated = [...prev];
      const fileToRemove = updated[index];
      if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleClick = async()=> {
    if (files){
      setLoading(true)
      try{
        const imageUrls = await uploadImagesToCloudinary(files);

        const batch = writeBatch(db);
    imageUrls.forEach((url) => {
      const photoDocRef = doc(collection(db, "photos"));
      batch.set(photoDocRef, {
        url,
        
        createdAt: serverTimestamp(),
      });
    });

    await batch.commit(); 

    setFiles([]);
alert("Photos uploaded successfully!");
  } catch (error) {
    console.error("Error uploading phot:", error);
    alert("Upload failed. Try again.");
  }
  setLoading(false)
    }
  }



  if (view === "add-photos") {
    return (
      
          <div className="space-y-4">
            <h2 className="text-muted-foreground font-body">Add New Photos</h2>
             <div className="">
                  {/* File input */}
                  <div className="flex items-center space-x-4 mb-4">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-primary/90 text-white px-4 py-2 rounded-lg flex  items-center gap-2 hover:bg-primary transition duration-200"
                    >
                      <MdOutlineInsertPhoto size={20} color="white"/> Choose Photos
                    </label>
                    <span className="text-sm text-gray-500">
                      {files.length > 0
                        ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                        : "No file chosen"}
                    </span>
                  </div>
            
                  {/* Preview grid */}
                  {files.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
                      {files.map((item, index) => (
                        <div
                          key={index}
                          className="relative border aspect-square rounded-lg p-2 flex flex-col items-center text-center"
                        >
                          {item.preview ? (
                            <img
                              src={item.preview}
                              alt={item.file.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-24 h-24 flex items-center justify-center text-xs text-gray-500 bg-gray-100 rounded-md">
                              {item.file.name.split(".").pop().toUpperCase()} file
                            </div>
                          )}
            
                          {/* File name */}
                          <p className="mt-2 text-xs truncate w-24">{item.file.name}</p>
            
                          {/* Remove button */}
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 !bg-red-100 text-white rounded-full p-1 hover:!bg-red-200"
                          >
                            <X size={14} color="red"/>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            <p className="text-sm text-muted-foreground">
              Supported formats: JPG, PNG. Maximum file size: 5MB.
            </p>
            {loading?<Button className='!bg-primary/90 hover:!bg-primary'>
                                          <div className="loading-spinner "></div>
                            <span >Uploading...</span>
            </Button>:<Button onClick={handleClick} className='!bg-primary/90 hover:!bg-primary'>
              Upload
            </Button>}
          </div>
      
    );
  }


  
  const [selected, setSelected] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ open: false, targets: [] });

  // toggle select mode
  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    setSelected([]); // clear selection
  };

  // handle selecting a photo
  const toggleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // open delete modal
  const handleDeleteClick = (targets) => {
    setConfirmModal({ open: true, targets });
  };

  // confirm delete
 

const confirmDelete = async () => {
  const targets = confirmModal.targets;
  if (!targets || targets.length === 0) return;

  try {
    const batch = writeBatch(db);

    // Schedule deletes/updates in the batch (no awaits inside the loop)
    for (const index of targets) {
      const photo = photos[index];
      if (!photo) continue;

      // 1) delete the photo document
      if (photo.id) {
        const photoDocRef = doc(db, "photos", photo.id);
        batch.delete(photoDocRef);
      }

      // 2) if the photo belongs to an activity, remove its url from that activity's img array
      //    (uses arrayRemove so it removes the exact url value)
      if (photo.activityId && photo.url) {
        const activityDocRef = doc(db, "activities", photo.activityId);
        batch.update(activityDocRef, {
          img: arrayRemove(photo.url)
        });
      }
    }

    // Single network request for all operations
    await batch.commit();

    // UI cleanup
    setSelected([]);
    setPhotos((prev) => prev.filter((_, index) => !targets.includes(index)))
    setConfirmModal({ open: false, targets: [] });
    alert(`Deleted ${targets.length} photo(s) successfully ✅`);
  } catch (error) {
    console.error("Error deleting photos:", error);
    alert("Failed to delete photos. Try again.");
  }
};


  if (view === "remove-photos") {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex justify-end items-center mb-2 px-2">
        <button
          onClick={toggleSelectMode}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          {isSelectMode ? "Cancel Select" : "Select"}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group aspect-square overflow-hidden"
          >
            {/* Image */}
            <img
              src={photo.url}
              alt={`Photo ${index}`}
              className="w-full h-full object-cover"
              onClick={() =>
                isSelectMode
                  ? toggleSelect(index)
                  : handleDeleteClick([index])
              }
            />

            {/* Hover overlay (desktop only) */}
            {!isSelectMode && (
              <div
                onClick={() => handleDeleteClick([index])}
                className="hidden sm:flex absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center cursor-pointer"
              >
                <Trash2 size={28} className="text-white" />
              </div>
            )}

            {/* Checkbox overlay (select mode) */}
            {isSelectMode && (
              <div
                className="absolute top-2 left-2 w-5 h-5 border-2 border-white rounded-sm flex items-center justify-center bg-black/40"
                onClick={() => toggleSelect(index)}
              >
                {selected.includes(index) && (
                  <Check size={14} className="text-white" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom delete bar (only in select mode) */}
      {isSelectMode && (
        <div className="fixed bottom-0 left-0 w-full bg-transparent shadow-lg py-3 flex justify-center  z-20">
          <button
            disabled={selected.length === 0}
            onClick={() => handleDeleteClick(selected)}
            className={`px-8 py-2 rounded-md text-white font-semibold transition ${
              selected.length === 0
                ? "!bg-gray-400 cursor-not-allowed"
                : "!bg-red-600 hover:!bg-red-700"
            }`}
          >
            Delete ({selected.length})
          </button>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-30">
          <div className="bg-white rounded-lg shadow-xl w-80 p-6 text-center">
            <Trash2 size={36} className="text-red-600 mx-auto mb-3" />
            <p className="text-gray-800 font-medium mb-4">
              {confirmModal.targets.length > 1
                ? `Are you sure you want to delete ${confirmModal.targets.length} images?`
                : "Are you sure you want to delete this image?"}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setConfirmModal({ open: false, targets: [] })}
                className="px-4 py-2 rounded-md !bg-gray-200 hover:!bg-gray-300 text-gray-700 w-1/2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md !bg-red-600 hover:!bg-red-700 text-white w-1/2 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  }

  return null;
};

export default PhotoManager;