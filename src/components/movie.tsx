import { useEffect, useState } from "react"
import '@splidejs/react-splide/css';
import {Truncate } from '@re-dev/react-truncate'
import { useNavigate } from "react-router";
import Loading from "./loading";

interface prop {
    id:string
}

export const Movie:React.FC<prop> = ({id}) => {
    const [films,setfilms] = useState([])
    const [error,seterror] = useState(null)
    const navigate = useNavigate()

    type filmType = {
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



    function movieD(id:string,userID:string){
        navigate(`/movie?id=${id}&userID=${userID}`)
    }

        useEffect(() => {
            async function fetchMovie(){
                try {
                    const movie = await fetch("https://netflix-backend-qegm.onrender.com/movie/fetchMovies")
                    if(!movie.ok){
                        throw new Error("movie not fetched");
                    }
                    const res = await movie.json()
                    setfilms(res.data.movies)
                } catch (error) {
                    if(error){
                        console.log(error)
                        seterror(error as React.SetStateAction<null>)
                    }
                }
            }
            fetchMovie()
        })

        if(films.length == 0 ){
            return <div className="bg-black h-[100vh] w-[100vw] flex justify-center items-center">
                <Loading/>
            </div>
        }
        if(error){
            return <p>
                error 404
            </p>
        }
    return <div className="mt-[210px] p-6 ">
        {/* action,scifi,Romance,Animation */}
        <p className="text-center w-fulll text-white">RECOMMENDED MOVIES</p>
        <div className="my-7">
        <p className="m-3 text-4xl font-bold text-[#E50914]">Action</p>
            
                <div className="grid grid-cols-3 sm:grid-cols-4 ml:grid-cols-5 gap-4">
                {films.map((film:filmType) => (
                film.type == 'Action'?  <div className="bg-cover group relative hover:w-[] my-3 hover:block   bg-center  overflow-hidden  rounded-xl shadow-xs bg-black " onClick={() => {movieD(film._id,id)}} >
                            <div className=" hover:w-auto">
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            </div>
                            <div className="p-2 md:bottom-[-200px] w-full bottom-0   group-hover:bottom-0 transition-all backdrop-blur-sm bg-[#0000001a] absolute">
                        <p className="text-[white] text-[15px] md:text-xl lg:text-3xl m-0 p-0 font-medium">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] font-medium m-0 p-0 text-[12px] md:text-[15px]  ">{film.overview}</Truncate>
                            </div>
                    </div> :null
                ))}
                </div>
        </div>


        <div className="my-7">
        <p className="m-3 text-4xl font-bold text-[#E50914]">Sci-fi</p>
            
                <div className="grid grid-cols-3 sm:grid-cols-4 ml:grid-cols-5 gap-4">
                {films.map((film:filmType) => (
                film.type == 'Sci-fi'?  <div className="bg-cover group relative hover:w-[] my-3 hover:block   bg-center  overflow-hidden  rounded-xl shadow-xs bg-black " onClick={() => {movieD(film._id,id)}} >
                            <div className=" hover:w-auto">
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            </div>
                            <div className="p-2 md:bottom-[-200px] w-full bottom-0  group-hover:bottom-0 transition-all backdrop-blur-sm bg-[#00000083] absolute">
                        <p className="text-[white] text-[15px] md:text-xl lg:text-3xl m-0 p-0 font-medium">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] m-0 p-0 text-[12px] md:text-[15px]  ">{film.overview}</Truncate>
                            </div>
                    </div> :null
                ))}
                </div>
        </div>



        <div className="my-7">
        <p className="m-3 text-4xl font-bold text-[#E50914]">Romance</p>
            
                <div className="grid grid-cols-3 sm:grid-cols-4 ml:grid-cols-5 gap-4">
                {films.map((film:filmType) => (
                film.type == 'Romance'?  <div className="bg-cover group relative hover:w-[] my-3 hover:block   bg-center  overflow-hidden  rounded-xl shadow-xs bg-black " onClick={() => {movieD(film._id,id)}} >
                            <div className=" hover:w-auto">
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            </div>
                            <div className="p-2 md:bottom-[-200px] w-full bottom-0    group-hover:bottom-0 transition-all backdrop-blur-sm bg-[#00000083] absolute">
                        <p className="text-[white] text-[15px] md:text-xl lg:text-3xl m-0 p-0 font-medium">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] m-0 p-0 text-[12px] md:text-[15px]  ">{film.overview}</Truncate>
                            </div>
                    </div> :null
                ))}
                </div>
        </div>

        <div className="my-7">
        <p className="m-3 text-4xl font-bold text-[#E50914]">Animation</p>
            
                <div className="grid grid-cols-3 sm:grid-cols-4 ml:grid-cols-5 gap-4">
                {films.map((film:filmType) => (
                film.type == 'Animation'?  <div className="bg-cover group relative hover:w-[] my-3 hover:block   bg-center  overflow-hidden  rounded-xl shadow-xs bg-black " onClick={() => {movieD(film._id,id)}} >
                            <div className=" hover:w-auto">
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            </div>
                            <div className="p-2 md:bottom-[-200px] w-full bottom-0   group-hover:bottom-0 transition-all backdrop-blur-sm bg-[#00000083] absolute">
                        <p className="text-[white] text-[15px] md:text-xl lg:text-3xl m-0 p-0 font-medium">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] m-0 p-0 text-[12px] md:text-[15px]  ">{film.overview}</Truncate>
                            </div>
                    </div> :null
                ))}
                </div>
        </div>
                 

    </div>
}



