import { useRef } from "react"
import net_1 from "../assets/images/netflix1.png"
import net_2 from "../assets/images/netflix 2.jpeg"
import net_3 from "../assets/images/netflix 3.png"
import net_4 from "../assets/images/netflix 4.png"
import net_5 from "../assets/images/netflix 5.png"
import net_6 from "../assets/images/netflix 6.png"
import net_7 from "../assets/images/netflix 7.jpeg"
import { useContext, useEffect, useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import { useNavigate } from "react-router"
import IsLogincontext from "../isLogincontext"

interface navProp{
    avatar:number
}

const  NavBar : React.FC<navProp> = ({avatar}) => {
    const [side,setside] = useState(true)
    const [isLogin,setisLogin] = useContext(IsLogincontext)

    const logoutRef = useRef<HTMLButtonElement>(null)

    function logoutTab(){
        if(logoutRef.current)
            if(logoutRef.current.style.display == "none"){
                logoutRef.current.style.display = "block"
            }else{     
        logoutRef.current.style.display = "none"
            }
    }

   

    useEffect(() => {
        if(window.innerWidth < 480){
            setside(false)
        }
    },[])

   
    function sideba(){
        setside(!side)
        console.log
    }

    
    const navigation = useNavigate()

    const logout = () =>{
        navigation("/")
        setisLogin(false)
        console.log("logout")
    }
    
    const pic = [net_1,net_2,net_3,net_4,net_5,net_6,net_7]
    return <div className="h-[70px] w-[100%] fixed z-20  backdrop-blur-xl top-0 flex flex-row items-center p-[30px] overflow-hidden bg-[#2c2c2c3f]" >
         <p className="text-red-600 text-[50px] font-bold ml-3">NETFLIX</p>
        <p onClick={sideba} className="z-20 sm:hidden block absolute text-white left-[380px]">x</p>
        
        {side?<div className="flex sm:bg-transparent z-10 sm:flex-row flex-col sm:h-auto h-[200px] sm:mt-[0px] sm:ml-[0px] mt-[140px] ml-[60px] items-center justify-evenly w-[50%]">
            <a href="#"><p className="text-[20px] text-[white] font-semibold ]">Home</p></a>
            <a href="#"><p className="text-[20px] text-[white] font-semibold ]">Favorites</p></a>
            <a href="#"><p className="text-[20px] text-[white] font-semibold ]">About</p></a>
            <a href="#"><p className="text-[20px] text-[white] font-semibold ]">Bla Bla</p></a>
        </div>:null}

        <div className="flex flex-row items-center justify-center gap-6 w-[30%] ">
                <Search className="text-white"/>
                <div className="flex flex-row items gap-1.5 hover:bg-amber-400 p-[5px] rounded-[12px]">
                <img src={pic[avatar]} alt="" className="h-[25px] rounded-[6px]"/>
                <ChevronDown className="text-white" onClick={() => logoutTab()}/>
                <button ref={logoutRef} className="cursor-pointer bg-gray-200 p-[10px] rounded-[12px] absolute top-[35px] left-[89%] hover:bg-amber-300 hidden" onClick={() => logout()}>Logout</button>
                </div>
                
        </div>
    
    </div>
}

export default NavBar