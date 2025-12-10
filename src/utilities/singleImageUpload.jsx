 const uploadSingleImageToCloudinary = async (file) => {
  if (!file) throw new Error("No file provided");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file.file);   // because your file object is { file, preview }
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  // Add auto-compression
  const optimizedUrl = data.secure_url.replace(
    "/upload/",
    "/upload/q_auto,f_auto/"
  );

  return optimizedUrl; // returns a STRING, not array
};

export default uploadSingleImageToCloudinary;
