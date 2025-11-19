import { Button } from "./button";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { useDatabaseContext } from "@/context/databaseContext";
const UpdateEdit =  ({update, invalidateCache, closeModal, isClosing}) =>{
    const {updateEdit} = useDatabaseContext();
    const [formData, setFormData] = useState({
        heading: update ? update.heading : "",
        body: update ? update.body : "",

        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      }    
        const handleSubmit = async (e) => {
        e.preventDefault();
        const { heading, body } = formData;
        if (heading === update.heading && body === update.body) {
          alert("No changes made.");
          return;
        }
        try {
          updateEdit(update.id, heading, body);
            alert("Update edited successfully!");
            invalidateCache();
          
        } catch (error) {
          console.error(error);
          alert("Failed to submit update.");
        }
        
        }
    return (
        <aside className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
          <div className={`modal-container bg-white overflow-y-auto ${isClosing ? 'closing' : ''}`}>
            <div className="pt-3 px-3 flex bg-white sticky top-0 z-50 justify-start">
              <button className="!bg-white p-2 border-3  border-gray-600 text-gray-600 hover:border-gray-900 hover:text-gray-900 rounded-full" onClick={closeModal}>
                <FaArrowLeft className="h-6 w-6 bg-white  " />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-3 px-3">
          <div>
            <label htmlFor="heading" className="block text-muted-foreground text-sm font-medium mb-1">
              Heading
            </label>
            <input
              id="heading"
              name="heading"
              type="text"
              value={formData.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
              
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-muted-foreground text-sm font-medium mb-1">
              Body 
            </label>
            <textarea
              id="body"
              name="body"
              type="text"
              rows="10"
              value={formData.body}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
    
          <Button type="submit" className="w-full !bg-primary">
            Upload Edit
          </Button>
        </form>
            
          </div>
        </aside>
    )
}

export default UpdateEdit;