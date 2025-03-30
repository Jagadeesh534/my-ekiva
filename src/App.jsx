import { useState } from 'react'
import './App.css'
import Landing from './app/components/Landing'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './app/components/Login'
import Dashboard from './app/components/Dashboard'
import Layout from './app/components/Layout'
import NotFound from './app/components/NotFound'

function App() {

  return (
    <>
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      {/* Protected Routes with Layout */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
