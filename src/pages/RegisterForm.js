import Axios from "axios";
import React, { useState } from 'react';



function RegisterForm() {

    const [usernameReg, setUsername] = useState('');
    const [passwordReg, setPassword] = useState('');
    const [emailReg, setEmail] = useState('');

    const registar =  () => {
        Axios.post('http://localhost:3000/auth/register',
        {
            usuario: usernameReg,
            clave: passwordReg,
            email: emailReg
        }).then((response ) =>{
            console.log(response);
        } );
    };
  
    return (
      <div>
        <h2>Registrar</h2>
        <form>
          <label>
            Usuario:
            <input type="text" value={usernameReg} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Contraseña:
            <input type="password" value={passwordReg} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={emailReg} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <button type="submit" onClick={registar()} >registrar</button>
        </form>
      </div>
    );
  }

  export default RegisterForm;
