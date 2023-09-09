import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Mybutton from "../components/myButton";
import {getCookie, deleteAllCookies, callApi, logOut, refreshToken} from '../utils/Apiutil'

function Home(userName){
    const navigate = useNavigate()
    const accessToken = getCookie('userToken')
    var email = getCookie("userEmail")
    
    useEffect(() => {
        const handleKeyPress = (e) => {
          if (e.key === 'F5') {
            e.preventDefault()
            let jsonData = refreshToken(accessToken)
            jsonData.then(data => {
                console.log(data)
                alert(`Refresh token thành công, token là :${data.data.token}`)
            })
        };}
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []);
    
    
    function handleCallApi(){
        let jsonData = callApi(accessToken);
        jsonData.then(data => {
            if(data.success){
                document.querySelector('#renderMessage').innerHTML = data.message;
            }
            else{
                document.querySelector('#renderMessage').innerHTML = '';
                alert(data.message)
            }
        })
    }
    
    function signOutHandle(){
        let jsonData = logOut(accessToken)
        jsonData.then( data => {
            deleteAllCookies()
            alert('Đăng xuất thành công')
            console.log(data)
            navigate('/')
        })
    }
    return(
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center">
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Home</h1>
                <p className="text-lg">Hello {email}</p>
                <Mybutton onClick={handleCallApi}>Gọi API</Mybutton>
                <div className="min-h-[150px] text-5xl flex justify-center items-center" id="renderMessage"></div>
                <Mybutton onClick={signOutHandle}>LOG OUT</Mybutton>
            </div>
        </div>
    )
}

export default Home