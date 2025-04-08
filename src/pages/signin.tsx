import net_1 from "../assets/images/netflix1.png"
import net_2 from "../assets/images/netflix 2.jpeg"
import net_3 from "../assets/images/netflix 3.png"
import net_4 from "../assets/images/netflix 4.png"
import net_5 from "../assets/images/netflix 5.png"
import net_6 from "../assets/images/netflix 6.png"
import net_7 from "../assets/images/netflix 7.jpeg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Loading from "../components/loading"

type item = {
    name:string,
    _id:string
}
export function Signin(){
    const [users, setusers] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [error, seterror] = useState<Error | null >(null)
    const navigate = useNavigate()

    function goHome([id,index]: [any,number]){

        console.log(id)
        navigate(`/Home`, {
            state: {id,index}
        })
        return undefined
    }

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("https://netflix-backend-qegm.onrender.com/users/getUsers")
                const data = await response.json()
                console.log(data.data)
                setusers(data.data.users)
               
            } catch (Error) {
                if(Error){
                    seterror(Error as Error)
                }
            }
        }
        fetchUsers()
        if(users.length > 0){
            console.log(users.length)
            setisLoading(false)
        }
    },[users])
   

    
    
    
     
    if(isLoading){
        console.log(isLoading)
        return <div className="bg-black h-[100vh] w-[100vw] flex items-center justify-center"><Loading/></div>
    }

    if(error){
        return <div>
            error 404
        </div>
    }
    const avatars = [net_1,net_2,net_3,net_4,net_5,net_6,net_7]
    
    return <div className="flex flex-col items-center w-full h-full bg-black p-10 ">
        <p className="text-red-600 text-[50px] font-bold mb-10">NETFLIX</p>
        <p className="text-white font-bold mb-5 text-[20px]">Who's Watching?</p>
        a
     <div className="grid sm:grid-cols-3 grid-cols-2 gap-10">
        {
           users.map((items:item,index) => (
            <div key={index} className="self-center flex flex-col items-center justify-evenly" onClick={() => {goHome([items._id,index])}}>
                 <img src={avatars[index]} alt="" />
                <p className="text-white font-bold">{items.name}</p>
            </div>
           ))
        }
    </div>
    </div>
}