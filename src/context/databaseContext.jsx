import { useState, useEffect, use } from "react";
import { createContext, useContext } from "react";
import { db } from "../firebase";
import { useAuthContext } from "./AuthContext";
import { collection, getDocs, addDoc, setDoc, doc, query, where, orderBy, limit, arrayRemove, serverTimestamp, writeBatch, deleteDoc } from "firebase/firestore";

export const DatabaseContext = createContext();
const DatabaseProvider = ({ children }) => {
      const [activities, setActivities] = useState([]);
  
    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
  
          const fetchedActivities = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(), 
          }));
  
          setActivities(fetchedActivities);
          console.log(" Activities fetched:", fetchedActivities);
        } catch (error) {
          console.error(" Error fetching activities:", error);
        }
      };
  
      fetchActivities();
    }, []);


    const [photos, setPhotos] = useState([]);

useEffect(() => {
  const fetchPhotos = async () => {
    try {
      const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPhotos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPhotos(fetchedPhotos);
      console.log("Photos fetched:", fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  fetchPhotos();
}, []);
      const [members, setMembers] = useState([]);
    
      useEffect(() => {
        const fetchMembers = async () => {
          try {
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);
    
            const fetchedMembers = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), // ✅ this was the main issue
            }));
    
            setMembers(fetchedMembers);
            console.log("✅ Members fetched:", fetchedMembers);
          } catch (error) {
            console.error("❌ Error fetching members:", error);
          }
        };
    
        fetchMembers();
      }, [db, collection, getDocs, query]);
  
   
    return (
        <DatabaseContext.Provider value={{ db, setDoc, doc, collection,query,addDoc,serverTimestamp, writeBatch,getDocs, where , orderBy, limit, activities, setActivities, members, photos, deleteDoc, arrayRemove, setPhotos}}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabaseContext = () => useContext(DatabaseContext);

export default DatabaseProvider;