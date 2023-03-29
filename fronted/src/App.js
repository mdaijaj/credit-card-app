import './App.css';
import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar'
import Routing from './components/routes';

const App=()=> {
  const [login, setLogin]= useState("")

  useEffect(()=>{
    let userInf= localStorage.getItem('user')
    userInf= JSON.parse(userInf)
    setLogin(userInf)
}, [])  


  return (
    <>
    <div className="App">
      <Navbar login={login}/>
      <Routing/>
    </div>
    </>
  );
}

export default App;
