import React , { useRef } from 'react'
import axios from "axios"

const Userbatch = ({
    username,
    batchclass,
    logoutClass,
    setIsAuthorized
}) => {
  
  const logoutRef = useRef();

  const toggleLogout = ()=>{
    if(!logoutRef.current.style.display){
        logoutRef.current.style.display = "block"
    }
    else{
        logoutRef.current.style.display = null
    }

  }

  const logoutUser = async ()=>{
    const url = "http://localhost:5000/logout"

    const response = axios.delete(url,{
        headers:{
            "Authorization" : `Bearer ${JSON.parse(localStorage.getItem('jwt-token'))}`
        }
    })
    .catch(error=>{
        setIsAuthorized(false)
    })

    if(response){
        localStorage.removeItem('jwt-token');
        localStorage.removeItem("username");
        setIsAuthorized(false)
    }
  }

  return (
    <div>
      <button className={batchclass} onClick={toggleLogout}>{username}</button>
      <button className={logoutClass} onClick={logoutUser} ref={logoutRef}>Logout</button>
    </div>
  )
}

export default Userbatch;