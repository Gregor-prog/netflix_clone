import { useEffect, useState } from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { MiddleTruncate,Truncate } from '@re-dev/react-truncate'



export function Movie(){
    const [films,setfilms] = useState([])
    const [error,seterror] = useState(null)

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
            return <div className="text-white">
                ...Loading
            </div>
        }
        if(error){
            return <p>
                error 404
            </p>
        }
    return <div className="mt-[150px] p-6">
        {/* action,scifi,Romance,Animation */}
        <p className="text-center w-fulll text-white">RECOMMENDED MOVIES</p>
        <div>
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
        },
    }}>
                {films.map((film:filmType,index) => (
                film.type == 'Action'? <SplideSlide>
                         <div className="bg-cover bg-center h-[250px] p-2 flex flex-col justify-end w-[230px] rounded-2xl" style={{backgroundImage:`url(${'https://image.tmdb.org/t/p/w500'+film.backdrop_path})`}}>
                        <p className="text-[white] text-3xl font-semibold">{film.title}</p>
                        <Truncate lines={1} className="text-[#E50914] font-semibold ">{film.overview}</Truncate>
                    </div> 
                </SplideSlide>:null
                ))}
                </Splide>
        </div>

                <div className="fixed w-[100vw] min-h-screen top-0 left-0 bg-[#494949]">

                </div>

    </div>
}



