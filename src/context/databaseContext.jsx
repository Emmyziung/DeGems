import { useState, useEffect, use } from "react";
import { createContext, useContext } from "react";
import { db } from "../firebase";
import { useAuthContext } from "./AuthContext";
import { collection, getDocs, addDoc, setDoc, doc, query, where, orderBy, limit, arrayRemove, serverTimestamp, writeBatch, deleteDoc } from "firebase/firestore";



export const DatabaseContext = createContext();
const DatabaseProvider = ({ children }) => {
  // Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache utility functions
const getCacheKey = (type) => `degems_cache_${type}`;
const getCacheTimestampKey = (type) => `degems_cache_${type}_timestamp`;

const getCachedData = (type) => {
  try {
    const timestamp = localStorage.getItem(getCacheTimestampKey(type));
    if (!timestamp) return null;

    const now = Date.now();
    if (now - parseInt(timestamp) > CACHE_DURATION) {
      // Cache expired, remove it
      localStorage.removeItem(getCacheKey(type));
      localStorage.removeItem(getCacheTimestampKey(type));
      return null;
    }

    const data = localStorage.getItem(getCacheKey(type));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading cache for ${type}:`, error);
    return null;
  }
};

const setCachedData = (type, data) => {
  try {
    localStorage.setItem(getCacheKey(type), JSON.stringify(data));
    localStorage.setItem(getCacheTimestampKey(type), Date.now().toString());
  } catch (error) {
    console.error(`Error setting cache for ${type}:`, error);
  }
};

const clearCache = (type) => {
  try {
    localStorage.removeItem(getCacheKey(type));
    localStorage.removeItem(getCacheTimestampKey(type));
  } catch (error) {
    console.error(`Error clearing cache for ${type}:`, error);
  }
};
       const [activities, setActivities] = useState([]);

     useEffect(() => {
       const fetchActivities = async () => {
         // Check cache first
         const cachedActivities = getCachedData('activities');
         if (cachedActivities) {
           setActivities(cachedActivities);
           console.log("Activities loaded from cache:", cachedActivities);
           return;
         }

         try {
           const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));
           const querySnapshot = await getDocs(q);

           const fetchedActivities = querySnapshot.docs.map((doc) => ({
             id: doc.id,
             ...doc.data(),
           }));

           setActivities(fetchedActivities);
           setCachedData('activities', fetchedActivities);
           console.log("Activities fetched from server:", fetchedActivities);
         } catch (error) {
           console.error("Error fetching activities:", error);
         }
       };

       fetchActivities();
     }, []);


    const [photos, setPhotos] = useState([]);

useEffect(() => {
  const fetchPhotos = async () => {
    // Check cache first
    const cachedPhotos = getCachedData('photos');
    if (cachedPhotos) {
      setPhotos(cachedPhotos);
      console.log("Photos loaded from cache:", cachedPhotos);
      return;
    }

    try {
      const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPhotos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPhotos(fetchedPhotos);
      setCachedData('photos', fetchedPhotos);
      console.log("Photos fetched from server:", fetchedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  fetchPhotos();
}, []);

   
    // Cache invalidation functions
    const invalidateCache = (type) => {
      clearCache(type);
      if (type === 'activities') {
        // Refetch activities
        const fetchActivities = async () => {
          try {
            const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetchedActivities = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setActivities(fetchedActivities);
            setCachedData('activities', fetchedActivities);
          } catch (error) {
            console.error("Error refetching activities:", error);
          }
        };
        fetchActivities();
      } else if (type === 'photos') {
        // Refetch photos
        const fetchPhotos = async () => {
          try {
            const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetchedPhotos = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPhotos(fetchedPhotos);
            setCachedData('photos', fetchedPhotos);
          } catch (error) {
            console.error("Error refetching photos:", error);
          }
        };
        fetchPhotos();
      } 
    };

    const invalidateAllCache = () => {
      clearCache('activities');
      clearCache('photos');
      
      // Trigger refetch by reloading the page or calling fetch functions
      window.location.reload();
    };

    return (
        <DatabaseContext.Provider value={{
          db, setDoc, doc, collection, query, addDoc, serverTimestamp, writeBatch, getDocs, where, orderBy, limit,
          activities, setActivities,
          
          photos, setPhotos,
          deleteDoc, arrayRemove,
          invalidateCache, invalidateAllCache
        }}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabaseContext = () => useContext(DatabaseContext);

export default DatabaseProvider;