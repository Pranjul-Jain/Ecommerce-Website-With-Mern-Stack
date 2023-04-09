import React , { useState , useEffect } from "react"
import { Routes , Route } from "react-router-dom"
import './App.css'
import MainPage from "./pages/MainPage/MainPage"
import CartPage from "./pages/CartPage/CartPage"

function App() {

  const [isAuthorized,setIsAuthorized] = useState(false)
  const [userName,setUserName] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("jwt-token")){
      setIsAuthorized(true)
      setUserName(JSON.parse(localStorage.getItem("username")))
    }
  },[])

  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<MainPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} userName={userName} setUserName={setUserName} />} />
        <Route path="products/" element={<CartPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} userName={userName} setUserName={setUserName} /> } />
     </Routes>
    </div>
  )
}

export default App
