import { useState } from "react";
import { deleteDoc } from "firebase/firestore";
import UpdateEdit from "../ui/updateEdit";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useDatabaseContext } from "@/context/databaseContext";
import { Trash2 } from "lucide-react";
import { useMemberContext } from "@/context/MemberContext";
import { IoMdAdd } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
const UpdatesManager = () => {
  const{invalidateCache, updates} = useMemberContext()
     const{addDoc, collection, writeBatch, serverTimestamp, db, doc} = useDatabaseContext()
     const [confirmModal, setConfirmModal] =useState(false);             
    const [clickedAdd, setClickedAdd] = useState(false)
    const [clickedManage, setClickedManage] = useState(false)
    const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

   const handleEditClick = (update) => {
    setSelectedUpdate(update);
    setIsModalOpen(true);
  };
  const handleCancelDelete = () => {
    setConfirmModal(false);
    setSelectedUpdate(null);
  };
  const handleDeleteClick = (update) => {
    setConfirmModal(true);
    setSelectedUpdate(update)
    console.log(update.id);
    
  };
  const handleDelete = async (id) => {
    // Delete the update itself
    await deleteDoc(doc(db, "updates", id));
    await invalidateCache();
    console.log("Deleted update:", id);

    setConfirmModal(false);
    setSelectedUpdate(null);
  };                

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedUpdate(null);
      setIsClosing(false);
    }, 300);
  };
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
              await invalidateCache();

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

            {clickedManage &&  updates.map((update) => {
                    const maxLength = 100;
                    const shortBody =
                      update.body.length > maxLength
                        ? update.body.slice(0, maxLength) + "..."
                        : update.body;
            
                    return (
                      <div
                        key={update.id}
                        className="flex items-center mt-3 justify-between p-4 border border-border rounded-md bg-muted/50"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {update.heading}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {shortBody}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                             {update.createdAt
              ? new Date(update.createdAt.seconds * 1000).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })

              : ""}
                          </p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEditClick(update)}
                            className="p-2 text-muted-foreground/80 hover:text-muted-foreground transition-colors !bg-transparent"
                            title="Edit"
                          >
                            <MdModeEditOutline size={25} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(update)}
                            className="p-2 text-muted-foreground/80 hover:text-red-500 transition-colors !bg-transparent"
                            title="Delete"
                          >
                            <FaTrashAlt size={25} />
                          </button>
                        </div>
                      </div>
                    );
                  }) }


            {isModalOpen && selectedUpdate && <UpdateEdit update={selectedUpdate} closeModal={closeModal} isClosing={isClosing} handleChange={handleChange} invalidateCache={invalidateCache} />}
       {confirmModal && selectedUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-30">
          <div className="bg-white rounded-lg shadow-xl w-80 p-6 text-center">
            <Trash2 size={36} className="text-red-600 mx-auto mb-3" />
            <p className="text-gray-800 font-medium mb-4">
              Are you sure you want to delete this Update?
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 rounded-md !bg-gray-200 hover:!bg-gray-300 text-gray-700 w-1/2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {handleDelete(selectedUpdate.id)}}
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
export default UpdatesManager;