import React, { useState  } from "react";
import { useNavigate, Link } from "react-router-dom";

import Mybutton from "../components/Mybutton"
import Myinput from "../components/Myinput";
import Alertp from "../components/Alertp";
import {logIn} from "../utils/Apiutil"

function Signin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    
    function handleSignIn (){
        var jsonData = logIn(email, password);
        console.log(jsonData)
        jsonData.then(data => {
            alert(data.message)
            if (data.success){
                document.cookie = `userEmail = ${data.data.email}`
                document.cookie = `userToken = ${data.data.token}`
                navigate('/home')
            }            
        })
    }

    return(
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center">
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Sign in</h1>
                <Myinput value = {email} onChange={(e) => setEmail(e.target.value)} type="email">Email:</Myinput>
                <Alertp id = "emailAlert"></Alertp>
                <Myinput value = {password} onChange={(e) => setPassword(e.target.value)} type="password">Password:</Myinput>
                <Alertp id = "passwordAlert"></Alertp>
                <Mybutton onClick = {handleSignIn}>Sign in</Mybutton>
                <div className="text-center">
                    <p>New user? <Link to="/signup" className="text-teal-300 font-bold">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin