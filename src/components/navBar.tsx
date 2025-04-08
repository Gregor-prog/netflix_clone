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
import { Searchcomp } from "./search"
interface navProp{
    avatar:number,
    id:string,
    movie:object[]
}

const  NavBar : React.FC<navProp> = ({avatar,id,movie}) => {
    const [side,setside] = useState(true)
    const [isLogin,setisLogin] = useContext(IsLogincontext)
    const [search,setsearch] = useState(false)

    function Searchfunc(){
        console.log(search)
        setsearch(!search)
    }

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
        console.log(isLogin)
    }

    function toFav(){
        navigation(`/favourites?id=${id}`)
    }
    function toWishes(){
        navigation(`/wishList?id=${id}`)
    }


    
    const navigation = useNavigate()

    const logout = () =>{
        navigation("/")
        setisLogin(false)
        console.log("logout")
    }
    
    const pic = [net_1,net_2,net_3,net_4,net_5,net_6,net_7]
    return <div className="h-[70px] w-[100%] fixed z-20  backdrop-blur-xl top-0 flex flex-row items-center p-[30px]  bg-[#2c2c2c3f]" >
         <p className="text-red-600 text-[50px] font-bold ml-3" style={{fontFamily:"Bebas Neue"}}>Movie</p>
         {search && <Searchcomp movie={movie} id={id} />}
        <div onClick={sideba} className="z-20 md:hidden block absolute text-white right-[5%]">
        {!side?<img className="size-9 bg-white p-2 rounded-xl"  src="https://img.icons8.com/ios-filled/50/menu--v1.png" alt="menu--v1"/>:
        <img className="size-9 bg-white p-2 rounded-xl" src="https://img.icons8.com/material-outlined/24/cancel--v1.png" alt="cancel--v1"/>}
        
        </div>
        
        {side?<div className="flex md:bg-transparent divide-y md:divide-y-0 rounded-2xl divide-gray-200 bg-white absolute top-[70px] right-5 z-40 md:static md:flex-row flex-col md:h-auto  md:mt-[0px] md:ml-[0px] items-center justify-evenly w-[30%] md:w-[50%]">
            <a href="#" className="w-[100%] text-center"><p className="text-[15px] md:ml-2 md:rounded-2xl md:text-[20px] py-2 text-[black] md:text-white font-semibold hover:bg-[#ff000062] w-[100%] hover:text-white">Home</p></a>
            <p className="text-[15px] md:text-[20px] py-2 text-center text-[black] md:rounded-2xl  md:text-white font-semibold hover:bg-[#ff000062] w-[100%] hover:text-white" onClick={() => {toFav()}}>Favorites</p>
            <p className="text-[15px] md:text-[20px] py-2 text-center text-[black] md:rounded-2xl md:text-white font-semibold hover:bg-[#ff000062] w-[100%] hover:text-white" onClick={() => {toWishes()}}>Wish Lists</p>
            <a href="#" className="w-[100%]"><p className="text-[15px] md:text-[20px] md:rounded-2xl py-2 text-center text-[black] md:text-white font-semibold hover:bg-[#ff000062] w-[100%] hover:text-white">About</p></a>
        </div>:null}

        <div className="flex flex-row items-center justify-center md:gap-6 gap-3 md:ml-none absolute right-[14%] md:right-[1%] w-[30%] ">
                <Search className="text-white" onClick={() => Searchfunc()}/>
                <div className="flex flex-row items gap-1.5 hover:bg-[#80808073] p-[5px] rounded-[12px]">
                <img src={pic[avatar]} alt="" className="h-[25px] rounded-[6px]"/>
                <ChevronDown className="text-white" onClick={() => logoutTab()}/>
                <button ref={logoutRef} className="cursor-pointer bg-gray-200 p-[10px] rounded-[12px] absolute top-0 translate-y-[50px] transition-all right-5 md:right-auto  hover:bg-gray-600 hidden" onClick={() => logout()}>Logout</button>
                </div>
                
        </div>
    
    </div>
}

export default NavBar