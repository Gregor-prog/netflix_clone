import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {Truncate } from '@re-dev/react-truncate'

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
                const fav = await fetch(`http://localhost:4000/movie/Favourite?userId=${id}`)
                const movies = await fetch(`http://localhost:4000/movie/fetchMovies`)
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
        return <div className="text-black">
            ...Loading
        </div>
    }


    return <div className="bg-black h-[100vh]">
        <div className="grid grid-cols-4 gap-4 p-4">
            {favourites.map((fav:favo) => movie.map((mov:movieType) => (
                fav.movieId == mov._id? <div key={mov._id} className="relative cursor-pointer" onClick={() => {movieD(mov._id,id)}}>
                    <img src={`https://image.tmdb.org/t/p/original${mov.poster_path}`} alt="" className="w-full h-full rounded-md" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                    <p className="absolute bottom-4 left-4 text-white font-bold">{mov.title}</p>
                    <Truncate lines={2} className="text-[#E50914] font-semibold ">{mov.overview}</Truncate>
                </div>:null
            )))}

        </div>
    </div>
}

export default Favourites