import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFound from './Components/NotFound';
import Register from './Components/Register';
import Footer from './Components/Footer';
import StartUps from './Components/StartUps';
import About from './Components/About';
import Help from './Components/Help';
import axios from 'axios';
import RegisterSuccess from './Components/RegisterSuccess';
import SomethingWentWrong from './Components/SomethingWentWrong';
import {useIdleTimer} from "react-idle-timer";
import ModalWin from "./Components/ModalWin";
import CreateStartUp from './Components/CreateStrartUp';
import CreateSuccessful from './Components/CreateSuccessful';
import StartUpItem from './Components/StartUpItem';



export default function App() {

  function onIdle(){
    if(currentUser){
    setShow(true);
    }
  }

  const onAction = function(){
     idleTimer.reset();
  }

  const idleTimer = useIdleTimer({
    onIdle,
    onAction,
    timeout: 240*1000,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
      'MSPointerDown',
      'MSPointerMove',
      'visibilitychange'
    ],
    crossTab: true,
  })

  const [usersData, setUsersData] = useState();

  const [currentUser, setCurrentUser] = useState(null);

  function onHide(e){
    if(e.target.name == 'continue'){
      idleTimer.reset();
      setShow(false);
    }else{
      window.location.href="https://ch-startups.herokuapp.com";
      setCurrentUser(null);
      localStorage.setItem("currentUser", null);
      setShow(false);
    }
  }

  useEffect(function(){
    try{
    axios.get('https://ch-startups-server.herokuapp.com/register').then(function(data){
      setUsersData(data)
    }).catch(function(err){
      console.log('Bad;');
    })
  }catch(err){
    throw err;
  }
  }, [])

  useEffect(function(){
    if(localStorage.getItem("currentUser")){
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, [])

  function HandleUserChange(user){
    setCurrentUser(user);
  }

  const [show, setShow] = useState(false);

  return (
    <Router>
    <div className="App">
    <ModalWin  show = {show} onHide= {onHide}/>
      <Header  currentUser = {currentUser} setCurrentUser = {HandleUserChange}/>
      <Routes>
      <Route path='/' exact element={<Main currentUser={currentUser}/>} />
      <Route path='/login' exact element={<Login userData = {usersData}  setCurrentUser = {HandleUserChange} currentUser={currentUser}/>} />
      <Route path='/register' exact element={<Register userData = {usersData} setCurrentUser = {HandleUserChange} currentUser={currentUser}/>} />
      <Route path='/startups' exact element={<StartUps/>} />
      <Route path='/about' exact element={<About/>} />
      <Route path='/help' exact element={<Help/>} />
      <Route path='/registerSuccesful' exact element={<RegisterSuccess/>} />
      <Route path='/createSuccessful' exact element={<CreateSuccessful/>} />
      <Route path='/somethingWentWrong' exact element={<SomethingWentWrong/>} />
      <Route path='/createStartUp' exact element={<CreateStartUp currentUser={currentUser}/>} />
      <Route path='/startUpItem/:id' element={<StartUpItem/>}/>
      <Route path='*' exact element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

