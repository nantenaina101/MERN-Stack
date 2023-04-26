import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Config from "./Config";
const Add = (props) => {

   const [state, setState] = useState({
      name: "",
      email: "",
      phone: "",
      image: "",
      imgUrl : null
   });

   const navigate = useNavigate();

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

       Config
          .post('add-etudiant', formData, {
         })
          .then((response) => {
 
             console.log(response);

             navigate("/");
 
          });

   }

   return (<div className="etudiants row">
      <div className="col-3"></div>
      <div className="col-6">
         <h3 style={{ color: 'green' }}>Ajouter un étudiant</h3>

         <form onSubmit={handleSubmit}>
            <div className="row">
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="firstname">Nom</label>
                     <input type="text" name="name" className="form-control" id="name" onChange={handleChange} />
                  </div>
               </div>

               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="email">Email</label>
                     <input type="email" name="email" className="form-control" id="email" onChange={handleChange} />
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="phone">Téléphone</label>
                     <input type="phone" name="phone" className="form-control" id="phone" onChange={handleChange} />
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <div className="form-group">
                     <label htmlFor="phone">Photo</label>
                     <input type="file" name="image" className="form-control" id="image" onChange={handleChange} accept="image/*"/>
                  </div>
               </div>
               <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                  <button type="submit" className="btn btn-primary">Ajouter</button>
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

};

export default Add;