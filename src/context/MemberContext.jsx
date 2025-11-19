import  {createContext, useContext, useState, useEffect} from "react";


import { useDatabaseContext } from "./databaseContext";

export const MemberContext = createContext();

 const MemberContextProvider = ({children}) => {
    const { db, collection, getDocs, query, getCachedData, setCachedData, clearCache } = useDatabaseContext();
    const [updates, setUpdates] = useState([]);

    const fetchUpdates = async () => {

         // Check cache first
         const cachedUpdates = getCachedData('updates');
         if (cachedUpdates) {
           setUpdates(cachedUpdates);
           console.log("Updates loaded from cache:", cachedUpdates);
           return;
         }

      try {
        const updatesCollection = collection(db, "updates");
        const updatesQuery = query(updatesCollection);
        const querySnapshot = await getDocs(updatesQuery);
        const updatesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpdates(updatesList);
        setCachedData('updates', updatesList);
        console.log("Updates fetched:", updatesList);

      } catch (error) {
        console.error("Error fetching updates:", error);
      }

 }
    useEffect(() => {
      fetchUpdates();
    }, []);

    const invalidateCache = async () => {
        clearCache('updates');
        await fetchUpdates();
    };
    return (
        <MemberContext.Provider value={{updates, invalidateCache}}>
            {children}
        </MemberContext.Provider>
    );
 }  


 export const useMemberContext = () => useContext(MemberContext);

 export default MemberContextProvider;