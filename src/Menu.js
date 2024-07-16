import React from 'react'
import Header from './component/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './component/Home'
import About from './component/About'
import Services from './component/Services'
import Blog from './component/Blog'
import Contact from './component/Contact'

const Menu = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
    
     <Route path='/' element={<Home/>}></Route>
     <Route path='about' element={<About/>}></Route>
     <Route path='service' element={<Services/>}></Route>
     <Route path='blog' element={<Blog/>}></Route>
     <Route path='contact' element={<Contact/>}></Route>
     
    </Routes>
    </BrowserRouter>
 
     </>
  )
}

export default Menu