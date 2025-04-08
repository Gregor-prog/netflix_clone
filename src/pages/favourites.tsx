import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {Truncate } from '@re-dev/react-truncate'
import Loading from "../components/loading"
import { AiFillHeart,  } from "react-icons/ai";

type favo = {
    movieId:string  
}
type movieType = {
    backdrop_path: string,
    favourite: boolean,
    original_language: string,
    overview:string,
    poster_path: string,
    release_date: string,
    title: string,
    type:string,
    video: string,
    _id:string
}
function Favourites(){
    const [favourites,setfavourites] = useState([])
    const [movie,setmovie] = useState<movieType[]>([])
    const [error,seterror] = useState(null)
    const [loading,setloading] = useState(true)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id") as string
    const navigate = useNavigate()

    function movieD(id:string,userID:string){
        navigate(`/movie?id=${id}&userID=${userID}`)
    }


    useEffect(() => {
        async function fetchFavourites(){
            try {
                const fav = await fetch(`https://netflix-backend-qegm.onrender.com/movie/Favourite?userId=${id}`)
                const movies = await fetch(`https://netflix-backend-qegm.onrender.com/movie/fetchMovies`)
            if(!fav.ok || !movies.ok){
                throw new Error("couldn't fetch favourites")
            }{
                const res = await fav.json()
                const movieRes = await movies.json()
                setfavourites(res.data.favourites)
                setmovie(movieRes.data.movies)
                console.log(res.data.favourites)
                setloading(false)
            }
            } catch (error) {
                if(error){
                    console.log(error)
                    seterror(error as React.SetStateAction<null>)
                }
            }
        }
        fetchFavourites()
    },[])


    if(error){ 
        console.log(error)
        return <div className="text-black">
            Error 404
        </div>
    }

    if(loading){
        console.log(loading)
        return <div className="bg-black h-[100vh] flex items-center justify-center"><Loading/></div>
    }


    return <div className="bg-black h-[100vh] overflow-y-scroll">
            <p className="text-white font-bold text-3xl pt-14 pl-10">Favourites <AiFillHeart className="inline-block"/></p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 p-4">
            {favourites.map((fav:favo) => movie.map((mov:movieType) => (
                fav.movieId == mov._id? <div className="bg-cover group relative hover:w-[] my-3 hover:block   bg-center  overflow-hidden  rounded-xl shadow-xs bg-black " onClick={() => {movieD(mov._id,id)}} >
                <div className=" hover:w-auto">
                <img src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                </div>
                <div className="p-2 md:bottom-[-200px] w-full bottom-0   group-hover:bottom-0 transition-all backdrop-blur-sm bg-[#0000001a] absolute">
            <p className="text-[white] text-[15px] md:text-xl lg:text-3xl m-0 p-0 font-medium">{mov.title}</p>
            <Truncate lines={1} className="text-[#E50914] font-medium m-0 p-0 text-[12px] md:text-[15px]  ">{mov.overview}</Truncate>
                </div>
        </div>:null
            )))}

        </div>
    </div>
}

export default Favourites