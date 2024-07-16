import React from 'react'
// import Form2 from './Form2'
// import API from './API'
import Form from './Form'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import Menu from './Menu'
// import Contact from './component/Contact'
import Table from './Table'



const App = () => {
  return (
    <>
    {/* <Menu/> */}
   
    {/* <Form2/> */}
    {/* <API/> */}
   
    <BrowserRouter>
    
    <Routes>
    <Route path='/' element={<Form/>}></Route>
  <Route path='/table' element={<Table/>}></Route>
     
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App