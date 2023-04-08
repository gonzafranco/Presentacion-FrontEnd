import React, { useState } from "react";
import axios from "axios";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';

  const RegisterForm = () => {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (usuario === "" || email === "" || clave === "") {
        setError("Por favor rellenar todos los campos");
        return;
      }
      try {
        const response = await axios.post("http://localhost:3000/auth/register", {
          usuario,
          email,
          clave,
        });
        console.log(response.data);
        setError("");
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.message || error.response.data.error);
      }
    };
  
    return (  
        <MDBContainer fluid className="p-3 my-5">

        <MDBRow>

        <MDBCol col='5' md='3'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Registro" />
        </MDBCol>

        <MDBCol col='2' md='3'>
      <form onSubmit={handleSubmit}>

        <MDBInput wrapperClass='mb-4' label='Usuario' id='formControlLg' type='text' size="md" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email' size="md" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='contraseña' id='formControlLg' type='password' size="md" value={clave} onChange={(e) => setClave(e.target.value)} />
         
        <MDBBtn className="mb-4 w-100" size="md" type="submit" >Registrarse</MDBBtn>
        {error && <div style={{ color: "red" }}>{error}
        </div>}
      </form>
      </MDBCol>
      </MDBRow>
      </MDBContainer>
    );
  };
  


  export default RegisterForm;
