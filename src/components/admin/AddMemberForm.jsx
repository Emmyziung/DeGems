import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/cardTwo";
import { useAuthContext } from "@/context/AuthContext";
import { MdOutlineInsertPhoto } from "react-icons/md";


const AddMemberForm = () => {
  const { createUser } = useAuthContext();
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    desc: "",
    member_id: "",
    socialLinks: { twitter: "", instagram: "" },
    position: "",
  });

  const handleFileUpload = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }

    setFile({
      file: selected,
      preview: selected.type.startsWith("image/")
        ? URL.createObjectURL(selected)
        : null,
    });
  };

  const removeFile = () => {
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // handle socialLinks.*
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Ensure the file is included in the final data
    const finalData = {
      ...formData,
      photoFile: file || null,
    };

    console.log("Submitting:", finalData);

    createUser(
      formData.email,
      formData.lastName,
      formData.firstName,
      formData.lastName,
      formData.phone,
      formData.position,
      formData.gender,
      formData.desc,
      formData.member_id,
      formData.socialLinks,
      finalData.photoFile
    );

    

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      desc: "",
      member_id: "",
      socialLinks: { twitter: "", instagram: "" },
      position: "",
    });

    setFile(null);
  }
    catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member. Please try again.");
    }
  };

  return (
    <Card className="rounded shadow-sm border-b-2 border-border">
      <CardContent className="px-4 pb-6 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* FIRST NAME */}
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* GENDER RADIO */}
          <div>
            <label className="block text-sm mb-1">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* POSITION */}
          <div>
            <label className="block text-sm mb-1">Position</label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            ></textarea>
          </div>

          {/* MEMBER ID */}
          <div>
            <label className="block text-sm mb-1">Member ID</label>
            <input
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <label className="block text-sm mb-1">Twitter</label>
            <input
              name="socialLinks.twitter"
              value={formData.socialLinks.twitter}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Instagram</label>
            <input
              name="socialLinks.instagram"
              value={formData.socialLinks.instagram}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* FILE INPUT */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <MdOutlineInsertPhoto size={20} /> Choose Photo
            </label>

            <input
              type="file"
              id="file-upload"
              onChange={handleFileUpload}
              accept="image/*"
              required
              className="hidden"
            />

            <span className="text-sm text-gray-500">
              {file ? "file selected" : "No file chosen"}
            </span>
          </div>

          {file && (
            <div>
              <img src={file.preview} className="w-32 h-32 object-cover" />
              <button type="button" onClick={removeFile}>
                Remove
              </button>
            </div>
          )}

          <Button type="submit" className="w-full !bg-primary">
            Add Member
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMemberForm;
