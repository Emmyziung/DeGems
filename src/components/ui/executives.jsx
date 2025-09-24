
import { useGlobalContext } from "@/context/pageContext";
import { Button } from "./button";
const Executives = () => {


  const {memberDisplay, people} = useGlobalContext();
  return (
    <section className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-primary">
          Elected Executives
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {people.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
            >
              <div className="h-30 w-30 border-4 border-orange-400/80 shadow-2xs rounded-full bg-primary/10 text-primary grid place-items-center text-xl font-semibold">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover rounded-full"/>
                ) : (
                  p.initials
                )}
              </div>
              <p className="mt-4 font-[650] text-foreground">{p.name}</p>
              <p className="text-sm text-muted-foreground">{p.role}</p>
            </div>
          ))}
        </div>
        < Button variant='ghost' className="mt-10 !mx-auto  flex !bg-gradient-to-r !text-primary rounded-sm hover:!text-accent-foreground hover:!bg-accent/90 transition-colors shadow-sm py-5 !font-semibold text-base border-2 border-primary hover:border-accent " onClick={memberDisplay}>
          All Members
        </Button>
      </div>
    </section>
  );
};

export default Executives;