import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Config from "./Config";
export default function Update() {
   
   const { id } = useParams() 
   
   const navigate = useNavigate()
   
   const [state, setState] = useState({
      name: "",
      email: "",
      phone: "",
      image: "",
      old_image: "",
      imgUrl : null
   });
   
   useEffect(() => {
      Config.get('etudiant/'+id).then((response) => {
          console.log(response);
          setState({
               name: response.data.name,
               email: response.data.email,
               phone:response.data.phone,
               image: response.data.image,
               old_image: response.data.image,
               imgUrl : null
            });
      }).catch((error) => {
        console.log(error);
     });
   }, []
   );

   const handleChange = (evt) => {
      if(!evt.target.files){
         const value = evt.target.value;
         setState({
            ...state,
            [evt.target.name]: value,
         });
      }else{
         setState({
            ...state,
            image:evt.target.files[0],
            imgURL:URL.createObjectURL(evt.target.files[0])
         });
      }
   };
   
   const handleSubmit = (e) => {
      
      e.preventDefault();

      const formData = new FormData()

      formData.append('name', state.name)

      formData.append('email', state.email)

      formData.append('phone', state.phone)

      formData.append('image', state.image)

      formData.append('old_image', state.old_image)

      Config
         .put('etudiant/'+id, formData, {})
         .then((response) => {

            console.log(response);
            
            navigate('/')

         });
   }
    
   return (<div className="etudiants row">
         <div className="col-3"></div>
         <div className="col-6">
            <h3 style={{color:'green'}}>Modifier l'étudiant</h3>
            
            <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input type="text" name="name" value={state.name} className="form-control" id="name" onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={state.email} className="form-control" id="email" onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="phone" name="phone" value={state.phone} className="form-control" id="phone" onChange={handleChange}/>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="form-group">
                        <label htmlFor="image">Photo</label>
                        <input type="file" name="image"  className="form-control" id="image" onChange={handleChange} accept="image/*"/>
                        <input type="hidden" value={state.image} name="old_image"></input>
                     </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <button type="submit" className="btn btn-primary">Modifier</button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                     <div className="mt-3">
                        {state.imgURL && <img src={state.imgURL} width='100' height='100' />}
                     </div>
                  </div>
               </div>

            </form>
        </div>
        <div className="col-3"></div>
        
   </div>);

}