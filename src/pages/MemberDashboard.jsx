import ProfileHeader from "@/components/ProfileHeader";
import MembersTabs from "@/components/MembersTabs";

const MemberDashboard = () => {
  const profile = {
    name: "John Doe",
    memberId: "MEM001",
    email: "john.doe@example.com",
    joinDate: "January 15, 2023",
    avatar: null
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-heading font-bold text-primary mb-8">Member Dashboard</h1>
        <ProfileHeader profile={profile} />
        <div className="mt-8">
          <MembersTabs />
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;