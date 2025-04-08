import { useEffect,useRef,useState } from "react"
import { useLocation } from "react-router"
import { movieType } from "../types"
import { Play } from "lucide-react"
import { AiOutlineHeart, AiFillHeart,AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import Loading from "../components/loading";
import { Toaster, toast } from 'sonner';
type favo = {
    movieId:string
}
type wish = {
    movieId:string
}
export function SingleMovie(){
    const [movie,setmovie] = useState({} as movieType)
    const [error,seterror] = useState('')
    const [loading, setloading] = useState(true)
    const[favourite,sethtmmlfavoutite] = useState(false)
    const [wish,setwishList] = useState(false)
    const videoRef = useRef<HTMLDivElement>(null)
    const vRef = useRef<HTMLVideoElement>(null)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const userID = queryParams.get("userID")

    function toggleVideo(){
        if(videoRef.current && vRef.current){
            videoRef.current.style.display = 'flex'
            vRef.current.play()
        }
    }
    function cVideo(){
        if(videoRef.current && vRef.current){
            videoRef.current.style.display = 'none'
            vRef.current.pause()
            vRef.current.currentTime = 0
        }
    }

    async function addFav(){
        try {
           const addFav =  await fetch(`https://netflix-backend-qegm.onrender.com/movie/addFavourite?userID=${userID}&id=${id},`, {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId : userID,
                    movieId: id
                  }),
            })
            sethtmmlfavoutite(!favourite)
            console.log(await addFav.json())
            toast.success("Added to favourite")
        } catch (error) {
            if(error){
                console.log(error)
                toast.error("Couldn't add to favourite")
            }
        }
    }

    async function addWish() {
        try {
            const addWish =  await fetch(`https://netflix-backend-qegm.onrender.com/movie/adelWish?userID=${userID}&id=${id},`, {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId : userID,
                    movieId: id
                  }),
            })
            setwishList(!wish)
            console.log(addWish.json())
            toast.success("Added to wishlist")
        } catch (error) {
            if(error){
                console.log(error)
                toast.error("Couldn't add to wishlist") 
            }
        }   
    }

    // function goBack(){
    //     navigate("/Home")
    // }

    useEffect(() => {
        async function fetchMovie(){
           try {
            const res = await fetch(`https://netflix-backend-qegm.onrender.com/movie/fetchMovies?id=${id}`)
            const fav = await fetch(`https://netflix-backend-qegm.onrender.com/movie/Favourite?userId=${userID}`)
            const wish = await fetch(`https://netflix-backend-qegm.onrender.com/movie/fetchWishes?userId=${userID}`)
            if(!res.ok){
                throw new Error("an error occurred, couldn't detch movie");
            }
            if(!fav.ok){
                throw new Error("an error occurred, couldn't detch favourite movie");
            }
            const data = await res.json()
            const favouriteData = await fav.json()
            const wishFetch = await wish.json()
            const wishData = wishFetch.data.wishes
            const rep = data.data.movies
            const favouriteMovie = favouriteData.data.favourites
            const [movie] = rep
            setmovie(movie)
            // setfavoutite(favouriteMovie)
            favouriteMovie.map((favo:favo) => (
                favo.movieId == id?sethtmmlfavoutite(true):null
            ))
            wishData.map((wish:wish) => (
                wish.movieId == id?setwishList(true):null
            ))
            if(movie){
                setloading(false)
            }

           } catch (error) {
                if(error){
                    console.log(error)
                    seterror(error as React.SetStateAction<string>)
                }
           }
        }
        fetchMovie()
    },[])

    if(error){
        console.log(error)
        return <div>Error 404</div>
    }
    if(loading){
        console.log(loading)
        return <div className="bg-black h-[100vh] flex items-center justify-center"><Loading/></div>
    }

    return <div>
         <Toaster position="top-center" richColors/>
             <div className="w-[100vw]  flex flex-col items-center justify-center left-0 z-30 bg-[#00000080]">
                {/* <p className="w-[100%] text-right bg-black text-white"><AiFillBackward className="text-white size-10 ml-3" onClick={() => {goBack()}}/></p> */}
                        <div className="w-[100%] bg-[#000000] m-auto overflow-hidden p-5 sm:p-10">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" className="w-[100%] ml:w-[70%] mx-auto"/>
                            {/* <video src={movie.video} autoPlay loop  className="mx-auto"></video> */}
                            <div className="flex flex-row items-center gap-4 w-[100%]">
                            <p className="text-xl sm:text-3xl font-bold text-white pl-4"><span className="text-[#df0e0e]">Title: </span>{movie.title}</p>
                            <div className="flex flex-row items-center gap-2">
                            <div onClick={() => addFav()} style={{ fontSize: "24px", cursor: "pointer" }} className="">
                            {favourite?<AiFillHeart color="white"  className="size-9"/> : <AiOutlineHeart color="white" className="size-9"/>}
                                </div>

                                <div onClick={() => addWish()} style={{ fontSize: "24px", cursor: "pointer" }} className="">
                                    {wish?<AiFillPlusCircle color="white"  className="size-9"/> : <AiOutlinePlus color="white" className="size-9"/>}
                                </div>
                            <button onClick={() => {toggleVideo()}}  className="bg-white cursor-pointer text-black font-bold flex items-center justify-evenly px-[12px] py-[3px] rounded-[6px] m-5"><Play/>Play</button>
                            </div>
                            </div>
                 
                            <p className="font-semibold text-white p-1 px-3"><span className="text-[#df0e0e]">Overview: </span>{movie.overview}</p>
                            <p className="font-semibold text-white p-1 px-3"><span className="text-[#df0e0e]">Release date: </span>{movie.release_date}</p>
                            <p className="font-semibold text-white p-1 px-3"><span className="text-[#df0e0e]">Language: </span>{movie.original_language}</p>
                            <p className="font-semibold text-white p-1 px-3"><span className="text-[#df0e0e]">Category: </span>{movie.type}</p>
                            <div className="flex gap-4 px-4">

                                
                            </div>
                        </div>
                        {/* play video */}
        <div className="fixed w-full h-[100vh] z-50 top-0 items-center justify-center hidden backdrop-blur-xl  bg-[#1616163b]" ref={videoRef}>
            <p className="text-white font-bold absolute top-5 left-5 cursor-pointer"  onClick={() => {cVideo()}}>X</p>
            <p className="text-white font-bold ml-28">Now Watching: <span>{movie.title}</span></p>
            <video src={movie.video} controls loop autoPlay className="w-[80%] absolute top-[52%] left-[50%] translate-y-[-50%] translate-x-[-50%]" ref={vRef}></video>
        </div>
       

        </div>
    </div>
}