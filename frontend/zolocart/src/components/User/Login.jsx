import React , { useRef } from 'react'
import styles from "./Login.module.css"
import axios from "axios"

const Login = ({
  setIsAuthorized,
  isAuthorized,
  setUserName
}) => {
  
  const responseRef = useRef()

  const loginUser = async (event)=>{
    event.preventDefault();

    if(isAuthorized){
      return null
    }

    const url = "http://localhost:5000/user/login"

    const response = await axios.post(url,{
        email : event.target.email.value,
        password : event.target.password.value,
    },{
        "Content-type" : "application/json",
        "Access-Control-Allow-Origin":"http://localhost:5173",
        "Access-Control-Allow-Credentials" : true,
        "Accept" : "application/json",
    }).catch(error=>{
      responseRef.current.innerText = "Login Failed!"
      responseRef.current.className = styles.responseMssg + " " + styles.error
      return null
    })
    
    event.target.email.value = ""
    event.target.password.value = ""

    if(response){
      const data = await response.data;
      localStorage.setItem("jwt-token",JSON.stringify(data.token))
      localStorage.setItem("username",JSON.stringify(data.name))
      responseRef.current.innerText = "Login Successfull!"
      responseRef.current.className = styles.responseMssg + " " + styles.success
      setIsAuthorized(true)
      setUserName(data.name)
    }
    else{
      return null
    }

  }

  return (
    <>
        <form method='post' onSubmit={loginUser}>
            <div className={styles.formControl}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder='Email'></input>
            </div>
            <div className={styles.formControl}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder='Password'></input>
            </div>
            <button type="submit" className={styles.submit}>Submit</button>
            <p className={styles.responseMssg} ref={responseRef}></p>
        </form>
    </>
  )
}

export default Login;