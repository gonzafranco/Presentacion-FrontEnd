import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Form, Button } from "react-bootstrap";

const TareaForm = ({ setResponseData }) => {
  const [cuerpo, setCuerpo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("authToken");
  const decodedToken = jwt_decode(token);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cuerpo.trim() === "") {
      setError("Por favor, ingresa una descripción para la tarea.");
      return;
    }
    try {
      const usuarioId = decodedToken.id;
      const response = await axios.post(
        "http://localhost:3000/users/tarea/crear",
        {
          cuerpo,
          usuarioId
        },
        {
          headers: {
            "auth-token": token
          }
        }
      );
      setResponseData((prevData) => [...prevData, response.data]);
      setSuccessMessage("¡Tarea creada!");
      setError("");
      setCuerpo("");
    } catch (error) {
      setError(
        error.response.data.message || "Error al crear la tarea. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="text-center"
      style={{ width: "100%", maxWidth: "300px" }}
    >
      <Form.Group controlId="cuerpo">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          value={cuerpo}
          onChange={(e) => setCuerpo(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="my-4">
        Crear Tarea
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </Form>
  );
};

export default TareaForm;
