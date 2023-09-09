import React, { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import {register} from "../utils/Apiutil"
import Mybutton from "../components/myButton";
import Myinput from "../components/Myinput";
import Alertp from "../components/Alertp";


function Signup(){
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    


    function handleSignUp(){
        var jsonData = register(email, fullName, password);
        jsonData.then(data => {
            if(data.success){
                alert(data.message)
                navigate('/')
            }
            else
            {
                alert(data.message)
            }
        })
    }
    return(
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center"  >
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Sign up</h1>
                <Myinput value={email} onChange={(e)=>setEmail(e.target.value)} type="email">Email:</Myinput>
                <Alertp id = "emailAlert"></Alertp>
                <Myinput value={fullName} onChange={(e)=>setFullName(e.target.value)} type="text">Full name:</Myinput>
                <Alertp id = "fullNamedAlert"></Alertp>
                <Myinput value={password} onChange={(e)=>setPassword(e.target.value)} type="password">Password:</Myinput>
                <Alertp id = "passwordAlert"></Alertp>
                <Myinput value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="rePassword">
                    Confirm password:</Myinput>
                <Alertp id = "repasswordAlert"></Alertp>
                <Mybutton onClick={handleSignUp}>Sign up</Mybutton>
            </div>
        </div>
    )
}
export default Signup