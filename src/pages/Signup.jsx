import React, { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../utils/Apiutil"
import Mybtn from "../components/Mybtn"
import Myinput from "../components/Myinput";
import Alertp from "../components/Alertp";


function Signup() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true)
        try {
            if (signUpValid()) {
                const jsonData = await register(email, fullName, password)
                alert(jsonData.message)
                if (jsonData.success) {
                    navigate("/");
                }
            } else {
                emailAlert()
                passwordAlert()
                fullNameAlert()
                rePasswordAlert()
            }
        } catch (error) {
            console.error("Lỗi xảy ra", error)
        } finally {
            setIsLoading(false)
        }
    }
    function emailAlert() {
        let element = document.querySelector('#emailAlert')
        element.innerHTML = validator.isEmail(email) ? '': 'Email không hợp lệ'
    }
    function fullNameAlert() {
        let element = document.querySelector('#fullNamedAlert')
        element.innerHTML = fullName ? '': 'Vui lòng nhập tên'
    }
    function passwordAlert() {
        let element = document.querySelector('#passwordAlert')
        element.innerHTML = password ? '': 'Vui lòng nhập mật khẩu'
    }
    function rePasswordAlert() {
        let element = document.querySelector('#repasswordAlert')
        element.innerHTML = (password === confirmPassword && confirmPassword) ? '': 'Nhập lại password không đúng'
    }
    function signUpValid() {
        return (validator.isEmail(email)
                && fullName
                && password === confirmPassword) ? true : false
    }
    function passwordInputChange(e){
        setPassword(e.target.value)
        setConfirmPassword('')
        document.querySelector('#repasswordAlert').innerHTML = ''
    }
    return (
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center"  >
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Sign up</h1>
                <Myinput value={email} onChange={(e) => setEmail(e.target.value)} type="email" onBlur={emailAlert}>Email:</Myinput>
                <Alertp id="emailAlert"></Alertp>
                <Myinput value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" onBlur={fullNameAlert}>Full name:</Myinput>
                <Alertp id="fullNamedAlert"></Alertp>
                <Myinput value={password} onChange={passwordInputChange} type="password" onBlur={passwordAlert}>
                        Password:</Myinput>
                <Alertp id="passwordAlert"></Alertp>
                <Myinput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" onBlur={rePasswordAlert}>
                    Confirm password:</Myinput>
                <Alertp id="repasswordAlert"></Alertp>
                <Mybtn onClick={handleSignUp}
                    loading={isLoading}>Sign up</Mybtn>
                <div className="text-center">
                    <p>Have an account? <Link to="/" className="text-teal-300 font-bold">Sign in</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Signup