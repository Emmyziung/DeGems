import backgroundImg from "@/img/23682.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
const Hero = () => {
  const {currentUser} =useAuthContext()
  return (
    <section
      className="relative  sm:min-h-[90vh]  min-h-[80vh]"
      
    >
      <div className="absolute bottom-0 left-0 w-full bg-cover bg-center min-h-[80vh] sm:min-h-[90vh] max-sm:min-h-[50vh] max-sm:max-h-[50vh]" style={{backgroundImage : `url(${backgroundImg})`}}/>
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="absolute z-10 max-w-2xl lg:max-w-3xl  px-6 lg:px-12 h-full flex flex-col justify-around sm:justify-center items-start  gap-6 inset-0">
        <div></div>
        <div className="mx-auto font-heading drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white mb-4">
          Welcome to <span className="text-accent whitespace-nowrap !drop-shadow-none">De GEMS</span> Exclusive Club
        </h1>
        <p className="text-white/90 text-base mt-2 sm:text-lg lg:text-xl">of Iperu Remo</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto  ">

          {currentUser ? (<Link  to="/member-dashboard">
          <Button size="lg" className="!bg-blue-950/80 w-full sm:w-auto hover:text-white hover:!bg-blue-950/70 text-white !border-2 !border-white text-[14px] sm:text-base !font-bold">
                    
           Dashboard
          </Button>
          </Link> ) : (<Link  to="/signin">
          <Button size="lg" className="!bg-blue-950/80 w-full sm:w-auto hover:text-white hover:!bg-blue-950/70 text-white !border-2 !border-white text-[14px] sm:text-base !font-bold">
                    
           Sign In
          </Button>
          </Link> ) }
          
          <Link to="/About"  >
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto !bg-white/10 !text-white !border-2 !border-white hover:!bg-white/20 text-[14px] sm:text-base !font-bold"
          >
           Learn More 
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;