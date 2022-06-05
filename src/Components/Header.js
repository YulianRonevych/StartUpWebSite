import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

export default function Header(props){

    function handleLogOut(){
        localStorage.setItem("currentUser", null);
        props.setCurrentUser(null);
        window.location.href="https://ch-startups.herokuapp.com";
    }

    return(
        <header>
            <nav>
                <img src={require("../Resources/Logo.jpg")} id="logo" alt="failed"/>
                <ul id="nav-list">
                    <Link to='/'>
                    <li>Home</li>
                    </Link>
                    <Link to='/startups'>
                    <li>Start-ups</li>
                    </Link>
                    <Link to='/about'>
                    <li>About us</li>
                    </Link>
                    <Link to='/help'>
                    <li>Help</li>
                    </Link>
                </ul>
                {props.currentUser?.user_username && <Link id="create-button" to='/createStartUp'>Create start-up</Link>}
                {!props.currentUser?.user_username && <Link  className="sign-in-button" to='/login'>Sign in</Link>}
                {!props.currentUser?.user_username && <Link  id="sign-up-button" to='/register'>Sign up</Link>}
                {props.currentUser?.user_username && <button id="sign-up-button" onClick={handleLogOut}>Sign out</button>}
            </nav>
        </header>
    )
}