const uploadImagesToCloudinary = async (files) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadedUrls = [];

  for (const item of files) {
    const formData = new FormData();
    formData.append("file", item.file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    // add transformation to auto-compress
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
    uploadedUrls.push(optimizedUrl);
  }

  return uploadedUrls;
};


export default uploadImagesToCloudinary