const Executives = () => {
  const people = [
    { name: "John Doe", role: "President", initials: "JD" },
    { name: "Jane Smith", role: "Vice President", initials: "JS" },
    { name: "Alex Johnson", role: "Secretary", initials: "AJ" },
    { name: "Chris Lee", role: "Treasurer", initials: "CL" },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-tight text-primary">
          Elected Executives
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {people.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
            >
              <div className="h-20 w-20 rounded-full bg-primary/10 text-primary grid place-items-center text-xl font-semibold">
                {p.initials}
              </div>
              <p className="mt-4 font-medium text-foreground">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Executives;