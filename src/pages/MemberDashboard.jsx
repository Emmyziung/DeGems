import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/ProfileHeader";
import MembersTabs from "@/components/MembersTabs";
import { db } from "@/firebase";
import { auth} from "@/firebase";
  import { onAuthStateChanged } from "firebase/auth";
  import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
const MemberDashboard =  () => {
 /*  const [profileData, setProfileData] =  useState([]) */
  const {isAdmin, profileData} = useAuthContext();
 /*  useEffect(() => {
  const stopListening = onAuthStateChanged(auth, (user) => {
    if  (user)  {
     fetchUserData(user.uid)
      
    }else{
      setProfileData([])
     
    }
  });

  return () => stopListening();
}, []);
  const fetchUserData = async (uid) => {
    const userDoc = doc(db, "users", uid);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      console.log("Document data:", userSnap.data());
      setProfileData(userSnap.data());
    } else {
      setProfileData([])
    }
  }; */

  const profile = {
    name: "John Doe",
    memberId: "MEM001",
    email: "john.doe@example.com",
    joinDate: "January 15, 2023",
    avatar: null
  };

  return (
    <div className="min-h-screen bg-background">
      <div className=" mx-auto  ">
        <div className="flex flex-col justify-between bg-primary2 items-start mb-8 md:flex-row md:items-center">
         
         {/*  <h1 className="text-3xl font-heading font-bold text-primary">Member Dashboard</h1> */}
           <ProfileHeader profileData={profileData} className='' />
        
        </div>
      
        <div className="mt-8">
          <MembersTabs />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;