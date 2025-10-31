import { Link } from "react-router-dom";
const AboutSnippet = () => {
  return (
    <section className=" pb-10 md:pb-12" >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-primary">
          About Us
        </h2>
          <p className="leading-relaxed">
                The journey of De Gems Exclusive Club of Iperu-Remo began with a simple yet powerful idea: to create a social platform that would reconnect old friends, foster meaningful relationships, and promote personal and communal growth. This idea was initially conceived and reviewed by two dedicated and like-minded individuals, and soon gained momentum as more like-minded individuals bought into the vision. <span><Link to="/About">
    
          Read More &gt;&gt;&gt;
      
        </Link></span>
              </p>

   

       
        
      </div>
    </section>
  );
};

export default AboutSnippet;