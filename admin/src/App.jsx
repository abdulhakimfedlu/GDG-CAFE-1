import React from 'react'
import  { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Menu from './pages/Menu.jsx';
import Employee from './pages/Employee.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Sidebar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        {/* <Route path="/" element={<Menu />} />
        <Route path="/employee" element={<Employee />} /> */}
      </Routes>
    </div>
  )
}

export default App
