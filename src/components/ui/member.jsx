import { IoDiamond } from "react-icons/io5";
import { Button } from "./button";
import { Link } from "react-router-dom";
const Member = () => {
  return (
    <section className="relative mt-6 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/95">
      <div
        className="absolute -right-8 top-1/3 h-40 w-40 opacity-40 text-accent"
        aria-hidden="true"
      >
        <IoDiamond className="w-full h-full rotate-[10deg]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-primary-foreground drop-shadow">
          Become a Member Today
        </h3>
        <p className="mt-3 text-sm md:text-base text-primary-foreground/90">
          Join our exclusive club and unlock a world of benefits, networking opportunities, and
          unforgettable experiences!
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/members">
          <Button
             variant="outline"
            size="lg"
            className="w-auto !bg-white/10 !text-white !border-2 !border-white hover:!bg-white/20 text-[14px] sm:text-base !font-bold"
          >
            Join Now
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Member;