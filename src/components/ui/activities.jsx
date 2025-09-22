import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    
} from "@/components/ui/card"
import { LucideGem } from "lucide-react"

import { Button } from "./button"
import { MapPin } from "lucide-react"
import { Calendar } from "lucide-react"
import img1 from '@/img/family-enjoying-their-quality-winter-time.jpg'
const Activities = () => {
   return <div className="max-w-6xl mx-auto px-6">

     <h2 className="text-center text-3xl my-4  text-[#01185e] font-semibold">Recent Activities</h2>
   

         <p className="text-gray-900 text-sm  text-wrap mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo iste sunt aliquid non, suscipit maiores culpa illum maxime consequatur quis nobis eveniet ipsa aspernatur corporis, et obcaecati aut sequi perspiciatis.</p>
         <div className="grid w-fit mx-auto max-sm:grid-cols-1 gap-5  grid-cols-3">
    <Card className='!py-0 !gap-0 overflow-hidden  w-full aspect-[4/5]'>
    <div className="relative w-full h-2/5 min-h-2/5 overflow-hidden">
    <div className=" absolute w-full h-full  overflow-y-hidden ">
            <img src={img1} className="w-full object-cover h-full"  alt="" />
    
        </div>
        <div className="absolute w-full bg-[#0b3275]/10 h-full"></div>


        <div className="absolute w-full bg-gradient-to-t from-[#0b3275]/85 via-[#0b3275]/20 to transparent h-full"></div>
        <p className="absolute flex text-white text-lg items-center  bottom-8 left-[5%]"> <Calendar className="text-white "/> &nbsp; February 28, 2024</p>
    </div >
    <div className="h-3/5 max-h-3/5 w-full max-w-full min-h-3/5 flex flex-col justify-around">
           <CardHeader className='mt-3 mb-1'>
            <CardTitle className='!my-0' >Annual Charity Gala</CardTitle>
        </CardHeader>
        <CardContent >
            <CardDescription >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero qui et tempora doloribus incidunt non ducimus. </CardDescription>
           
        </CardContent>
      
         
        <CardFooter className='mt-3 flex flex-col items-start'>
                  <CardContent className='px-0'>
             <CardDescription className='flex my-3'><MapPin/> &nbsp;Iperu-Remo</CardDescription>
        </CardContent>
            <div className="flex items-center justify-between w-full">
             <Button variant="outline"  size='lg'className='!bg-transparent hover:text-white hover:!bg-blue-950/70 text-[#0c2b86] !border-2 !border-[#0c2b86] '> View Photos</Button>
             <CardDescription> <LucideGem/></CardDescription>
            
        </div>
        </CardFooter>
       
    </div>
     
    </Card>
    <Card className='!py-0 !gap-0 overflow-hidden  w-full aspect-[4/5]'>
    <div className="relative w-full h-2/5 min-h-2/5 overflow-hidden">
    <div className=" absolute w-full h-full  overflow-y-hidden ">
            <img src={img1} className="w-full object-cover h-full"  alt="" />
    
        </div>
        <div className="absolute w-full bg-[#0b3275]/10 h-full"></div>


        <div className="absolute w-full bg-gradient-to-t from-[#0b3275]/85 via-[#0b3275]/20 to transparent h-full"></div>
        <p className="absolute flex text-white text-lg items-center  bottom-8 left-[5%]"> <Calendar className="text-white "/> &nbsp; February 28, 2024</p>
    </div >
    <div className="h-3/5 max-h-3/5 w-full max-w-full min-h-3/5 flex flex-col justify-around">
           <CardHeader className='mt-3 mb-1'>
            <CardTitle className='!my-0' >Annual Charity Gala</CardTitle>
        </CardHeader>
        <CardContent >
            <CardDescription >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero qui et tempora doloribus incidunt non ducimus. </CardDescription>
           
        </CardContent>
      
         
        <CardFooter className='mt-3 flex flex-col items-start'>
                  <CardContent className='px-0'>
             <CardDescription className='flex my-3'><MapPin/> &nbsp;Iperu-Remo</CardDescription>
        </CardContent>
                  <div className="flex items-center justify-between w-full">
             <Button variant="outline"  size='lg'className='!bg-transparent hover:text-white hover:!bg-blue-950/70 text-[#0c2b86] !border-2 !border-[#0c2b86] '> View Photos</Button>
             <CardDescription> <LucideGem/></CardDescription>
            
        </div>
        </CardFooter>
       
    </div>
     
    </Card>
    <Card className='!py-0 !gap-0 overflow-hidden  w-full aspect-[4/5]'>
    <div className="relative w-full h-2/5 min-h-2/5 overflow-hidden">
    <div className=" absolute w-full h-full  overflow-y-hidden ">
            <img src={img1} className="w-full object-cover h-full"  alt="" />
    
        </div>
        <div className="absolute w-full bg-[#0b3275]/10 h-full"></div>


        <div className="absolute w-full bg-gradient-to-t from-[#0b3275]/85 via-[#0b3275]/20 to transparent h-full"></div>
        <p className="absolute flex text-white text-lg items-center  bottom-8 left-[5%]"> <Calendar className="text-white "/> &nbsp; February 28, 2024</p>
    </div >
    <div className="h-3/5 max-h-3/5 w-full max-w-full min-h-3/5 flex flex-col justify-around">
           <CardHeader className='mt-3 mb-1'>
            <CardTitle className='!my-0' >Annual Charity Gala</CardTitle>
        </CardHeader>
        <CardContent >
            <CardDescription >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero qui et tempora doloribus incidunt non ducimus. </CardDescription>
           
        </CardContent>
      
         
        <CardFooter className='mt-3 flex flex-col items-start'>
                  <CardContent className='px-0'>
             <CardDescription className='flex my-3'><MapPin/> &nbsp;Iperu-Remo</CardDescription>
        </CardContent>
        <div className="flex items-center justify-between w-full">
             <Button variant="outline"  size='lg'className='!bg-transparent hover:text-white hover:!bg-blue-950/70 text-[#0c2b86] !border-2 !border-[#0c2b86] '> View Photos</Button>
             <CardDescription> <LucideGem/></CardDescription>
            
        </div>
                
        </CardFooter>
       
    </div>
     
    </Card>
   
    

    </div>
   </div> 
}

export default Activities