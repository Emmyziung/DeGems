import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { db } from "../firebase";
import { useAuthContext } from "./AuthContext";
import { collection, getDocs, addDoc, setDoc, doc, query, where, orderBy, limit, arrayRemove, serverTimestamp, writeBatch, deleteDoc, startAfter } from "firebase/firestore";



export const DatabaseContext = createContext();
const DatabaseProvider = ({ children }) => {
  // Cache configuration
const CACHE_DURATION = 15 * 60 * 1000; // 5 minutes in milliseconds

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
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 20;

  const fetchPhotos = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, "photos"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );

      if (!reset && lastDoc) q = query(q, startAfter(lastDoc));

      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(newLastDoc || null);

   setPhotos(prev => {
  const updated = reset ? fetched : [...prev, ...fetched];
  
  return updated;
});
      console.log("Photos fetched:", fetched.length, "photos");

      if (fetched.length < PAGE_SIZE){
        setHasMore(false)
      }
    } catch (err) {
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  }, [lastDoc]);

  // Initial load + cache
  useEffect(() => {
  const cached = getCachedData("photos");
  if (cached) {
    setPhotos(cached);
  } else {
    fetchPhotos(true);
  }
}, []);

   
   const invalidateCache = async (type) => {
  clearCache(type);

  if (type === "photos") {
    // Reset pagination
    setPhotos([]);
    setLastDoc(null);
    setHasMore(true);
    await fetchPhotos(true);
  }

  if (type === "activities") {
    try {
      const q = query(collection(db, "activities"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedActivities = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCachedData("activities", fetchedActivities);
      setActivities(fetchedActivities); // Assuming you have activities state
    } catch (error) {
      console.error("Error refetching activities:", error);
    }
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
          
          photos, setPhotos, hasMore, fetchPhotos, loading,
          deleteDoc, arrayRemove,
          invalidateCache, invalidateAllCache
        }}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabaseContext = () => useContext(DatabaseContext);

export default DatabaseProvider;