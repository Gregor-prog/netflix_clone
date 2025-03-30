import image from  "../assets/images/netflix_background.jpg"
import NavBar from "../components/navBar"
import IsLogincontext from "../isLogincontext"
import { Signin } from "./signin"
import Signup from "./signup"
import { useContext } from "react"
function Signupin(){
    const [isLogin,setisLogin] = useContext(IsLogincontext)
    return <div style={{backgroundImage: `url(${image})`}} className="w-[100dvw] h-[100dvh] bg-cover bg-no-repeat bg-center flex flex-row items-center justify-center">
        {/* <NavBar/> */}
        {isLogin?<Signin/>:<Signup/>}
    </div>
}

export default Signupin