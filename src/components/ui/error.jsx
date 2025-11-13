import { useGlobalContext } from "@/context/pageContext"

const Error = () => {
    const {setErrorDisplay, errorMessage, setErrorMessage} = useGlobalContext()
    return(
           <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-30">
          <div className="bg-white rounded-lg shadow-xl w-80 p-6 text-center">
            {/* <Trash2 size={36} className="text-red-600 mx-auto mb-3" /> */}
            <p className="text-gray-800 font-medium mb-4">
         {errorMessage}
            </p>
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={()=> {setErrorDisplay(false); setErrorMessage('')}}
                className="px-4 py-2 rounded-md !bg-gray-200 hover:!bg-gray-300 text-gray-700 w-1/2 mr-2"
              >
                OK
              </button>
            
            </div>
          </div>
        </div>
      )
    
}

export default Error