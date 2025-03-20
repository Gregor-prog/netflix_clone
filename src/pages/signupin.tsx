import image from  "../assets/images/netflix_background.jpg"
import NavBar from "../components/navBar"
import Signup from "./signup"
function Signupin(){
    return <div style={{backgroundImage: `url(${image})`}} className="w-[100dvw] h-[100dvh] bg-cover bg-no-repeat bg-center">
        <NavBar/>
        <Signup/>
    </div>
}

export default Signupin