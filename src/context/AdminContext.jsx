import  {createContext, useContext, useState, useEffect} from "react";

import { auth } from "@/firebase";

import { useDatabaseContext } from "./databaseContext";
import {  signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth"
export const AdminContext = createContext();

 const AdminContextProvider = ({children}) => {
  const { db, collection, getDocs, query, deleteDoc, doc } = useDatabaseContext();
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

     const [members, setMembers] = useState([]);

      useEffect(() => {
        console.log("Fetching members...");
        const fetchMembers = async () => {
          // Check cache first
          const cachedMembers = getCachedData('members');
          if (cachedMembers) {
            setMembers(cachedMembers);
            console.log("Members loaded from cache:", cachedMembers);
            return;
          }

          try {
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);

            const fetchedMembers = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(), // ✅ this was the main issue
            }));

            setMembers(fetchedMembers);
            setCachedData('members', fetchedMembers);
            console.log("✅ Members fetched from server:", fetchedMembers);
          } catch (error) {
            console.error("❌ Error fetching members:", error);
          }
        };

        fetchMembers();
      }, []);
      
const [applications, setApplications] = useState([]);
useEffect(() => {
  
  const fetchApplications = async () => {
    console.log("lalalao")
    try {
      const q = query(collection(db, "applications"));
      const querySnapshot = await getDocs(q);
      const fetchedApplications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(fetchedApplications);
      console.log("Applications fetched:", fetchedApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  fetchApplications();
}, []);

const deleteApplication = async (id) => {
    try {
      await deleteDoc(doc(db, "applications", id));
      setApplications((prev) => prev.filter((app) => app.id !== id));
      console.log("Application deleted:", id);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  

          // Cache invalidation functions
          const invalidateMemberCache = (type) => {
            clearCache(type);
        if (type === 'members') {
              // Refetch members
              const fetchMembers = async () => {
                try {
                  const q = query(collection(db, "users"));
                  const querySnapshot = await getDocs(q);
                  const fetchedMembers = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }));
                  setMembers(fetchedMembers);
                  setCachedData('members', fetchedMembers);
                } catch (error) {
                  console.error("Error refetching members:", error);
                }
              };
              fetchMembers();
            }
          };
          console.log('members in admin dashboard:', members)
  
    return (
        <AdminContext.Provider value={{members, applications, invalidateMemberCache, clearCache, deleteApplication
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdminContext = () => useContext(AdminContext);

export default AdminContextProvider;
