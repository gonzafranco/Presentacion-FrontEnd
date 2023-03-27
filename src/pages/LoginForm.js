import Axios from "axios";
import React, { useState } from 'react';

// function LoginForm() {
//   const [usernameReg, setUsername] = useState('');
//   const [passwordReg, setPassword] = useState('');


//     const login =  () => {
//       Axios.post('http://localhost:3000/auth/login',
//       {
//           usuario: usernameReg,
//           clave: passwordReg
//       }).then((response ) =>{
//           console.log(response);
//       } );
//   };

  
//     return (
//       <div>
//         <h2>Login</h2>
//         <form>
//           <label>
//             Usuario:
//             <input type="text" value={usernameReg} onChange={(e) => setUsername(e.target.value)} />
//           </label>
//           <br />
//           <label>
//             Contraseña:
//             <input type="password" value={passwordReg} onChange={(e) => setPassword(e.target.value)} />
//           </label>
//           <br />
//           <button type="submit" onClick={login()}>Login</button>
//         </form>
//       </div>
//     );
//   }


const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

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
      setError("");
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message || error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </div>
      <div>
        <label>Clave:</label>
        <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
      </div>
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
  