import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './pages/home';
import Navbar from './components/Navbar';
import Search from './pages/search';
import Aboutus from './pages/aboutus';


function App() {


  return (
    <Router>
      <div>
        <Navbar/>
      </div>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/search' element = {<Search/>}/>
        <Route path = '/aboutus' element = {<Aboutus/>}/>
      </Routes>

    </Router>
  )
}

export default App
