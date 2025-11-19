import { useMemberContext } from "@/context/MemberContext";

const ClubUpdates = () => {
  const { updates } = useMemberContext();
   

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div key={update.id} className="p-4 bg-card rounded-lg shadow-sm">
          <h3 className="font-heading font-semibold">{update.heading}</h3>
          <p className="text-sm text-muted-foreground">{update.createdAt
              ? new Date(update.createdAt.seconds * 1000).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })

              : ""}</p>
          <p className="mt-2 text-wrap w-full overflow-x-hidden">{update.body}</p>
          <button className="mt-2 text-primary hover:underline text-sm">View More</button>
        </div>
      ))}
    </div>
  );
};

export default ClubUpdates;