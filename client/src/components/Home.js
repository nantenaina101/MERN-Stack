import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Config from "./Config";
export default function Home() {

   const [etudiants, setEtudiant] = useState([]);
    
   useEffect(() => {
        Config.get('etudiants').then((response) => {
          console.log(response);
          setEtudiant(response.data);
      }).catch((error) => {
        console.log(error);
     });
   }, []
   );
   
   const deleteStudent = (id) => {
      Config.delete(`etudiant/${id}`);
      setEtudiant(
         etudiants.filter((etudiant) => {
            return etudiant._id !== id;
         })
      );
   };
    
   return (<div className="etudiants row">
      <div className="col-2"></div>
      <div className="col-8">
         <div>
            <div style={{
               float:"right"
            }}>
               <Link to="/add" className="btn btn-primary">Ajouter</Link>
            </div>
            <h2 style={{ color: 'blue' }}>List des étudiants</h2>
         </div>
        
         <table className="table table-striped table-bordered">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Nom</th>
                     <th>Email</th>
                     <th>Téléphone</th>
                     <th>Photos</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {
                  etudiants.map((etudiant, index) => { return (
                     
                     <tr className="etudiant-card align-middle" key={etudiant._id} data-id={etudiant.id}>
                        <td className="etudiant-id">{index + 1}</td>
                        <td className="etudiant-firstname">{etudiant.name}</td>
                        <td className="etudiant-email">{etudiant.email}</td>
                        <td className="etudiant-phone">{etudiant.phone}</td>
                        <td style={{textAlign:"center"}} className="etudiant-phone">{etudiant.image ? <img src={"uploads/"+etudiant.image} width='50' className='img-thumbnail' /> : <img src='uploads/img_avatar.png' width='50' className='img-thumbnail' />}</td>
                        <td className="actions" style={{textAlign:"center"}}>
                           <Link to={"/update/" + etudiant._id} className="btn btn-secondary">Modifier</Link>
                           &nbsp;&nbsp;
                           <button className="btn btn-danger ml-3" onClick={()=>{deleteStudent(etudiant._id)}}>Supprimer</button></td>
                     </tr>
                  )
                  })}
               </tbody>
         </table>
      </div>
      <div className="col-2"></div>
      
   </div>);

}