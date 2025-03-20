import { defineConfig } from "vite"
import { useContext, useEffect } from "react"
import IsLogincontext from "../isLogincontext"
import {useNavigate } from "react-router-dom"

function Home(){
    const [isLogin,setisLogin] = useContext(IsLogincontext)
    const Navigate = useNavigate()

    useEffect(() => {
        if(!isLogin){
            Navigate("/",{replace:true})
        }

    },[isLogin,setisLogin])

    console.log(isLogin)
    return <div>
       {isLogin?<p>Home</p>:null}
    </div>
}
export default Home