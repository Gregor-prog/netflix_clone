import { useState } from "react"

function NavBar(){
    const [side,setside] = useState(false)
    function sideba(){
        setside(!side)
        console.log
    }
    if(window.innerWidth > 1440){
        setside(true)
    }
    return <div className="h-[70px] flex flex-row items-center justify-evenly bg-[#564d4da1]">
        <h1 className="pl-[40px] font">NETFLIX</h1>
        <p onClick={sideba} className="z-20 absolute left-[380px]">x</p>
        {side?<div className="flex sm:bg-transparent bg-[#564d4da1] z-10 sm:flex-row flex-col sm:h-auto h-[200px] sm:mt-[0px] sm:ml-[0px] mt-[140px] ml-[180px] items-center justify-evenly w-[60%]">
            <a href="#"><p className="text-[25px] text-[white] font-semibold ]">Home</p></a>
            <a href="#"><p className="text-[25px] text-[white] font-semibold ]">Favorites</p></a>
            <a href="#"><p className="text-[25px] text-[white] font-semibold ]">About</p></a>
            <a href="#"><p className="text-[25px] text-[white] font-semibold ]">Bla Bla</p></a>
        </div>:null}
    
    </div>
}

export default NavBar