import { Button } from "./ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
const ProfileHeader = ({ profileData }) => {
  const {isAdmin} = useAuthContext();

  const { lastName, img, firstName } = profileData
  const initials = firstName && lastName ? `${firstName.charAt(0)}${lastName.charAt(0)}` : "NA";
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : "No Name";
  const navigate = useNavigate();
    const handleAdminDashboard = () => {
    navigate("/admin");
  };
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 bg-card rounded-lg shadow-sm">
      <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
        {img ? (
          <img src={img} alt={firstName} className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 text-center  md:text-left">
        <h2 className="text-xl font-heading font-bold">{fullName}</h2>
        
        <p className="text-muted-foreground">Member ID: {fullName}</p>
        <p className="text-muted-foreground">{fullName}</p>
        <p className="text-muted-foreground">Joined: {lastName}</p>
      </div>
          {isAdmin &&   <Button onClick={handleAdminDashboard} variant="outline">Admin Dashboard</Button> }
    </div>
  );
};

export default ProfileHeader;