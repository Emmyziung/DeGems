
import Hero from "@/components/ui/hero";
import Executives from "@/components/ui/executives";
import Activities from "@/components/ui/activities";
import Member from "@/components/ui/member";

import { useGlobalContext } from "@/context/pageContext";
import  Modal  from "@/components/ui/modal";
const Homepage = () => {
    const {showMembers} = useGlobalContext();
    return (
    <div className="bg-background font-body">
      
      <Hero />
      <Executives />
      <Activities />
      {showMembers && <Modal />}
      <Member />
     
    </div>
  );
};
export default Homepage;