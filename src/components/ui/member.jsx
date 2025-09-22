import {IoDiamond} from 'react-icons/io5'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5'
import { Button } from './button'
const Member = () => {
    return(
        <div>
        <section className='bg-gradient-to-br mt-6 from-blue-700 via-blue-900 to-blue-950 overflow-x-hidden  h-[30vh] w-full  ' >
            <div className="w-full max-w-6xl h-full mx-auto relative" >
            <div className='absolute -right-0 top-1/4 h-[60%]'><IoDiamond className='text-orange-500/40 rotate-[10deg] w-auto h-full '  /></div>
            <div className='absolute inset-0 z-50 flex flex-col justify-center items-center '>
            <p className='text-2xl text-white font-semibold text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] '>Become a Member Today</p>
            <p className='text-white text-center text-sm mt-4 px-4'>Join our exclusive club and unlock a world of benefits, networking opportunities, and unforgettable experiences!</p>
            <div className='flex justify-center mt-6'>
             

                <Button variant='outline' className='!bg-transparent !border-2 !text-white !border-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'>Join Now</Button>      
            </div> 
            </div>
            </div>
        </section>
        <div className='flex mt-6 max-w-6xl mx-auto justify-center items-center'>
           <hr className=" border-gray-300 w-full" />
           <div className='flex justify-around px-2 items-center'>
            <IoLogoFacebook className='text-3xl mx-4 text-blue-700 hover:text-blue-900 cursor-pointer'/>
            <IoLogoInstagram className='text-3xl mx-4 text-pink-500 hover:text-pink-700 cursor-pointer'/>
            <IoLogoTwitter className='text-3xl mx-4 text-blue-400 hover:text-blue-600 cursor-pointer'/>
           </div>
           <hr className="border-gray-300 w-full" />
        </div>
        <p className="text-center font-semibold text-gray-800 mt-1">Follow our social Media Handles</p>
        </div>
    )
}

export default Member