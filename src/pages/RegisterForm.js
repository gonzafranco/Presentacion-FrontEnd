import React, { useState } from "react";
import axios from "axios";
  
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Clave:</label>
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
        </div>
        <button type="submit">Registrarse</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    );
  };
  
  

  export default RegisterForm;
