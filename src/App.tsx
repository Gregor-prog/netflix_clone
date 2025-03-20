import "./global.css"
import { BrowserRouter, Route, Routes } from "react-router"
import Signupin from "./pages/signupin"
import Home from "./pages/home"
import { Authcontextprovider } from "./isLogincontext"

function App(){
  return <div className="overflow-hidden w-[100vw]">
    <Authcontextprovider>
    <BrowserRouter>
    <Routes>
      <Route path="/Home" element={<Home/>} />
      <Route path="/" element={<Signupin/>}/>
    </Routes>
    </BrowserRouter>
    </Authcontextprovider>
  </div>
}

export default App