import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { X } from "lucide-react";
import { useDatabaseContext } from "@/context/databaseContext";
import uploadImagesToCloudinary from "@/utilities/cloudinaryUpload";

const AddActivityForm = () => {
  const{addDoc, collection, writeBatch, serverTimestamp, db, doc} = useDatabaseContext()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
   const [files, setFiles] = useState([]);
   const [loading, setLoading] = useState(false)
  const handleFileUpload = (e) => {
  const selectedFiles = Array.from(e.target.files);
    const mapped = selectedFiles.map((file) => ({
      file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));
    console.log(mapped)
    // Append new files to existing ones
    setFiles((prev) => [...prev, ...mapped]);
    console.log(files)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    // Step 1: Upload images to Cloudinary
   const imageUrls = await uploadImagesToCloudinary(files);

    // Step 2: Create the activity doc
    const activityRef = await addDoc(collection(db, "activities"), {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      img: imageUrls, // store array of urls
      createdAt: serverTimestamp(),
    });

    // Step 3: Batch write photo docs
    
    const batch = writeBatch(db);
    imageUrls.forEach((url) => {
      const photoDocRef = doc(collection(db, "photos"));
      batch.set(photoDocRef, {
        url,
        activityId: activityRef.id,
        createdAt: serverTimestamp(),
      });
    });

    await batch.commit(); // all photo docs created in one request


    // Step 4: Reset UI state
    setFiles([]);
    setFormData({ title: "", description: "", location: "", date: "" });

    alert("Activity and photos added successfully!");
  } catch (error) {
    console.error("Error submitting activity:", error);
    alert("Upload failed. Try again.");
  }
  setLoading(false)
};

  return (
    <Card className='rounded shadow-sm border-b-2 border-border'>
    
       
      <CardContent className='px-4 pb-6 pt-2'>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-muted-foreground text-sm font-medium mb-1">
              Activity Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-muted-foreground text-sm font-medium mb-1">
              Location
            </label>
            <textarea
              id="location"
              name="location"
              rows="1"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-muted-foreground text-sm font-medium mb-1">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
           
            />
          </div>
        <div className="">
      {/* File input */}
      <div className="flex items-center space-x-4 mb-4">
          <label
          htmlFor="file-upload"
          className="cursor-pointer bg-primary/90 text-white px-4 py-2 rounded-lg flex  items-center gap-2 hover:bg-primary transition duration-200"
        >
          <MdOutlineInsertPhoto size={20} color="white"/> Choose Photos
        </label>
        <input
          type="file"
          name='file-upload'
          id="file-upload"
          multiple
          className="w-0.5 h-0.5"
          onChange={handleFileUpload}
          accept="image/*"
          required
        />
      
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
           {loading?<Button className='w-full !bg-primary'>
                                                    <div className="loading-spinner "></div>
                                      <span >Adding Activity...</span>
                      </Button>:<Button type="submit" className="w-full !bg-primary">
            Add Activity
          </Button>}
        </form>
      </CardContent>
    </Card>
  );
};

export default AddActivityForm;