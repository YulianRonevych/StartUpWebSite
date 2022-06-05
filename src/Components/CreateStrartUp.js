import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import storage from "./firebase";
import {ref, uploadBytes} from 'firebase/storage';


export default function CreateStartUp(props){

   const imgRef = useRef(null);
   const dateRef = useRef(null);
   const authorRef = useRef(null);
   const buttonRef = useRef(null);
   const pRef = useRef(null);

   const [startUp, setStartUp] = useState({
     id:'',
     user: '',
     name: '',
     image: '',
     description: '',
     raiseDate: '',
     endDate: '',
     dateOfCreation: '',
     raiseAmount: '',
     filetype: ''
   });

   function handleChange(event){
       setStartUp(function(curr){

        let img, name, newFile;

         if(event.target.name == 'image'){
             img = event.target.files[0];
             name = event.target.files[0].name;

             let blob = img.slice(0, img.size, img.type); 
             newFile = new File([blob], `${startUp.id}.${img.type.split('/')[1]}`, {type: img.type});

             if(newFile.type.split('/')[1] !== 'png' && newFile.type.split('/')[1] !== 'jpg' && newFile.type.split('/')[1] !== 'jpeg' && newFile.type.split('/')[1] !== 'webp'){
                 newFile = '';
                imgRef.current.removeAttribute('src');
             }else{
                 setStartUp(function(curr){
                     return {
                         ...curr,
                         filetype: newFile.type.split('/')[1]
                     }
                 })
             }

             console.log(newFile);
             
         }

           return {
               ...curr,
               [event.target.name]: event.target.name == 'image' ? newFile : event.target.value
           }
       })
   }

   useEffect(function(){
    if(startUp.image){
     const img = URL.createObjectURL(startUp.image);
     imgRef.current.src = img;
    }
    if(startUp.name && startUp.image && startUp.description && startUp.raiseDate && startUp.endDate && startUp.dateOfCreation && startUp.raiseAmount && startUp.raiseAmount !== '0'){
      buttonRef.current.removeAttribute('style');
      buttonRef.current.removeAttribute('disabled');
      pRef.current.setAttribute('style', 'display: none;')
    }else{
        buttonRef.current.setAttribute('style', 'background: rgb(122, 122, 122);');
        buttonRef.current.setAttribute('disabled', 'disabled');
        pRef.current.setAttribute('style', 'display: block;')
    }
   }, [startUp])

   function handleSubmit(e){
       e.preventDefault();

       const formData = new FormData();
       formData.append('image', startUp.image)

       console.log(startUp.image);

       const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
       }

       const config1 = {
        headers: {
            'content-type': 'application/json'
        }
    }

    //    axios.post('https://ch-startups-server.herokuapp.com/upload', formData, config).then(function(res){
    //        console.log(res);
    //    },
    //    function(err){
    //        console.log(err);
    //    }
    //    );

    const imageRef = ref(storage, `images/${startUp.image.name}`);
    uploadBytes(imageRef, startUp.image).then(function(){
        console.log('Image Loaded');
    })


       axios.post('https://ch-startups-server.herokuapp.com/createStartUp', startUp, config1).then(function(response){
               console.log(response);
            if(response.status === 200){
                window.location.href="https://ch-startups.herokuapp.com/createSuccessful";
            }
           }).catch(function(err){
            window.location.href="https://ch-startups.herokuapp.com/somethingWentWrong";
           });
   }

   useEffect(function(){
     const date = new Date();
     const day = date.getDay();
     const month = date.getMonth();
     const year = date.getFullYear();

     dateRef.current.value = `${year}-${month/10 < 1 ? '0' + month : month}-${day/10 < 1 ? '0' + day : day}`

     setStartUp(function(curr){
        return {
            ...curr,
            dateOfCreation: `${year}-${month/10 < 1 ? '0' + month : month}-${day/10 < 1 ? '0' + day : day}`
        }
    });

    const uid = uuid();
    const smallid = uid.slice(0,8);
    
    setStartUp(function(curr){
        return {
            ...curr,
            id: smallid
        }
    });

    setStartUp(function(curr){
        return {
            ...curr,
            user: props.currentUser?.user_username
        }
    });
   }, [])

return (
        <div className="cs">
        <form className="csform" autoComplete="off">
        <input autoComplete="false" name="hidden" type="text" style={{display: "none"}}/>
        <div className="create-title">
        <h1>Create start-up</h1>
        </div>
        <div className="create-content">
        <label className="label-image">
        <img ref={imgRef} className='pre-img'/>
         <p>Please select image</p>
         <h6>tap here to select</h6>
         <h6>.png, .jpg, .jpeg, .webp</h6>
         <input type='file' name='image' className="input-image" accept=".png, .jpg, .jpeg, .webp" onChange={handleChange}/>
         </label>
         <div className="create-data">
         <div className="first-row">
             <div>
            <h6>Name of start-up</h6>
             <input name="name" placeholder="name" value={startUp.name} onChange={handleChange} />
             </div>
             <div>
             <h6>Author</h6>
             <input ref={authorRef} name="author" readOnly  value={`${props.currentUser?.user_name} ${props.currentUser?.user_surname}`}/>
             </div>
             <div>
             <h6>Date of Creation</h6>
            <input  ref={dateRef} name="dateOfCreation" readOnly/>
             </div>
         </div>
         <div className="second-row">
             <div className="first-part">
             <h6>Description</h6>
             <textarea className="description" onChange={handleChange} placeholder="description..." name="description" value={startUp.description}></textarea>
             </div>
             <div className="second-part">
           <div>
             <div>
            <h6>Deadline of raising money</h6>
            <input type='date' name="raiseDate" onChange={handleChange} value={startUp.raiseDate}/>
             </div>
             <div>
            <h6>Deadline of start-up</h6>
            <input type='date' name="endDate" onChange={handleChange} value={startUp.endDate}/>
             </div>
             </div>
             <div className="third-part">
             <div>
            <h6>Amount of money($)</h6>
            <input type='text' name="raiseAmount" value={startUp.raiseAmount} onChange={handleChange} placeholder='1000'/>
             </div>
             </div>
             <div className="forth-part">
             <div>
            <p ref={pRef}>You need to fill all fields!</p>
            <button type="button" className="submit-startup"  style={{background: 'rgb(122, 122, 122)'}} ref={buttonRef}  onClick={handleSubmit}>Submit</button>
             </div>
             </div>
             </div>
         </div>
         </div>
         </div>
        </form>
        </div>
        )
}