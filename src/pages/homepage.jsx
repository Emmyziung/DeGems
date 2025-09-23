import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import Executives from "@/components/ui/executives";
import Activities from "@/components/ui/activities";
import Member from "@/components/ui/member";
import Footer from "@/components/ui/footer"

const Homepage = () => {
    return (
    <div className="bg-background font-body">
      <Header />
      <Hero />
      <Executives />
      <Activities />
      <Member />
      <Footer />
    </div>
  );
};
export default Homepage;