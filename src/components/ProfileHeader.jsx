const ProfileHeader = ({ profile }) => {
  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 bg-card rounded-lg shadow-sm">
      <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-heading font-bold">{profile.name}</h2>
        <p className="text-muted-foreground">Member ID: {profile.memberId}</p>
        <p className="text-muted-foreground">{profile.email}</p>
        <p className="text-muted-foreground">Joined: {profile.joinDate}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;