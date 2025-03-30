import { useState } from 'react'
import './App.css'
import Landing from './app/components/Landing'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './app/components/Login'

function App() {

  return (
    <>
    <div>

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
    </>
  )
}

export default App
