import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { MDBTextArea, MDBBtn } from "mdb-react-ui-kit";

const TareaForm = () => {
  const [cuerpo, setCuerpo] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("authToken");
  const decodedToken = jwt_decode(token);

  //const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cuerpo === "") {
      setError("Por favor rellenar todos los campos");
      return;
    }
    try {
      setUsuarioId(decodedToken.id);
      const response = await axios.post(
        "http://localhost:3000/tarea",
        {
          cuerpo,
          usuarioId 
        }
      );
      console.log(response.data);
      setSuccessMessage("Tarea creada!");
      setError("");
      //setResponseData(response.data);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message || error.response.data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="form"
      className="text-center"
      style={{ width: "100%", maxWidth: "300px" }}
    >
      <h2>Crear Tarea</h2>

      <MDBTextArea
        wrapperClass="mb-4"
        label="cuerpo"
        value={cuerpo}
        onChange={(e) => setCuerpo(e.target.value)}
      />

      <MDBBtn color="primary" block className="my-4">
        Send
      </MDBBtn>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && (<div style={{ color: "green" }}>{successMessage}</div>
      )}

       {/* <div style={{ marginTop: "1rem" }}>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div> */}
      
    </form>
  );
};

export default TareaForm;
