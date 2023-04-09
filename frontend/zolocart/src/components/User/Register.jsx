import React , { useRef } from 'react'
import styles from "./Login.module.css"
import axios from "axios"

const Register = ({
    isAuthorized,
}) => {

  const responseRef = useRef()

  const registerUser = async (event)=>{
    event.preventDefault();

    if(isAuthorized){
        responseRef.current.innerText = "You Are Already Login"
        responseRef.current.className = styles.responseMssg + " " + styles.success
        return null;
    }

    if(event.target.password.value !== event.target['confirm password'].value){
        responseRef.current.innerText = "Password does not match"
        responseRef.current.className = styles.responseMssg + " " + styles.error
        return null
    }

    const url = "http://localhost:5000/user/register"

    const response = await axios.post(url,{
        name:event.target.name.value,
        email : event.target.email.value,
        password : event.target.password.value,
    })
    .catch(error=>{
        console.log(error)
        responseRef.current.innerText = "Registeration Failed!"
        responseRef.current.className = styles.responseMssg + " " + styles.error
        return null
    })

    event.target.name.value = ""
    event.target.email.value = ""
    event.target.password.value = ""

    if(response){
        responseRef.current.innerText = "Registered Succesfully!"
        responseRef.current.className = styles.responseMssg + " " + styles.success
    }
    else{
        return null
    }
  }

  return (
    <>
        <form method='post' action="/" onSubmit={registerUser}>
            <div className={styles.formControl}>
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required placeholder='Username' />
            </div>
            <div className={styles.formControl}>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder='Email' />
            </div>
            <div className={styles.formControl}>
                <label for="password">Password</label>
                <input type="password" id="password" required name="password" placeholder='Password' />
            </div>
            <div className={styles.formControl}>
                <label for="confirm password">Co-Password</label>
                <input type="password" id="confirm password" required name="confirm password" placeholder='Confirm Password' />
            </div>
            <button type="submit" className={styles.submit}>Submit</button>
            <p ref={responseRef}></p>
        </form>
    </>
  )
}

export default Register;