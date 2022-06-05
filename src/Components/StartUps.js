import axios from "axios";
import React, { useEffect, useState } from "react";
import StartUpContainer from "./StartUpContainer";

export default function StartUps(){


    const [sData, setSData] = useState();

    useEffect(function(){
       axios.get('https://ch-startups-server.herokuapp.com/startups').then(function(data){
           setSData(data);
       })
    }, [])


    return(
        <div className="startups">
        <div className="startups-container-info">
        <img src={require("../Resources/startups.jpg")} className='startups-intro'/>
        </div>
        <h1 id="startups-header">Start donating now</h1>
        <h3 id="startups-header-low">Here is list of the most recent start-ups</h3>
        <div className="st-list">
        {sData?.data.map(function(curr, i){
            return <StartUpContainer data={sData} index={i}/>
        })}
        </div>
        </div>
    )
}