import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AlreadyLogedIn from "./AlreadyLogedIn";  

export default function Register(props){


    let myRef = useRef(null);
    let myRef1 = useRef(null);
    let myRef2 = useRef(null);
    let myRef3 = useRef(null);

   const [registerForm, setRegisterForm] = useState({
       name: '',
       surname: '',
       country: '',
       city: '',
       username: '',
       password: '',
       email: ''
   });

   useEffect(function(){
    myRef2.current.setAttribute('class', 'none');
    myRef2.current.setAttribute('disabled', 'disabled');
   }, [])

   function HandleForm(event){
    const target = event.target;
       setRegisterForm(function(curr){
           return {
               ...curr,
               [target.name]: target.value
           }
       });
   }

   async function HandleRegBut(e){
       e.preventDefault();
       try{
           const {data} = axios.post('https://ch-startups-server.herokuapp.com/register', registerForm).then(function(response){
               console.log(response);
            if(response.status === 200){
                window.location.href="https://ch-startups.herokuapp.com/registerSuccesful";
            }
           }).catch(function(err){
            window.location.href="https://ch-startups.herokuapp.com/somethingWentWrong";
           });
       }catch(err){
           window.location.href="https://ch-startups.herokuapp.com/somethingWentWrong";
        //    console.log(err);
       }
   }

   useEffect(function(){

     let userTF = true, passTF = true, mailTF = true;

       if(registerForm.name){
          console.log(registerForm.name)
       }
       if(registerForm.surname){
        console.log(registerForm.surname);
    }
    if(registerForm.country){
        console.log(registerForm.country);
    }
    if(registerForm.username){
        if(props?.userData?.data.find((curr)=>{
            return curr.user_username == registerForm.username
        })){
            myRef.current.setAttribute('style', 'display: block;');
            userTF = false;
        }else{
            myRef.current.setAttribute('style', 'display: none;');
            userTF = true;
        }
    }else{
        myRef.current.setAttribute('style', 'display: none;');
        userTF = false;
    }
    if(registerForm.password){
        if(registerForm.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
            myRef1.current.setAttribute('style', 'display: none;');
            passTF = true;
        }else{
            myRef1.current.setAttribute('style', 'display: block;');
            passTF = false;
        }
    }else{
        myRef1.current.setAttribute('style', 'display: none;');
        passTF = false;
    }
    if(registerForm.city){
        console.log(registerForm.city);
    }
    if(registerForm.email){
        if(props?.userData?.data.find((curr)=>{
            return curr.user_email == registerForm.email
        })){
            myRef3.current.setAttribute('style', 'display: block;');
            mailTF = false;
        }else{
            myRef3.current.setAttribute('style', 'display: none;');
            mailTF = true;
        }
    }else{
        myRef3.current.setAttribute('style', 'display: none;');
        mailTF = false
    }

    if(userTF && passTF && mailTF){
        myRef2.current.setAttribute('class', 'submit-reg-from');
        myRef2.current.removeAttribute('disabled');
    }else{
        myRef2.current.setAttribute('class', 'none');
        myRef2.current.setAttribute('disabled', 'disabled');
    }
   }, [registerForm])

    return(props.currentUser ? <AlreadyLogedIn setCurrentUser={props.setCurrentUser}/> :
        (<div className="register">
        <form className="register-form">
         <span className="reg-form-title"><h1>Register new account</h1></span>
         <div className="name-surname">
         <h4>Name</h4>
         <h4>Surname</h4>
         </div>
         <div className="name-surname-input">
         <input placeholder="name" name="name" value={registerForm.name} onChange={HandleForm} autoComplete="nope"/>
         <input placeholder="surname" name="surname" value={registerForm.surname} onChange={HandleForm} autoComplete="nope"/>
         </div>
         <div className="country-city">
         <h4>Country</h4>
         <h4>City</h4>
         </div>
         <div className="country-city-input">
         <input placeholder="country" name="country" value={registerForm.country} onChange={HandleForm} autoComplete="nope"/>
         <input placeholder="city" name="city" value={registerForm.city} onChange={HandleForm} autoComplete="nope"/>
         </div>
         <div className="login-password">
         <h4>Username</h4>
         <h4>Password</h4>
         </div>
         <div className="login-password-input">
         <input placeholder="username" name="username" value={registerForm.username} onChange={HandleForm} autoComplete="nope"/>
         <div className="inv-username" ref={myRef} style={{display: 'none'}}>username already taken!</div>
         <div className="inv-password" ref={myRef1} style={{display: 'none'}}>password must contain('Aa-Zz' and<br/> '0-9')! Check your language!</div>
         <input placeholder="password" type='password' name="password" value={registerForm.password} onChange={HandleForm} autoComplete="nope"/>
         </div>
         <h4>Email</h4>
         <input className="email-input" placeholder="email" type="text" name="email" value={registerForm.email} onChange={HandleForm} autoComplete="false"/>
         <div className="inv-email"  ref={myRef3}>email already registered!</div>
         <button className='submit-reg-from' ref={myRef2} onClick={HandleRegBut}>Register</button>
         <hr/>
         <Link className="reg-login" to='/login'>Login</Link>
        </form>
        </div>)
    )
}