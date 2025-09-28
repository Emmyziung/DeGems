const ClubUpdates = () => {
  const updates = [
    {
      title: "New Community Project",
      date: "September 20, 2024",
      description: "We're launching a new initiative to support local schools with educational resources and mentorship programs."
    },
    {
      title: "Annual Gala Planning",
      date: "September 15, 2024",
      description: "Planning for our annual charity gala is underway. Volunteers needed for event coordination and fundraising."
    },
    {
      title: "Membership Drive Success",
      date: "September 10, 2024",
      description: "Our recent membership drive has been a great success! Welcome to all our new members joining the community."
    },
    {
      title: "Workshop Series",
      date: "September 5, 2024",
      description: "A new series of professional development workshops will begin next month. Topics include leadership and networking."
    }
  ];

  return (
    <div className="space-y-4">
      {updates.map((update, index) => (
        <div key={index} className="p-4 bg-card rounded-lg shadow-sm">
          <h3 className="font-heading font-semibold">{update.title}</h3>
          <p className="text-sm text-muted-foreground">{update.date}</p>
          <p className="mt-2">{update.description}</p>
          <button className="mt-2 text-primary hover:underline text-sm">View More</button>
        </div>
      ))}
    </div>
  );
};

export default ClubUpdates;