import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './pages/home';
import Navbar from './components/Navbar';


function App() {


  return (
    <Router>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
      </Routes>

    </Router>
  )
}

export default App
