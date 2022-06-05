import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlreadyLogedIn from "./AlreadyLogedIn";

export default function Login(props){

    let butRef = useRef(null);
    let pRef1 = useRef(null);
    let pRef2 = useRef(null);
    let inRef1 = useRef(null);
    let inRef2 = useRef(null);

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })



    function HandleChange(event){
        setLoginData(function(curr){
            return {
              ...curr,
              [event.target.name]: event.target.value
            }
        })
    }

    function HandleLogin(){
      const currentUser = props.userData.data.find(function(curr){
          return curr.user_username == loginData.username && curr.user_password == loginData.password;
      })
      if(currentUser){
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      window.location.href="https://ch-startups.herokuapp.com";
      }else{
       pRef1.current.setAttribute('style', 'display: block');
       pRef2.current.setAttribute('style', 'display: block');
       inRef1.current.value = '';
       inRef2.current.value = '';
      }
    }

    useEffect(function(){
      if(!props.currentUser?.user_username){
      if(loginData.username){
        if(loginData.password){
            butRef.current.removeAttribute('disabled');
            butRef.current.removeAttribute('style');
        }else{
            butRef.current.setAttribute('disabled', 'disabled');
            butRef.current.setAttribute('style', 'background: rgb(122, 122, 122);')
        }
      }else{
        butRef.current.setAttribute('disabled', 'disabled');
        butRef.current.setAttribute('style', 'background: rgb(122, 122, 122);')
      }
    }
    }, [loginData])

    return(props.currentUser?.user_username ? <AlreadyLogedIn setCurrentUser={props.setCurrentUser}/> :
        (<div className="login">
        <form className="login-form" autoComplete="off">
        <input autoComplete="false" name="hidden" type="text" style={{display: "none"}}/>
        <span className="login-title"><h1>Login into account</h1></span>
        <div className="fields">
        <h4>Username</h4>
        <input placeholder="username" name="username" onChange={HandleChange} value={loginData.username} ref={inRef1}/>
        <p ref={pRef1} style={{display: "none"}}>invalid username or password!</p>
        <h4>Password</h4>
        <input placeholder="password" type='password' name="password" onChange={HandleChange} value={loginData.password} ref={inRef2}/>
        <p  ref={pRef2} style={{display: "none"}}>invalid username or password!</p>
        </div>
        <button type="button" ref={butRef} onClick={HandleLogin}>Login</button>
        <hr/>
        <Link className="login-reg" to='/register'>Register</Link>
        </form>
        </div>)
    )
}