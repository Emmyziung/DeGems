import  {createContext, useContext, useState, useEffect} from "react";
import {createClient} from '@supabase/supabase-js'
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import Error from "@/components/ui/error";
  import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useDatabaseContext } from "./databaseContext";
import { useGlobalContext } from "./pageContext";
import {  signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth"
export const AuthContext = createContext();
import uploadImagesToCloudinary from "@/utilities/cloudinaryUpload";
import uploadSingleImageToCloudinary from "@/utilities/singleImageUpload";

 const AuthContextProvider = ({children}) => {
  const {setErrorMessage, setErrorDisplay} = useGlobalContext()
  const {db, doc, setDoc} = useDatabaseContext()
    const [profileData, setProfileData] =  useState([])
  const navigate = useNavigate();

      const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user'))|| null);
        const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('isAdmin'))||null);
        const [signinLoad, setSigninLoad] = useState(false)

    const createUser = async(email, password, firstName, lastName, phone, position, gender, desc, member_id, socialLinks, file ) => {
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
       console.log('starting upload')
         const imageUrl = await uploadSingleImageToCloudinary(file);
         console.log(imageUrl)
         console.log('starting to store user')
       await storeNewUser(user.uid, firstName, lastName, email,  phone, position, gender, desc, member_id, socialLinks, imageUrl || null);
       console.log('user created')
      } catch (error) {
          if (error.code === "auth/email-already-in-use") {
    console.warn("This email is already registered.");
  } else {
    console.error("Unexpected error:", error);
  }
      }
    }

        const storeNewUser = async (id, firstName, lastName, email,  phone, position, gender, desc, member_id, socialLinks, imageUrl ) => {
             try {
       
        await setDoc(doc(db, "users", id ), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          position: position,
          gender: gender,
          desc: desc,
          member_id: member_id,
          socialLinks: socialLinks,
          imageUrl: imageUrl,
          createdAt: serverTimestamp(),
          
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
        setSigninLoad(true)
        try {
     const userCredentials= await signInWithEmailAndPassword(auth, email, password)
     setCurrentUser(userCredentials.user)
          console.log('logged')
          navigate("/member-dashboard");
        } catch (error) {
          setErrorDisplay(true)
         setErrorMessage(error.message)
       
        }finally{
          setSigninLoad(false)
        }
  
    };

    useEffect (() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const tokenResult = await user.getIdTokenResult(true);
           // console.log(tokenResult.claims)
             setCurrentUser(user)
          tokenResult.claims.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false );
              const token = await user.getIdToken(); // Firebase ID token
           //   console.log('token', token)
 
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
          console.log(profileData)
        } else {
          setProfileData([])
        }
      };


    return (
        <AuthContext.Provider value={{auth,
        currentUser, setCurrentUser,isAdmin, createUser ,handleSignIn, signinLoad, profileData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
