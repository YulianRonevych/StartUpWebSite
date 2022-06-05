import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getDownloadURL, listAll, ref } from "firebase/storage";
import storage from "./firebase";


export default function StartUpItem(){

let params = useParams();

const [sData, setSData] = useState();
const [allImg, setAllImg] = useState([]);
const [imgName, setImgName] = useState(null);

const ImageRef = ref(storage, 'images/');

useEffect(function(){
    axios.get(`https://ch-startups-server.herokuapp.com/startUpItem/${params.id}`).then(function(data){
        setSData(data);
    })

   listAll(ImageRef).then(function(urls){
      urls.items.forEach(function(curr){
          getDownloadURL(curr).then(url=>{
              setAllImg(curr=>[...curr, url])
          })
      })
   })
}, [])

console.log(sData);
console.log(allImg);
console.log(allImg.filter(curr=>curr.includes(params.id)));

useEffect(function(){
   setImgName(allImg.filter(curr=>curr.includes(params.id)));
}, [setAllImg])


return (
    <div className="sti">
    <div className="stiform">

    <div className="sti-intro">
    <p className="sti-name">
    {sData?.data[0].name}
    </p>
    <img alt="preview" src={allImg.filter(curr=>curr.includes(params.id))} className="startupitem-intro"/>
    </div>
     
    <div className="sti-descr">
    Description
    <div className="sti-content">
    {sData?.data[0].description}  
       </div>
    </div>

    <div className="sti-data">
     <div className="sti-create">
      <div className="sti-author">
      <p>Created by</p>
      <input readOnly value={sData?.data[0].username}/>
      </div>
      <div className="sti-date">
      <p>Date of submition</p>
      <input readOnly value={sData?.data[0].dateOfCreation.split('T')[0]}/>
      </div>
     </div>
     <div className="sti-create">
      <div className="sti-author">
      <p>Deadline of raising</p>
      <input readOnly value={sData?.data[0].raiseDate.split('T')[0]}/>
      </div>
      <div className="sti-date">
      <p>Deadline of start-up</p>
      <input readOnly value={sData?.data[0].endDate.split('T')[0]}/>
      </div>
     </div>
     <div className="sti-create" style={{justifyContent: 'center'}}>
      <div className="sti-author">
      <p>Target($)</p>
      <input readOnly value={sData?.data[0].raiseAmount}/>
      </div>
     </div>
     <Link to='/' className="submit-startup">Donate</Link>
     <Link to="/startUps" className="submit-startup">Back</Link>
    </div>

    </div>
    </div>
    )
}