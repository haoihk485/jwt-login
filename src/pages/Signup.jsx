import React, { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

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

        setIsLoading(true);
        try {
            if (signUpValid()) {
                const jsonData = await register(email, fullName, password);
                if (jsonData.success) {
                    alert(jsonData.message);
                    navigate("/");
                } else {
                    alert(jsonData.message);
                }
            } else {
                emailAlert()
                passwordAlert()
                fullNameAlert()
                rePasswordAlert()
            }
        } catch (error) {
            console.error("Lỗi xảy ra", error);
        } finally {
            setIsLoading(false);
        }
    };
    function emailAlert() {
        if (validator.isEmail(email)) {
            document.querySelector('#emailAlert').innerHTML = ''
        } else {
            document.querySelector('#emailAlert').innerHTML = 'Email không hợp lệ'
        }
    }
    function fullNameAlert() {
        if (fullName) {
            document.querySelector('#fullNamedAlert').innerHTML = ''
        } else {
            document.querySelector('#fullNamedAlert').innerHTML = 'Vui lòng nhập tên'
        }
    }
    function passwordAlert() {
        if (password) {
            document.querySelector('#passwordAlert').innerHTML = ''
        } else {
            document.querySelector('#passwordAlert').innerHTML = 'Vui lòng nhập mật khẩu'
        }
    }
    function rePasswordAlert() {
        if (password === confirmPassword && confirmPassword) {
            document.querySelector('#repasswordAlert').innerHTML = ''
        } else {
            document.querySelector('#repasswordAlert').innerHTML = 'Nhập lại password không đúng'

        }
    }
    function signUpValid() {
        if (validator.isEmail(email)
            && fullName
            && password === confirmPassword) {
            return true;
        }
        return false
    }
    return (
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center"  >
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Sign up</h1>
                <Myinput value={email} onChange={(e) => setEmail(e.target.value)} type="email" onBlur={emailAlert}>Email:</Myinput>
                <Alertp id="emailAlert"></Alertp>
                <Myinput value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" onBlur={fullNameAlert}>Full name:</Myinput>
                <Alertp id="fullNamedAlert"></Alertp>
                <Myinput value={password} onChange={(e) => setPassword(e.target.value)} type="password" onBlur={passwordAlert}>Password:</Myinput>
                <Alertp id="passwordAlert"></Alertp>
                <Myinput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" onBlur={rePasswordAlert}>
                    Confirm password:</Myinput>
                <Alertp id="repasswordAlert"></Alertp>
                <Mybtn onClick={handleSignUp}
                    loading={isLoading}>Sign up</Mybtn>
            </div>
        </div>
    )
}
export default Signup