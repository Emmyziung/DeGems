import { useGlobalContext } from "@/context/pageContext";
import { IoClose } from "react-icons/io5";
 const Modal = () => {
    const {memberDisplay, people} = useGlobalContext();
    return (
        <aside className="modal-overlay" >
        <div className="modal-container bg-white">
            <div className="py-2 px-3 flex bg-transparent sticky top-0 z-50 justify-end">
           <button onClick={memberDisplay}><IoClose className="h-8 w-8 bg-red-50 text-red-500"/></button>
           </div>
             <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight text-primary">
          Elected Executives
        </h2>
              <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 max-sm:gap-3 p-2">
          {people.map((p) => (
            <div
              key={p.name}
              className="rounded-xl  bg-card shadow-card  p-4 flex flex-col items-center text-center"
            >
              <div className="h-30 w-30 border-4 border-orange-400/80 shadow-2xs rounded-full bg-primary/10 text-primary  flex items-center justify-center text-xl font-semibold">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover rounded-full"/>
                ) : (
                  p.initials
                )}
              </div>
              <p className="mt-4 font-[650] text-foreground  whitespace-nowrap text-nowrap">{p.name}</p>
              <p className="text-sm text-muted-foreground text-nowrap">{p.role}</p>
            </div>
          ))}
        </div>
        </div>
        </aside>
    )
}

export default Modal;