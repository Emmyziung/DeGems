import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useDatabaseContext } from "@/context/databaseContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const ViewActivitiesList = () => {
  const {
    activities,
    setActivities,
    doc,
    deleteDoc,
    db,
    query,
    where,
    writeBatch,
    collection,
    getDocs,
  } = useDatabaseContext();

  const [confirmModal, setConfirmModal] = useState({ open: false, id: null });

  const handleDeleteClick = (id) => {
    setConfirmModal({ open: true, id });
  };

  const handleEdit = (id) => {
    console.log("Edit activity:", id);
    alert(`Edit activity ${id}`);
  };

  const handleDelete = async () => {
    const id = confirmModal.id;
    if (!id) return;

    // Delete the activity itself
    await deleteDoc(doc(db, "activities", id));

    // Delete all related photo docs
    const q = query(collection(db, "photos"), where("activityId", "==", id));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const batch = writeBatch(db);
      snapshot.forEach((photoDoc) => batch.delete(photoDoc.ref));
      await batch.commit();
      console.log("Images deleted");
    }

    // Update local state
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
    setConfirmModal({ open: false, id: null });
    console.log("Deleted activity:", id);
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const maxLength = 100;
        const shortDescription =
          activity.description.length > maxLength
            ? activity.description.slice(0, maxLength) + "..."
            : activity.description;

        return (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 border border-border rounded-md bg-muted/50"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                {activity.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {shortDescription}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Date: {activity.date}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleEdit(activity.id)}
                className="p-2 text-muted-foreground/80 hover:text-muted-foreground transition-colors !bg-transparent"
                title="Edit"
              >
                <MdModeEditOutline size={25} />
              </button>
              <button
                onClick={() => handleDeleteClick(activity.id)}
                className="p-2 text-muted-foreground/80 hover:text-red-500 transition-colors !bg-transparent"
                title="Delete"
              >
                <FaTrashAlt size={25} />
              </button>
            </div>
          </div>
        );
      })}

      {/* MODAL OUTSIDE THE MAP */}
      {confirmModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-30">
          <div className="bg-white rounded-lg shadow-xl w-80 p-6 text-center">
            <Trash2 size={36} className="text-red-600 mx-auto mb-3" />
            <p className="text-gray-800 font-medium mb-4">
              Are you sure you want to delete this Activity?
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setConfirmModal({ open: false, id: null })}
                className="px-4 py-2 rounded-md !bg-gray-200 hover:!bg-gray-300 text-gray-700 w-1/2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
};

export default ViewActivitiesList;
