import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useState } from "react"


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  return (
   <>
   
   <Routes>
    <Route  path="/home" element={<Home loggedIn={loggedIn} />} />
    <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
    <Route path="/register" element={<Register />} />
   </Routes>
   
   </>
  )
}

export default App
