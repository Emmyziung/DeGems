import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDatabaseContext } from "@/context/databaseContext";
import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
const UpdatesManager = () => {
     const{addDoc, collection, writeBatch, serverTimestamp, db, doc} = useDatabaseContext()
    const [clickedAdd, setClickedAdd] = useState(false)
    const [clickedManage, setClickedManage] = useState(false)
    const [formData, setFormData] = useState({
        heading: "",
        body:"",
       
        
      });
      const handleAddClick = () => {
        setClickedAdd(!clickedAdd)
      }
      const handleManageClick = () => {
        setClickedManage(!clickedManage)
      }
      const addUpdate = async ( heading, body ) => {
        console.log('adding update')
                   try {
             console.log('uploading update to firestore')
              await addDoc(collection(db, "updates"), {
                heading: heading,
                body: body,
              
                
                createdAt: serverTimestamp(),
                
              });
              
              console.log("Upload succesful");
            } catch (error) {
              console.error("Error uploading update:", error.message);
            }
              }
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("uploading update:", formData);
        addUpdate(formData.heading, formData.body)
        alert("Update added successfully!");
        // Reset form
        setFormData({ heading: "", body:"" });
      };

  return (
    <div className="p-4 -mt-8">   
        <h2 className=" text-2xl font-bold text-primary">Club Updates </h2>
        <p className="text-muted-foreground  mb-4">Manage and post club updates here.</p>

        <button onClick={handleAddClick} className="border-2 py-6 rounded-lg  border-blue-900  !bg-blue-700/20 text-blue-900 font-semibold flex justify-between items-center px-3 max-sm:w-full hover:!bg-blue-700/30 cursor-pointer text-lg w-90">
            <p>Upload New Update </p>
            <div className={`rounded-full w-8 h-8 border-2 border-blue-900 flex font-bold items-center justify-center transform transition-transform duration-400 ${
            clickedAdd ? "rotate-180" : ""
          }`}><IoMdAdd /></div>
            </button>
         

         {clickedAdd && <form onSubmit={handleSubmit} className="space-y-4 mt-3">
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
            Upload update
          </Button>
        </form>}

        <button onClick={handleManageClick} className="border-2 py-6 rounded-lg  border-green-900  !bg-green-700/20 text-green-900 font-semibold flex justify-between items-center px-3 max-sm:w-full hover:!bg-green-700/30 cursor-pointer text-lg w-90 mt-4">
            <p>Manage Updates </p>
            <div className={`rounded-full w-8 h-8 border-2 border-green-900 flex font-bold items-center justify-center transform transition-transform duration-400 ${
            clickedManage ? "rotate-360" : ""
          }`}><MdModeEditOutline /></div>
            </button>
    </div>
  );
}   
export default UpdatesManager;