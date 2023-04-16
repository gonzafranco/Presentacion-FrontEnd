import React, { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';


import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (usuario === "" ||  clave === "") {
      setError("Por favor rellenar todos los campos");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:3000/auth/login", {
        usuario,
        clave
      });
      console.log(response.data);   
      setSuccessMessage("Inicio de sesión exitoso!");
      localStorage.setItem('authToken', response.data.data.token);
      setError("");
      navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message || error.response.data.error);
    }
  };

  return (

    <MDBContainer fluid className="p-3 my-5">

        <MDBRow>

        <MDBCol col='5' md='3'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Log In" />
        </MDBCol>

        <MDBCol col='2' md='3'>

    <form onSubmit={handleSubmit}>
    <MDBInput wrapperClass='mb-4' label='Usuario' id='formControlLg' type='text' size="md" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
    <MDBInput wrapperClass='mb-4' label='contraseña' id='formControlLg' type='password' size="md" value={clave} onChange={(e) => setClave(e.target.value)} />

    <MDBBtn className="mb-4 w-100" size="md" type="submit" >Log In</MDBBtn>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </form>
    </MDBCol>
    </MDBRow>
    </MDBContainer> 
  );
};

export default LoginForm;
