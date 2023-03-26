import Axios from "axios";
import React, { useState } from 'react';

function LoginForm() {
  const [usernameReg, setUsername] = useState('');
  const [passwordReg, setPassword] = useState('');


    const login =  () => {
      Axios.post('http://localhost:3000/auth/login',
      {
          usuario: usernameReg,
          clave: passwordReg
      }).then((response ) =>{
          console.log(response);
      } );
  };

  
    return (
      <div>
        <h2>Login</h2>
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
          <button type="submit" onClick={login()}>Login</button>
        </form>
      </div>
    );
  }

  export default LoginForm;
  