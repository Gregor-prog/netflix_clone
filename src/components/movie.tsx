import { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import {Truncate } from '@re-dev/react-truncate'
import { Play } from "lucide-react";
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
                    const movie = await fetch("http://localhost:4000/movie/fetchMovies")
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
    return <div className="mt-[150px] p-6 ">
        {/* action,scifi,Romance,Animation */}
        <p className="text-center w-fulll text-white">RECOMMENDED MOVIES</p>
        <div className="my-7">
        <p className="m-3 text-4xl font-bold text-[#E50914]">Action</p>
            <Splide options={{
        perPage: 5,        // Number of visible slides
        perMove: 1,        // Move one slide at a time
        gap: "1rem",       // Space between slides
        pagination: false, // Hide pagination dots
        arrows: true,      // Show navigation arrows
        drag: "free",      // Allow smooth scrolling
        breakpoints: {
            1024: { perPage: 5 },
            768: { perPage: 4 },
            480: { perPage: 3 },
        }
    }}>
                {films.map((film:filmType,index) => (
                film.type == 'Action'? <SplideSlide>
                         <div className="bg-cover xl:w-[230px] xl:h-[350px] lg:w-[190px] lg:h-[300px] md:w-[140px] md:h-[260px]  bg-center h-[150px] overflow-hidden z-50 h w-[100px] rounded-3xl shadow-xs bg-black shadow-red-500" onClick={() => {movieD(film._id,id)}} >
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            <div className="p-2">
                        <p className="text-[white] text-3xl font-semibold">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] font-semibold ">{film.overview}</Truncate>
                            </div>
                    </div> 
                </SplideSlide>:null
                ))}
                </Splide>
        </div>


        <div className="my-7">
        <p className="m-3 text-4xl font-bold text-[#E50914]">Sci - Fi</p>
            <Splide options={{
        perPage: 5,        // Number of visible slides
        perMove: 1,        // Move one slide at a time
        gap: "1rem",       // Space between slides
        pagination: false, // Hide pagination dots
        arrows: true,      // Show navigation arrows
        drag: "free",      // Allow smooth scrolling
        breakpoints: {
            1024: { perPage: 5 },
            768: { perPage: 4 },
            480: { perPage: 3 },
        },
    }}>
                {films.map((film:filmType,index) => (
                film.type == 'Sci-fi'? <SplideSlide>
                         <div className="bg-cover xl:w-[230px] xl:h-[350px] lg:w-[190px] lg:h-[300px] md:w-[140px] md:h-[260px]  bg-center h-[150px] overflow-hidden z-50 h w-[100px] rounded-3xl shadow-xs bg-black shadow-red-500" onClick={() => {movieD(film._id,id)}} >
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            <div className="p-2">
                        <p className="text-[white] text-3xl font-semibold">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] font-semibold ">{film.overview}</Truncate>
                            </div>
                    </div> 
                </SplideSlide>:null
                ))}
                </Splide>
        </div>



        <div>
        <p className="m-3 text-4xl font-bold text-[#E50914]">Romance</p>
            <Splide options={{
        perPage: 5,        // Number of visible slides
        perMove: 1,        // Move one slide at a time
        gap: "1rem",       // Space between slides
        pagination: false, // Hide pagination dots
        arrows: true,      // Show navigation arrows
        drag: "free",      // Allow smooth scrolling
        breakpoints: {
            1024: { perPage: 5 },
            768: { perPage: 4 },
            480: { perPage: 3 },
        },
    }}>
                {films.map((film:filmType,index) => (
                film.type == 'Romance'? <SplideSlide>
                         <div className="bg-cover xl:w-[230px] xl:h-[350px] lg:w-[190px] lg:h-[300px] md:w-[140px] md:h-[260px]  bg-center h-[150px] overflow-hidden z-50 h w-[100px] rounded-3xl shadow-xs bg-black shadow-red-500" onClick={() => {movieD(film._id,id)}} >
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            <div className="p-2">
                        <p className="text-[white] text-3xl font-semibold">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] font-semibold ">{film.overview}</Truncate>
                            </div>
                    </div> 
                </SplideSlide>:null
                ))}
                </Splide>
        </div>



        <div>
        <p className="m-3 text-4xl font-bold text-[#E50914]">Animation</p>
            <Splide options={{
        perPage: 5,        // Number of visible slides
        perMove: 1,        // Move one slide at a time
        gap: "1rem",       // Space between slides
        pagination: false, // Hide pagination dots
        arrows: true,      // Show navigation arrows
        drag: "free",      // Allow smooth scrolling
        breakpoints: {
            1024: { perPage: 5 },
            768: { perPage: 4 },
            480: { perPage: 3 },
        },
    }}>
                {films.map((film:filmType,index) => (
                film.type == 'Animation'? <SplideSlide>
                         <div className="bg-cover xl:w-[230px] xl:h-[350px] lg:w-[190px] lg:h-[300px] md:w-[140px] md:h-[260px]  bg-center h-[150px] overflow-hidden z-50 h w-[100px] rounded-3xl shadow-xs bg-black shadow-red-500" onClick={() => {movieD(film._id,id)}} >
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                            <div>
                        <p className="text-[white] text-3xl font-semibold">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] font-semibold ">{film.overview}</Truncate>
                            </div>
                    </div> 
                </SplideSlide>:null
                ))}
                </Splide>
        </div>
                 

    </div>
}



