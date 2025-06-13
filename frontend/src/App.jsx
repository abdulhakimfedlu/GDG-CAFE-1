import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import About from './pages/About'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
