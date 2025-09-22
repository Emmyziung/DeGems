import backgroundImg from '@/img/23682.jpg'
import { Button } from "@/components/ui/button"
import { Gem } from 'lucide-react'

const Hero =  () => {
    return <div className='   bg-cover bg-center h-[92vh]'style={{backgroundImage: `url(${backgroundImg})`}}>
        <div className="bg-black/60 h-full">
        <div className=' px-4 w-full bg-gradient-to-br from-[#0b3275]/70 via-[#0b3275]/50 to-orange-500/20 h-full flex  flex-col justify-around items-center'>
            <div>
    
            </div>
            <p className='text-2xl sm:text-3xl lg:text-4xl  text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-semibold text-center'>Welcome to <span className='text-orange-500 drop-shadow-none'> De Gems</span> Exclusive Club <br /> <span className='text-lg font-[400] '>of Iperu Remo</span> </p>
            <div className='flex flex-col  gap-2'id='buttons'>
            <Button variant="outline"  size='lg'className='!bg-transparent w-[80vw] hover:text-white hover:!bg-blue-950/70 text-white !border-2 !border-white '>Join Us  </Button>
            <Button variant="outline" size='lg' className='w-[80vw] text-[#0c2b86] hover:text-white hover:!bg-blue-950/70'>Learn More</Button>
            </div>
        </div>
        </div>
    </div>
}

export default Hero