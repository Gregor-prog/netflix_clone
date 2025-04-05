import "./global.css"
import { BrowserRouter, Route, Routes } from "react-router"
import Signupin from "./pages/signupin"
import Home from "./pages/home"
import { SingleMovie } from "./pages/singMovie"
import { Authcontextprovider } from "./isLogincontext"
import Favourites from "./pages/favourites"
import Wishlists from "./pages/wishlists"

function App(){
  return <div className="overflow-hidden w-[100vw]">
    <Authcontextprovider>
    <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Home/>} />
      <Route path="/" element={<Signupin/>}/>
      <Route path="/movie" element={<SingleMovie/>}/>
      <Route path="/favourites" element={<Favourites/>}/>
      <Route path="/wishList" element={<Wishlists/>}/>
    </Routes>
    </BrowserRouter>
    </Authcontextprovider>
  </div>
}

export default App