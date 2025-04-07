import { useEffect,useState } from "react"
import {Truncate } from '@re-dev/react-truncate'
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Loading from "../components/loading"

type wishType = {
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
function Wishlists(){
    const [wishes,setwishes] = useState([])
    const [movie,setmovie] = useState<movieType[]>([])
    const [error,seterror] = useState(null)
    const [loading,setloading] = useState(true)
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")
    const navigate = useNavigate()

    function movieD(id:string,userID:string){
        navigate(`/movie?id=${id}&userID=${userID}`)
    }

    useEffect(() => {
        async function fetchFavourites(){
            try {
                const wishesData = await fetch(`http://localhost:4000/movie/fetchWishes?userId=${id}`)
                const movies = await fetch(`http://localhost:4000/movie/fetchMovies`)
            if(!wishesData.ok || !movies.ok){
                throw new Error("couldn't fetch favourites")
            }{
                const res = await wishesData.json()
                const movieRes = await movies.json()
                setwishes(res.data.wishes)
                setmovie(movieRes.data.movies)
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

    if(wishes.length == 1){
        return <div className="bg-black h-[100vh] text-white flex flex-row items-center justify-center text-6xl font-bold">
            No wishes found
        </div>
    }


    return <div className="bg-black h-[100vh]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 p-4">
            {wishes.map((wish:wishType) => movie.map((mov:movieType) => (
                wish.movieId == mov._id? <div key={mov._id} className="relative my-7 cursor-pointer" onClick={() => {movieD(mov._id,id as string)}}>
                    <img src={`https://image.tmdb.org/t/p/original${mov.poster_path}`} alt="" className="w-full h-full rounded-md" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <p className="absolute bottom-4 left-4 text-white font-bold">{mov.title}</p>
                    <Truncate lines={2} className="text-[#E50914] font-semibold ">{mov.overview}</Truncate>
                </div>:null
            )))}

        </div>
    </div>
}

export default Wishlists