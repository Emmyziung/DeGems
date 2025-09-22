export default function Socials () {
  return (
    <section className="max-w-xl mx-auto my-8 p-4 bg-slate-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Latest from our Facebook
      </h2>

      <div className="overflow-hidden rounded-md">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FClubLexus&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
          width="100%"   // Make it responsive
          height="500"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          loading="lazy"
          title="Facebook Feed"
        ></iframe>
      </div>
    </section>
  );
}
