import { Link } from "react-router-dom";
const AboutSnippet = () => {
  return (
    <section className=" pb-10 md:pb-12" >

      <div className="md:w-1/2 md:mx-0 md:ml-8 mx-auto px-6 md:h-">
        <div className="rounded-xl border-2 border-border bg-card shadow-md shadow-accent/20 hover:shadow-lg transition-shadow flex flex-col items-center pt-3 pb-4 px-4">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-primary mb-1">
          About Us
        </h2>
          <p className="leading-relaxed max-md:text-sm ">
                The journey of De Gems Exclusive Club of Iperu-Remo began with a simple yet powerful idea: to create a social platform that would reconnect old friends, foster meaningful relationships, and promote personal and communal growth. This idea was initially conceived and reviewed by two dedicated and like-minded individuals, and soon gained momentum as more like-minded individuals bought into the vision. <span><Link to="/About">
    
          Read More &gt;&gt;&gt;
      
        </Link></span>
              </p>

   
</div>
       
        
      </div>
    </section>
  );
};

export default AboutSnippet;