import { Menu } from "lucide-react"
import logo from '@/img/IMG-20250908-WA0004.jpg'
const Header = () => {
    return <div className="flex items-center justify-between p-2 h-[8vh] bg-white sticky top-0 z-50 shadow-md  border-b border-gray-200">
        <div className="flex items-center  gap-1">
        <img src={logo} className=" w-[8vh] h-[8vh]" alt="" />
        <p className="font-bold drop-shadow-xs  text-[#0c2b86]"> <span className="text-orange-500  font-semibold rounded">De</span> GEMS</p>
        </div>
            <Menu className="h-6 w-6  text-gray-800"/>
        

    </div>
}

export default Header