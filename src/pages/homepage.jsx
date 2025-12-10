
import Hero from "@/components/ui/hero";
import Executives from "@/components/ui/executives";
import Activities from "@/components/ui/activities";
import Member from "@/components/ui/member";
import AboutSnippet from "@/components/ui/aboutSnippet";
import MemberDirectorySnippet from "@/components/ui/memberDirectorySnippet";
import ConnectWithUs from "@/components/ui/connectWIthUs";

import { useGlobalContext } from "@/context/pageContext";
import  Modal  from "@/components/ui/modal";
const Homepage = () => {
    const {showMembers} = useGlobalContext();
    return (
    <div className="bg-background font-body">
      
      <Hero />
      <Executives />
      <div className="grid gap-1 grid-cols-1 md:grid-cols-2 ">
        <div >
          <AboutSnippet />
      <ConnectWithUs />
        </div>
        <MemberDirectorySnippet/>
      </div>
      
      
      <Activities />
      
      {showMembers && <Modal />}
      <Member />
     
    </div>
  );
};
export default Homepage;