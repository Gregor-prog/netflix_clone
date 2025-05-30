import { useContext, useState } from "react"
// import { useNavigate } from "react-router-dom"
import IsLogincontext from "../isLogincontext"
import { Toaster, toast } from 'sonner';


 function Signup(){
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [isLogin,setisLogin] = useContext(IsLogincontext)
    // const Navigation = useNavigate()
    async function submit(e:any){
        e.preventDefault()
        try {
            if(email == ""){
                throw new Error("email field is empty");
            }
            if(password == ""){
                throw new Error("password field is empty");
            }
            const post = await fetch("https://netflix-backend-qegm.onrender.com/users/signin", {
                method:"POST",
                headers:{
                    "Content-type":'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password:password
                })
            })

            if(!post.ok){
                const response = await post.json()
                console.log(response.data.error)
                console.log("cj")
                throw new Error(response.data);
                console.log(isLogin)
            }

            if(post.ok){
                toast.success("Login successfully")
                console.log(post.ok)
                setisLogin(true)
            }
        } catch (error) {
            if(error){
                console.log(error)
                toast.error("email or password is incorrect")
            }else{
                toast.success("Login successfully")
            }
        }
    }
    return <div className="w-[100%] flex flex-row items-center justify-center mt-[20%] sm:mt-[5%]">
        <Toaster position="top-center" richColors/>
        <form onSubmit={(e) => submit(e)} action="" className="sm:w-[35%] w-[90%] bg-[#000000b2] p-4 flex flex-col items-center h-[400px] justify-evenly">
            <h1 className="text-[25px] text-[white] font-semibold ">Sign In</h1>
            <input type="email" value={email} onChange={(e) => setemail(e.target.value)}  className="w-[80%] h-[40px] rounded-[12px] bg-white text-black p-2 " placeholder="Enter your email"/>
            <div className="w-[80%] text-right">
            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}  className="w-[100%] h-[40px] rounded-[12px] bg-white text-black p-2 " placeholder="Enter your password"/> <br />
            {/* <a href="/login" className="text-white mr-[20px]">login</a> */}
            </div>
            
            <button className="w-[50%] h-[40px] bg-red-500 text-white rounded-xl">Sign-In</button>
        </form>
    </div>
}

export default Signup