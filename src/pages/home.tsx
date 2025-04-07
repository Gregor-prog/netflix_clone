// import { defineConfig } from "vite"
import { useContext, useEffect, useRef, useState } from "react"
import IsLogincontext from "../isLogincontext"
import {useLocation, useNavigate } from "react-router-dom"
import { movieType } from "../types"
import NavBar from "../components/navBar"
import { Info, Play } from "lucide-react"
import { Movie } from "../components/movie"
import Loading from "../components/loading"

function Home(){

    type user = {
        _id:string,
        name:string
    }

    const [isLogin,setisLogin] = useContext(IsLogincontext)
    const Navigate = useNavigate()
    const {id,index} = useLocation().state as any
    const [user,setuser] = useState<user|null>(null)
    const [movie,setmovie] = useState<movieType[]>([])
    const [error,seterror] = useState<Error|null>(null)
    const [isLoading, setisLoading] = useState(true)
    const dialogRef = useRef<HTMLDivElement>(null)
    const dialogInfoRef = useRef<HTMLDivElement>(null)

    const videoRef = useRef<HTMLVideoElement>(null)
    const bgvideoRef = useRef<HTMLVideoElement>(null)

    function toggleVideo(){
        if(dialogRef.current)
        dialogRef.current.style.display = "block"
        if(videoRef.current && bgvideoRef.current){
            // console.log("God")
            videoRef.current.play()
            bgvideoRef.current.pause()
        }
    }

    function cDialog(){
         if(dialogRef.current)
        dialogRef.current.style.display = "none"
        if(videoRef.current && bgvideoRef.current){
            videoRef.current.currentTime = 0
            videoRef.current.pause()
            bgvideoRef.current.play()
        }
    }

    const infoDialog = () => {
        if(dialogInfoRef.current && bgvideoRef.current){
        dialogInfoRef.current.style.display = "block"
            bgvideoRef.current.pause()
        }
    }
    const cInfoDialog = () => {
        if(dialogInfoRef.current && bgvideoRef.current){
            dialogInfoRef.current.style.display = "none"
                bgvideoRef.current.play()
            }
    }

    useEffect(() => {
        if(!isLogin){
            Navigate("/",{replace:true})
        }
        async function fetchUser(){
            try {
                console.log("him")
                console.log(id)
                const user = await fetch("http://localhost:4000/users/User", ({
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    "body":JSON.stringify({
                        _id: id
                    })
                }))
    
                const movie = await fetch("http://localhost:4000/movie/fetchMovies")

                if(!user.ok){
                    throw new Error("couldn't fetch Users");
                }
                if(!movie.ok){
                    throw new Error("couldn't fetch Movies");
                }
                const userResponse = await user.json()
                const movieResponse = await movie.json()
                    console.log(movieResponse.data.movies)
                setuser(userResponse)
                setmovie(movieResponse.data.movies)

                if(userResponse != null && movieResponse.data.movies.length > 0  ){
                    setisLoading(false)
                } 
            } catch (error) {
                if(error){
                    console.log(error)
                    seterror(error as Error)
                }
            }

            
            
        }
        fetchUser()

       

    },[])

   

        
    if(error){
        return <div>Error 404</div>
    }

    if(isLoading){
        console.log(isLoading)
        return <div className="bg-black h-[100vh] flex items-center justify-center"><Loading/></div>
    }

    const randIndex = Math.floor(Math.random() * movie.length)
    const display = movie[randIndex]
    console.log(display)

    return <div className="bg-black">
       <NavBar avatar = {index} id = {id} />
     <div className=" w-[100vw] bg-[black] z-[-3] h-[100vh] sm:overflow-hidden  ">
    
       <video src={display.video} ref={bgvideoRef} autoPlay loop className="sm:absolute mt-[60px] sm:mt-auto top-0 left-0 pointer-events-none  min-w-full "></video>
       <div className="z-4 absolute text-white sm:p-[100px] p-[20px]   sm:pt-[200px] bg-[#00000033]">
        <p className="text-[4vw] sm:w-[60%] w-[100%] font-bold ">{display.title}</p>
        <p className="sm:w-[50%] text-[1em] sm:text-[2vw] w-[100%]">{display.overview}</p>
        <div className="mt-[15px] flex flex-row items-center gap-5 w-[20%] absolute ">
            <button onClick={() => {toggleVideo()}}  className="bg-white cursor-pointer text-black font-bold flex items-center justify-evenly px-[12px] py-[3px] rounded-[6px]"><Play/>Play</button>
            <button onClick={() => {infoDialog()}} className="bg-[#413f3f] text-white font-bold flex items-center justify-evenly px-[12px] py-[3px] rounded-[6px]"><Info/>Info</button>
        </div>
       </div>
       {/* play video */}
       <div className="fixed w-[100vw] z-50 top-0 min-h-screen items-center justify-center hidden bg-black " ref={dialogRef} >
            <p className="text-white font-bold "  onClick={() => {cDialog()}}>X</p>
            <video src={display.video} controls ref={videoRef} loop className="w-[80%] m-auto"></video>
        </div>

        <div className="fixed w-[100vw] z-50 top-0 min-h-screen  hidden bg-[#d4d4d46e] backdrop-blur-2xl " ref={dialogInfoRef} >
        <p className="text-white font-bold "  onClick={() => {cInfoDialog()}}>X</p>
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] overflow-hidden translate-y-[-50%] rounded-3xl w-[100%] sm:w-[50%] sm:h-[70%] h-auto bg-[#505050]">
                <img src={`https://image.tmdb.org/t/p/w500${display.backdrop_path}`} alt="" className="w-[100%] h-[100%]" />
                <div className="absolute left-5 bottom-5 sm:w-[60%] w-[80%] text-white ">
                    <p className=" sm:text-4xl text-[20px] drop-shadow-2xl font-semibold p-1">{display.title}</p>
                    <p className="sm:text-[1em] text-[12px]"><span className="text-[#df0e0e] font-bold">Overview: </span>{display.overview}</p>
                    <p className="sm:text-[1em] text-[12px]"><span className="text-[#df0e0e] font-bold">Release Date: </span>{display.release_date}</p>
                    <div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* play video */}
    </div>
       <Movie id={id}/>
    </div>
}
export default Home