import { useState } from "react"
import { useLocation,useNavigate } from "react-router"
type prop = {
    movie:object[],
    id:string
}
type movieType = {
    _id:string,  
    title:string,
}

export const Searchcomp : React.FC<prop> = ({movie,id}) => {
    const [search,setsearch] = useState("")
    console.log(movie)
    const navigate = useNavigate()
function movieD(id:string,userID:string){
    navigate(`/movie?id=${id}&userID=${userID}`)
}
    return <div className="fixed z-50 top-17 w-[100%] flex flex-col items-center bg-[#0000008e] h-[100vh] backdrop-blur-2xl">
        <input 
  type="text" 
  value={search} 
  onChange={(e) => setsearch(e.target.value)} 
  className="bg-black text-white rounded-full p-3 w-[80%] sm:w-[50%] mx-auto my-[30px] border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg"
/>

        {search.length > 0?<div className="grid grid-cols-6 w-[100%]">
            {movie.filter((item:any) => item.title.toLowerCase().includes(search.toLowerCase())).map((mov:any) => (
                <div className="bg-cover xl:w-[230px] xl:h-[400px] lg:w-[190px] lg:h-[300px] md:w-[140px] md:h-[260px]  bg-center h-[150px] overflow-hidden z-50 h w-[100px] rounded-3xl shadow-xs bg-black shadow-red-500" onClick={() => {movieD(mov._id,id)}} >
                <img src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`} alt="not" className="w-[100%] h-[100%]"/>
                <div className="p-2">
            <p className="text-[white] text-3xl font-semibold">{mov.title}</p>
            {/* <Truncate lines={1} className="text-[#E50914] font-semibold ">{mov.overview}</Truncate> */}
                </div>
            </div> 
            ) )}

        </div> :null}
    </div>
}