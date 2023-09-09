import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
