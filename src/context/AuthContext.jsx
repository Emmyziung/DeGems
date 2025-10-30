import  {createContext, useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
  import { doc, getDoc } from "firebase/firestore";
import { useDatabaseContext } from "./databaseContext";
import {  signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth"
export const AuthContext = createContext();

 const AuthContextProvider = ({children}) => {
  const {db, doc, setDoc} = useDatabaseContext()
    const [profileData, setProfileData] =  useState([])
  const navigate = useNavigate();
      const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user'))|| null);
        const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('isAdmin'))||null);


    const createUser = async(email, password, firstName, lastName, phone, role) => {
      try {
        let checkedPass
        if (password.length<6){
          checkedPass= password+'00000'
          checkedPass = checkedPass.slice(0,6)
        } else{
          checkedPass = password
        }
      const userCredential = await createUserWithEmailAndPassword(auth, email, checkedPass)
      
       const user = userCredential.user
     
       storeNewUser(user.uid, firstName, lastName, email,  phone, role)
       console.log('user created')
      } catch (error) {
        console.log(error)
      }
    }

        const storeNewUser = async (id, firstName, lastName, email,  phone, role) => {
             try {
       
        await setDoc(doc(db, "users", id ), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          role: role,
        });
        
        console.log("User saved successfully with ID:", id);
      } catch (error) {
        console.error("Error saving user:", error.message);
      }
        }

useEffect(() => {
  localStorage.setItem('user', JSON.stringify(currentUser));
}, [currentUser]);

useEffect(() => {
  localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
}, [isAdmin]);
    const handleSignIn = async (e) => {
        const formData = new FormData(e.target)
        const email = formData.get("email")
        const password = formData.get("password")
        try {
     const userCredentials= await signInWithEmailAndPassword(auth, email, password)
     setCurrentUser(userCredentials.user)
          console.log('logged')
          navigate("/member-dashboard");
        } catch (error) {
          alert(error.message)
        }
  
    };

    useEffect (() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const tokenResult = await user.getIdTokenResult(true);
             setCurrentUser(user)
          tokenResult.claims.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false );
            
        fetchUserData(user.uid)
   
        }
        else {
          setCurrentUser(null)
          setIsAdmin(false);
            setProfileData([])
          
        }
      });
      return () => unsubscribe();
    }, [])
      const fetchUserData = async (uid) => {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          console.log("Document data:", userSnap.data());
          setProfileData(userSnap.data());
        } else {
          setProfileData([])
        }
      };


    return (
        <AuthContext.Provider value={{auth,
        currentUser, setCurrentUser,isAdmin, createUser ,handleSignIn, profileData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
