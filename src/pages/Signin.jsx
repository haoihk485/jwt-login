import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

import Mybtn from "../components/Mybtn"
import Myinput from "../components/Myinput";
import Alertp from "../components/Alertp";
import { logIn } from "../utils/Apiutil"

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const handleSignIn = async () => {

        if (isLoading) { return; }

        setIsLoading(true)

        try {
            if (signInValid()) {
                var jsonData = await logIn(email, password)
                console.log(jsonData)
                alert(jsonData.message)
                if (jsonData.success) {
                    document.cookie = `userEmail = ${jsonData.data.email}`
                    document.cookie = `userToken = ${jsonData.data.token}`
                    navigate('/home')
                }
            }else{
                emailAlert()
                passwordAlert()
            }

        } catch (error) {
            console.error("Lỗi xảy ra", error);
        } finally {
            setIsLoading(false)
        }
    }
    function emailAlert() {
        let element = document.querySelector('#emailAlert')
        element.innerHTML = validator.isEmail(email) ? '': 'Email không hợp lệ'
    }
    function passwordAlert() {
        let element = document.querySelector('#passwordAlert')
        element.innerHTML = password ? '': 'Vui lòng nhập mật khẩu'
    }
    function signInValid(){
        return (validator.isEmail(email) && password) ? true : false
    }

    return (
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center">
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Sign in</h1>
                <Myinput value={email} onChange={(e) => setEmail(e.target.value)} type="email" onBlur={emailAlert}>Email:</Myinput>
                <Alertp id="emailAlert"></Alertp>
                <Myinput value={password} onChange={(e) => setPassword(e.target.value)} type="password" onBlur={passwordAlert}>Password:</Myinput>
                <Alertp id="passwordAlert"></Alertp>
                <Mybtn onClick={handleSignIn}>Sign in</Mybtn>
                <div className="text-center">
                    <p>New user? <Link to="/signup" className="text-teal-300 font-bold">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin