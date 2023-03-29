import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/home'
import Login from '../components/login'
import Signup from '../components/signup'
import { ShowCards } from './cards/all_cards';
import {Newcards} from './cards/add_card'

const Routing=()=>{

  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/login" element={<Login/>} />  
        <Route path="/signup" element={<Signup/>} />  
        <Route path="/allcards" element={<ShowCards/>} />  
        <Route path="/newcard" element={<Newcards/>} />  
      </Routes>
    </>
  )
}

export default Routing;