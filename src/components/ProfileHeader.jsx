import { Button } from "./ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileHeader = ({ profileData }) => {
  const {isAdmin} = useAuthContext();

  const { lastName, imageUrl, firstName } = profileData
  const initials = firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : "NA";
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "No Name";
  const navigate = useNavigate();
    const handleAdminDashboard = () => {
    navigate("/admin");
  };
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center w-full justify-between p-6 bg-gradient-to-br from-primary2 to-primary3 rounded-lg shadow-sm ">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="w-25 h-25 rounded-full bg-primary-foreground/90 text-primary flex items-center justify-center text-xl border-2 border-accent font-bold">
        {imageUrl ? (
          <img src={imageUrl} alt={firstName} className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 text-center text-primary-foreground sm:text-left">
        <h2 className="text-xl  font-heading font-bold"> Welcome, <span className="text-accent">{fullName}</span></h2>
        
        <p>Member ID: {fullName}</p>
        <p >{fullName}</p>
        <p >Joined: {lastName}</p>
      </div>
      </div>
          {/* <Button><Link to='/settings'><Settings/></Link></Button> */}
          {isAdmin &&   <Button onClick={handleAdminDashboard} className="bg-primary-foreground/90 text-primary text-md border border-primary hover:!bg-primary-foreground/70" size='lg' variant="outline">Admin Dashboard</Button> }
    </div>
  );
};

export default ProfileHeader;