import React, { useEffect, useState } from "react";
import { Navigate, json, useNavigate } from "react-router-dom";
import Mybtn from "../components/Mybtn";
import {getCookie, deleteAllCookies, callApi, logOut, refreshToken, deleteCookie} from '../utils/Apiutil'

function Home(){
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    let accessToken = getCookie('userToken')
    var email = getCookie("userEmail")

    useEffect(() => {
        if(!accessToken)
            navigate('/')
      }, []);
    
    const handleCallApi =  async() => {
        let element = document.querySelector('#renderMessage')
        if (isLoading) return;
        setIsLoading(true)

        try {
            const callApiData = await callApi(accessToken)
            console.log(`callApi thành công: ${callApiData.success}`)
            if (callApiData.success){
                element.innerHTML = callApiData.message
            } else{
                const refreshTokenData = await refreshToken(accessToken)
                console.log(`refreshToken thành công: ${refreshTokenData.success}` )
                if (refreshTokenData.success){
                    document.cookie = `userToken = ${refreshTokenData.data.token}`
                    accessToken = getCookie('userToken')
                    handleCallApi()
                }else{
                    handleSignOut()
                    alert('Phiên đăng nhập hết hạn. Mời bạn đăng nhập lại')
                    navigate('/')
                }    
            }
        } catch (error) {
            console.error("Lỗi xảy ra", error)
        } finally{
            setIsLoading(false)
        }
    }
    
    const handleSignOut = async() => {
        if (isLoading) return;
        setIsLoading(true)
        try {
            const jsonData = await logOut()
            deleteAllCookies()
            navigate('/')
        } catch (error) {
            console.error("Lỗi xảy ra", error)
        } finally {
            setIsLoading(false)
        }
    }
    return(
        <div className="bg-gray-300 h-screen w-full flex flex-col justify-center">
            <div className="max-w-md w-full m-auto bg-white p-8">
                <h1 className="text-4xl font-bold text-center py-4">Home</h1>
                <p className="text-lg">Hello {email}</p>
                <Mybtn onClick={handleCallApi}>Gọi API</Mybtn>
                <div className="min-h-[150px] text-5xl flex justify-center items-center" id="renderMessage"></div>
                <Mybtn onClick={handleSignOut}>LOG OUT</Mybtn>
            </div>
        </div>
    )
}

export default Home